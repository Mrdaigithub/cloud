/*
 * MIT License
 *
 * Copyright (c) 2017 Mrdai
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import qs from 'qs';
import { push } from 'connected-react-router';
import mime from 'mime-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import CloseIcon from '@material-ui/icons/Close';
import CreateNewFolder from '@material-ui/icons/CreateNewFolder';
import CompareArrows from '@material-ui/icons/CompareArrows';
import FileUpload from '@material-ui/icons/FileUpload';
import DeleteIcon from '@material-ui/icons/Delete';
import ShareIcon from '@material-ui/icons/Share';
import SparkMD5 from 'spark-md5';
import { alert, setPageTitle } from '../../store/actions/assistActions';
import SpeedDial, { SpeedDialItem } from '../../components/SpeedDial';
import FileUploader from '../../components/FileUploader';
import ShareStepper from '../../components/ShareStepper';
import OfflineDownloader from '../../components/OfflineDownloader';
import Transition from '../../components/Transition';
import ResourceList from '../../components/ResourceList';
import ResourcePreview from '../../components/ResourceList/ResourcePreview';
import { OfflineDownloadIcon } from '../../components/Icons';
import styles from './styles';
import requester from '../../utils/requester';
import { url2path, getPreview } from '../../utils/assist';
import debounce from '../../utils/debounce';
import { fetchOneself } from '../../store/actions/oneselfActions';
import {
    fetchResources,
    changeResourceListWithPath,
    clearSelectedResource,
    getSelectedResource,
} from '../../store/actions/resourceActions';
import { friendlyPath, movePath } from '../../utils/pathUtil';
import { CALCULATE_HASH_CHUNK_SIZE } from '../../constants/uploaderConfig';
import { DELAY_TIME } from '../../constants';
import {
    _capacityDeficiency, _sameNameFileInTheCurrentDirectory, _calculatingFileHash,
    _fileHashCalculationFailed, _fileUploading, _notSupportSuffixNameAndEmptyFile,
    _fileUploadFailed, _illegalCharacters, _folderAlreadyExists,
    _ok, _moveTo, _rename, _createDirectory,
} from '../../res/values/string';
import FormsyDialog from '../../components/FormsyDialog';

class CloudDrive extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resourceList: [],
            moveResourceList: [],
            movePath: '0',
            selected: [],
            createDirDialogOpen: false,
            renameResourceDialogOpen: false,
            moveResourceDialogOpen: false,
            ResourcePreviewOpen: false,
            uploadState: false,
            uploadValue: 0,
            uploadTitle: '',
            calculateHashChunkSize: CALCULATE_HASH_CHUNK_SIZE,
            file: null,
            fileHash: '',
            group: 'file',
            locale: 'zh',
            ShareStepperOpen: false,
            OfflineDownloaderOpen: false,
        };
    }

    async componentDidMount() {
        const { routing } = this.props;
        this.props.fetchResources(() => {
            this.getResourceList(url2path(routing.location.pathname));
            this.props.setPageTitle(friendlyPath(url2path(this.props.routing.location.pathname)));
            this.props.fetchOneself();
        });
    }

    /**
     * 获取当前路径的资源列表
     *
     * @param path
     * @param moveMode
     * @returns {Promise<void>}
     */
    getResourceList(path = '0', moveMode = false) {
        if (moveMode) {
            this.setState({
                moveResourceList: this.props.resources ?
                    this.props.resources
                        .filter(r => r.path === path)
                        .filter(r => !r.file && !r.trashed) :
                    [],
            });
        } else {
            this.setState({
                resourceList: this.props.resources ?
                    this.props.resources
                        .filter(r => r.path === path)
                        .filter(r => !r.trashed)
                    : [],
                selected: [],
            });
        }
    }

    handleClickResource = ({ id, name, path, file, createdAt, updatedAt }) => {
        if (file) {
            this.setState({ ResourcePreviewOpen: true });
            this.props.getSelectedResource({
                resourceID: id,
                resourceName: name,
                resourceMime: mime.lookup(name),
                resourcePath: path,
                resourceCreatedAt: createdAt,
                resourceUpdatedAt: updatedAt,
            });
        } else {
            const { changePage, routing } = this.props;
            changePage(`${routing.location.pathname}/${id}`);
        }
    };

    handleCheckResource = resourceID => () => {
        const { selected } = this.state;
        const currentIndex = selected.indexOf(resourceID);
        const newChecked = [...selected];

        if (currentIndex === -1) {
            newChecked.push(resourceID);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        this.setState({
            selected: newChecked,
        });
    };

    handleToggleResourcePreview = (open = false) => () => {
        this.setState({ ResourcePreviewOpen: Boolean(open) });
        if (!open) {
            this.props.clearSelectedResource();
        }
    };

    handleRefresh = () => () => {
        this.getResourceList(url2path(this.props.routing.location.pathname));
    };


    /**  创建文件夹 **/

    handleToggleCreateDirDialog = (open = false) => () => {
        this.setState({ createDirDialogOpen: Boolean(open) });
    };

    handleCreateDir = () => async (model) => {
        const { routing } = this.props;
        this.handleToggleCreateDirDialog()();
        const { path } = await requester.post('resources', qs.stringify({
            resource_name: model.text,
            path: url2path(routing.location.pathname),
        }));
        await requester.get(`resources/${path}`);
        this.props.fetchResources(() => {
            this.getResourceList(url2path(routing.location.pathname));
        });
    };


    /**  重命名资源 **/

    handleToggleRenameResourceDialog = (open = false) => () => {
        this.setState({ renameResourceDialogOpen: Boolean(open) });
    };

    handleRenameSubmit = () => async (model) => {
        if (!this.props.selectedResource) return;
        const { routing } = this.props;
        const resourceId = this.props.selectedResource.resourceID;
        this.handleToggleRenameResourceDialog()();
        await requester.patch(`resources/${resourceId}`, qs.stringify({
            resource_name: model.text,
        }));
        this.props.fetchResources(() => {
            this.getResourceList(url2path(routing.location.pathname));
        });
        this.props.clearSelectedResource();
    };


    /**  上传文件 **/

    handleUpload = () => () => {
        const { capacity, used } = this.props;
        const file = document.querySelector('#icon-button-file').files[0];
        if (!file) return false;
        if (this.state.resourceList.filter(item => item.file && item.resource_name === file.name).length) {
            return this.props.alert(_sameNameFileInTheCurrentDirectory);
        }
        if (!!capacity && file.size + parseInt(used, 10) > capacity) {
            return this.props.alert(_capacityDeficiency);
        }
        this.setState({
            file,
            uploadState: true,
            uploadDone: false,
        });
        this.calculateHash(file);
    };

    /**
     * 预先计算上传文件的Hash值
     * @param file
     */
    calculateHash(file) {
        console.log(new Date());
        this.setState({ uploadTitle: _calculatingFileHash });
        const blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
        const { calculateHashChunkSize } = this.state;
        const chunks = Math.ceil(file.size / calculateHashChunkSize);
        const spark = new SparkMD5.ArrayBuffer();
        const fileReader = new FileReader();
        let currentChunk = 0;

        fileReader.onload = (e) => {
            spark.append(e.target.result);
            currentChunk += 1;
            if (currentChunk < chunks) {
                loadNext();
            } else {
                console.log(new Date());
                this.setState({ fileHash: spark.end() });
                this.preprocess();
            }
        };

        fileReader.onerror = () => {
            this.setState({ uploadTitle: _fileHashCalculationFailed });
            setTimeout(() => {
                this.resetUploadProcess();
            }, DELAY_TIME);
            return false;
        };

        const loadNext = () => {
            const start = currentChunk * calculateHashChunkSize;
            const end = start + calculateHashChunkSize >= file.size ? file.size : start + calculateHashChunkSize;
            fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
        };

        loadNext();
    }

    /**
     * 预处理上传文件 (判断秒传)
     * @returns {Promise.<boolean>}
     */
    async preprocess() {
        this.setState({ uploadTitle: _fileUploading });
        const { file, fileHash, group, locale } = this.state;
        const { name, size } = file;
        const { routing } = this.props;
        const {
            error,
            chunkSize,
            savedPath,
            subDir,
            uploadBaseName,
            uploadExt,
        } = await requester.post('https://api.mrdaisite.com/aetherupload/preprocess', qs.stringify({
            file_name: name,
            file_size: size,
            file_hash: fileHash,
            locale,
            group,
            path: url2path(this.props.routing.location.pathname),
        }));
        if (error) {
            this.setState({ uploadTitle: _notSupportSuffixNameAndEmptyFile });
            setTimeout(() => {
                this.resetUploadProcess();
            }, DELAY_TIME);
            return false;
        }
        const chunkCount = Math.ceil(size / chunkSize);
        if (savedPath === '') {
            this.setState({
                uploadValue: 0,
            });
            this.uploadChunk([...Array(chunkCount)
                .keys()], chunkSize, chunkCount, uploadExt, uploadBaseName, subDir);
        } else {
            this.setState({
                uploadValue: 100,
                uploadState: true,
            });
            setTimeout(() => {
                this.resetUploadProcess();
                this.props.fetchResources(() => {
                    this.getResourceList(url2path(routing.location.pathname));
                });
            }, DELAY_TIME);
        }
    }

    /**
     * 上传文件分块
     * @param chunkCountArr
     * @param chunkSize
     * @param chunkCount
     * @param uploadExt
     * @param uploadBaseName
     * @param subDir
     * @returns {Promise.<void>}
     */
    async uploadChunk(chunkCountArr, chunkSize, chunkCount, uploadExt, uploadBaseName, subDir) {
        const file = this.state.file;
        const { name, size } = file;
        const { routing } = this.props;
        for (const i of chunkCountArr) {
            const form = new FormData();
            const start = i * chunkSize;
            const end = Math.min(size, start + Number(chunkSize));
            form.append('file', file.slice(start, end));
            form.append('filename', name);
            form.append('file_size', file.size);
            form.append('upload_ext', uploadExt);
            form.append('chunk_total', chunkCount);
            form.append('chunk_index', i + 1);
            form.append('upload_basename', uploadBaseName);
            form.append('sub_dir', subDir);
            form.append('group', this.state.group);
            form.append('locale', this.state.locale);
            form.append('path', url2path(this.props.routing.location.pathname));
            try {
                await requester.post('https://api.mrdaisite.com/aetherupload/uploading', form);
            } catch (e) {
                this.setState({
                    uploadTitle: _fileUploadFailed,
                });
                setTimeout(() => {
                    this.resetUploadProcess();
                    this.props.fetchResources(() => {
                        this.getResourceList(url2path(routing.location.pathname));
                    });
                }, DELAY_TIME);
                return;
            }
            this.setState({ uploadValue: ((i + 1) * 100) / chunkCount });
        }
        this.setState({
            uploadDone: true,
        });
        setTimeout(() => {
            this.resetUploadProcess();
            this.props.fetchResources(() => {
                this.getResourceList(url2path(routing.location.pathname));
            });
        }, DELAY_TIME);
    }

    /**
     * 重置文件进度条
     */
    resetUploadProcess() {
        this.setState({ uploadState: false });
        setTimeout(() => {
            this.setState({
                uploadValue: 0,
                uploadDone: false,
            });
        }, 300);
    }


    /**  删除资源 **/
    handleRemoveResource = () => {
        return async () => {
            const { resources, routing } = this.props;
            const { selected } = this.state;
            if (selected.length) {
                const deleteList = selected.map(id => requester.patch(`resources/${id}/trash`));
                await Promise.all(deleteList);
                const resourceListWithPath = resources.map(r => ((selected.indexOf(r.id) === -1) ? { ...r } : {
                    ...r,
                    trashed: true,
                }));
                this.props.changeResourceListWithPath(resourceListWithPath);
                this.getResourceList(url2path(routing.location.pathname));
            }
        };
    };


    /**  移动资源 **/

    handleToggleMoveResourceDialog = (open = false) => () => {
        if (open) {
            if (!this.state.selected.length) return;
            this.getResourceList(undefined, true);
            this.setState({ moveResourceDialogOpen: true });
        } else {
            this.setState({
                moveResourceDialogOpen: false,
                moveResourceList: [],
                movePath: '0',
            });
        }
    };

    handleClickMoveDir = () => ({ id, file }) => {
        if (file) return;
        const newMovePath = movePath.go(this.state.movePath, id);
        this.setState({ movePath: newMovePath });
        this.getResourceList(url2path(newMovePath), true);
    };

    handleMoveResource = () => async () => {
        const { selected } = this.state;
        if (!selected.length) return;
        const moveList = selected.map(id => requester.patch(`resources/${id}/move`, qs.stringify({
            path: url2path(this.state.movePath),
        })));
        this.handleToggleMoveResourceDialog()();
        await Promise.all(moveList);
        this.props.fetchResources(() => {
            this.getResourceList(url2path(this.props.routing.location.pathname));
        });
    };


    /**  下载资源 **/

    handleDownload = resourceID => async () => {
        const downloadUrl = await requester.get(`resources/link/${resourceID}`);
        const downloadDom = document.createElement('a');
        downloadDom.id = 'downloadUrl';
        downloadDom.download = true;
        downloadDom.href = downloadUrl.url;
        document.querySelector('body')
            .appendChild(downloadDom);
        downloadDom.click();
        document.querySelector('body')
            .removeChild(downloadDom);
    };


    /** 分享资源 **/

    handleShare = () => async () => {
        const { selected } = this.state;
        if (!selected.length) return;
        this.setState({ ShareStepperOpen: true });
    };

    closeShareStepper = () => {
        this.setState({ ShareStepperOpen: false });
    };


    /** 离线下载 **/

    handleOpenOfflineDownload = () => {
        this.setState({
            OfflineDownloaderOpen: true,
        });
    };

    handleCloseOfflineDownload = () => {
        this.setState({
            OfflineDownloaderOpen: false,
        });
    };

    render() {
        const { classes, selectedResource } = this.props;
        const {
            createDirDialogOpen,
            renameResourceDialogOpen,
            resourceList,
            moveResourceList,
            selected,
            uploadState,
            uploadTitle,
            uploadValue,
        } = this.state;
        return (
            <div className={classes.root}>
                <SpeedDial>
                    <SpeedDialItem>
                        <input
                            accept="*"
                            className={classes.SpeedDialItemInput}
                            id="icon-button-file"
                            name="icon-button-file"
                            onChange={this.handleUpload()}
                            type="file"/>
                        <label htmlFor="icon-button-file">
                            <IconButton
                                color="primary"
                                className={classes.SpeedDialItemButton}
                                component="span">
                                <FileUpload/>
                            </IconButton>
                        </label>
                    </SpeedDialItem>
                    <SpeedDialItem>
                        <label htmlFor="icon-button-create">
                            <IconButton
                                color="primary"
                                className={classes.SpeedDialItemButton}
                                component="span"
                                onClick={this.handleToggleCreateDirDialog(true)}>
                                <CreateNewFolder/>
                            </IconButton>
                        </label>
                    </SpeedDialItem>
                    <SpeedDialItem>
                        <label htmlFor="icon-button-offline-download">
                            <IconButton
                                onClick={this.handleOpenOfflineDownload}
                                color="primary"
                                className={classes.SpeedDialItemButton}
                                component="span">
                                <OfflineDownloadIcon/>
                            </IconButton>
                        </label>
                    </SpeedDialItem>
                    <SpeedDialItem>
                        <label htmlFor="icon-button-move">
                            <IconButton
                                onClick={this.handleToggleMoveResourceDialog(true)}
                                disabled={!selected.length}
                                color="primary"
                                className={classes.SpeedDialItemButton}
                                component="span">
                                <CompareArrows/>
                            </IconButton>
                        </label>
                    </SpeedDialItem>
                    <SpeedDialItem>
                        <label htmlFor="icon-button-remove">
                            <IconButton
                                onClick={this.handleRemoveResource()}
                                disabled={!selected.length}
                                color="primary"
                                className={classes.SpeedDialItemButton}
                                component="span">
                                <DeleteIcon/>
                            </IconButton>
                        </label>
                    </SpeedDialItem>
                    <SpeedDialItem>
                        <label htmlFor="icon-button-share">
                            <IconButton
                                onClick={this.handleShare()}
                                disabled={!selected.length}
                                color="primary"
                                className={classes.SpeedDialItemButton}
                                component="span">
                                <ShareIcon/>
                            </IconButton>
                        </label>
                    </SpeedDialItem>
                </SpeedDial>
                <div id="resourceContent" className={classes.root}>
                    <ResourceList
                        resourceList={resourceList}
                        ItemIcon={Checkbox}
                        checked={this.state.selected}
                        onClickResource={this.handleClickResource}
                        toggleCheck={this.handleCheckResource}
                        onRename={this.handleToggleRenameResourceDialog(true)}/>
                    <ResourcePreview
                        open={this.state.ResourcePreviewOpen}
                        onDownload={this.handleDownload(selectedResource.resourceID)}
                        onRefresh={this.handleRefresh()}
                        onClose={this.handleToggleResourcePreview()}>
                        {getPreview(selectedResource)}
                    </ResourcePreview>
                </div>
                <FileUploader
                    uploadTitle={uploadTitle}
                    uploadState={uploadState}
                    uploadValue={uploadValue}/>
                <FormsyDialog
                    open={createDirDialogOpen}
                    title={_createDirectory}
                    onClose={this.handleToggleCreateDirDialog()}
                    onSubmit={this.handleCreateDir()}
                    validations={{
                        isAlphanumeric: true,
                        dirExists: (values, value) => {
                            return !this.state.resourceList
                                .filter(item => !item.file && item.resource_name === value)
                                .length;
                        },
                    }}
                    validationErrors={{
                        isAlphanumeric: _illegalCharacters,
                        dirExists: _folderAlreadyExists,
                    }}/>
                <FormsyDialog
                    open={renameResourceDialogOpen}
                    title={_rename}
                    value={this.props.selectedResource.resourceName.toString() || ''}
                    onClose={this.handleToggleRenameResourceDialog()}
                    onSubmit={this.handleRenameSubmit()}
                    validations={{
                        isAlphanumeric: true,
                    }}
                    validationErrors={{
                        isAlphanumeric: _illegalCharacters,
                    }}/>
                <Dialog
                    fullScreen
                    open={this.state.moveResourceDialogOpen}
                    TransitionComponent={Transition}>
                    <AppBar className={classes.moveDirTopBar}>
                        <Toolbar>
                            <IconButton
                                color="inherit" onClick={this.handleToggleMoveResourceDialog()}
                                aria-label="Close">
                                <CloseIcon/>
                            </IconButton>
                            <Typography
                                className={classes.moveDirTopBarTitle} type="title"
                                color="inherit">{_moveTo}</Typography>
                            <Button color="inherit" onClick={this.handleMoveResource()}>{_ok}</Button>
                        </Toolbar>
                    </AppBar>
                    <div className={classes.resourceList}>
                        <ResourceList
                            resourceList={moveResourceList}
                            onClickResource={this.handleClickMoveDir()}/>
                    </div>
                </Dialog>
                <ShareStepper
                    open={this.state.ShareStepperOpen}
                    resourceID={this.state.selected[0] || null}
                    onComplete={this.closeShareStepper}/>
                <OfflineDownloader
                    open={this.state.OfflineDownloaderOpen}
                    onClose={this.handleCloseOfflineDownload}/>
            </div>
        );
    }
}

const mapStateToProps = (state, routing) => ({
    routing,
    capacity: state.oneself.capacity,
    used: state.oneself.used,
    resources: state.resource.resources,
    selectedResource: state.resource.selectedResource,
});

const mapDispatchToProps = dispatch => ({
    setPageTitle: pageTitle => setPageTitle(pageTitle)(dispatch),
    fetchOneself: () => fetchOneself()(dispatch),
    fetchResources: cb => fetchResources(cb)(dispatch),
    changeResourceListWithPath: resourceListWithPath => dispatch(changeResourceListWithPath(resourceListWithPath)),
    getSelectedResource: selectedResource => dispatch(getSelectedResource(selectedResource)),
    clearSelectedResource: () => dispatch(clearSelectedResource()),
    alert: debounce((msgText, time) => alert(msgText, time)(dispatch)),
    changePage: url => dispatch(push(url)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(CloudDrive));
