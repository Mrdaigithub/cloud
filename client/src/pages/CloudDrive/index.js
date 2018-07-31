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
import SparkMD5 from 'spark-md5';
import { push } from 'connected-react-router';
import mime from 'mime-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import FileUploader from '../../components/FileUploader';
import ShareStepper from '../../components/ShareStepper';
import OfflineDownloader from '../../components/OfflineDownloader';
import Transition from '../../components/Transition';
import ResourceList from '../../components/ResourceList';
import ResourcePreview from '../../components/ResourceList/ResourcePreview';
import styles from './styles';
import requester from '../../utils/requester';
import { url2path, getPreview, changePath, friendlyPath, getResourceListWithPath, path2url } from '../../utils/assist';
import debounce from '../../utils/debounce';
import { alert, setPageTitle, setAppBarMenu } from '../../store/actions/assistActions';
import { fetchOneself } from '../../store/actions/oneselfActions';
import {
    fetchResources,
    setResourceList,
    clearSelectedResource,
    getSelectedResource,
    setCheckedResourceIdList, clearCheckedResourceIdList,
} from '../../store/actions/resourceActions';
import { CALCULATE_HASH_CHUNK_SIZE } from '../../constants/uploaderConfig';
import { DELAY_TIME } from '../../constants';
import {
    _capacityDeficiency, _sameNameFileInTheCurrentDirectory, _calculatingFileHash,
    _fileHashCalculationFailed, _fileUploading, _notSupportSuffixNameAndEmptyFile,
    _fileUploadFailed, _illegalCharacters, _folderAlreadyExists,
    _ok, _moveTo, _rename, _createDirectory, _selectAll, _offlineDownload, _uploadFile,
} from '../../res/values/string';
import FormsyDialog from '../../components/FormsyDialog';
import ResourceDetail from '../../components/ResourceList/ResourceDetail';

class CloudDrive extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resourceList: [],
            moveResourceList: [],
            movePath: '0',
            selected: [],
            toMoveResourceIdList: [],
            createDirDialogOpen: false,
            renameResourceDialogOpen: false,
            moveResourceDialogOpen: false,
            ResourcePreviewOpen: false,
            ResourceDetailOpen: false,
            ShareStepperOpen: false,
            OfflineDownloaderOpen: false,
            uploadState: false,
            uploadValue: 0,
            uploadTitle: '',
            calculateHashChunkSize: CALCULATE_HASH_CHUNK_SIZE,
            file: null,
            fileHash: '',
            group: 'file',
            locale: 'zh',
            anchorEl: null,
        };
    }

    async componentDidMount() {
        const { routing } = this.props;

        this.handleRefresh(true, url2path(routing.location.pathname), () => {
            this.props.setPageTitle(friendlyPath(url2path(this.props.routing.location.pathname)));
            this.props.fetchOneself();
            this.props.setAppBarMenu([
                {
                    name: _selectAll,
                    'event': () => {
                        this.props.setResourceIdList(this.state.resourceList.map(resource => resource.id));
                    },
                    disabled: !this.state.resourceList.length,
                }, {
                    name: <label htmlFor="icon-button-file">{_uploadFile}</label>,
                    'event': () => {
                    },
                    disabled: false,
                }, {
                    name: _createDirectory,
                    'event': () => {
                        this.handleToggleCreateDirDialog(true)();
                    },
                    disabled: false,
                }, {
                    name: _offlineDownload,
                    'event': () => {
                        this.handleOpenOfflineDownload();
                    },
                    disabled: false,
                },
            ]);
        });
    }

    handleClickResource = ({ id, name, path, file, createdAt, updatedAt }) => {
        if (file) {
            this.setState({ ResourcePreviewOpen: true });
            this.props.getSelectedResource({
                resourceID: id,
                resourceName: name,
                resourceMime: mime.lookup(name),
                resourcePath: path,
                file,
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

    /**
     * 刷新当前资源列表
     *
     * @param network
     * @param path
     * @param cb
     */
    handleRefresh = (network = false, path = url2path(this.props.routing.location.pathname), cb) => {
        if (network) {
            this.props.fetchResources(() => {
                setTimeout(() => {
                    this.setState({
                        resourceList: this.props.resources ?
                            getResourceListWithPath(this.props.resources, path)
                                .filter(r => !r.trashed) : [],
                        selected: [],
                    });
                    if (cb) cb();
                }, 1);
            });
        } else {
            setTimeout(() => {
                this.setState({
                    resourceList: this.props.resources ?
                        getResourceListWithPath(this.props.resources, path)
                            .filter(r => !r.trashed) : [],
                    selected: [],
                });
                if (cb) cb();
            }, 1);
        }
    };


    /**
     * 创建文件夹
     */

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
        this.handleRefresh(true);
    };


    /**
     * 重命名资源
     */

    handleToggleRenameResourceDialog = (open = false) => () => {
        this.setState({ renameResourceDialogOpen: Boolean(open) });
    };

    handleRenameSubmit = () => async (model) => {
        if (!this.props.selectedResource) return;

        const resourceId = this.props.selectedResource.resourceID;
        this.handleToggleRenameResourceDialog()();
        await requester.patch(`resources/${resourceId}`, qs.stringify({
            resource_name: model.text,
        }));
        this.handleRefresh(true);
        this.props.clearSelectedResource();
    };


    /**
     * 上传文件
     */

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
        const {
            error,
            chunkSize,
            savedPath,
            subDir,
            uploadBaseName,
            uploadExt,
        } = await requester.post('https://api.mrdaisite.club/aetherupload/preprocess', qs.stringify({
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
                this.handleRefresh(true);
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
                await requester.post('https://api.mrdaisite.club/aetherupload/uploading', form);
            } catch (e) {
                this.setState({
                    uploadTitle: _fileUploadFailed,
                });
                setTimeout(() => {
                    this.resetUploadProcess();
                    this.handleRefresh(true);
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
            this.handleRefresh(true);
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


    /**
     * 删除资源
     */

    handleRemove = async (resourceIdList) => {
        const deleteList = resourceIdList.map(id => requester.patch(`resources/${id}/trash`));
        await Promise.all(deleteList);

        this.props.setResourceList(
            this.props.resources.map(r => ((resourceIdList.indexOf(r.id) === -1) ?
                { ...r } :
                { ...r, trashed: true })));

        this.handleRefresh();
    };


    /**
     * 查看资源详细情况
     */

    handleOpenResourceDetail = () => {
        if (!this.props.selectedResource) return;

        const { resourceID, resourceName, resourcePath, file, resourceCreatedAt, resourceUpdatedAt } = this.props.selectedResource;

        this.props.getSelectedResource({
            resourceID,
            resourceName,
            resourceMime: mime.lookup(resourceName),
            resourcePath,
            file,
            resourceCreatedAt,
            resourceUpdatedAt,
        });
        this.setState({
            ResourceDetailOpen: true,
        });
    };

    handleCloseResourceDetail = () => {
        this.setState({ ResourceDetailOpen: false });
        this.props.clearSelectedResource();
    };


    /**
     * 移动资源
     */

    handleMove = (resourceIdList) => {
        this.setState({ toMoveResourceIdList: resourceIdList });
        this.handleToggleMoveResourceDialog(true)();
    };

    handleToggleMoveResourceDialog = (open = false) => () => {
        if (open) {
            this.setState({
                moveResourceDialogOpen: true,
                moveResourceList: getResourceListWithPath(this.props.resources, this.state.movePath)
                    .filter(r => !r.trashed)
                    .filter(r => !r.file),
            });
        } else {
            this.setState({
                moveResourceDialogOpen: false,
                moveResourceList: [],
                movePath: '0',
                toMoveResourceIdList: [],
            });
        }
    };

    handleGoMovePath = ({ id, file }) => {
        if (file) return;
        const newMovePath = url2path(changePath.go(path2url(this.state.movePath), id));
        this.setState({
            movePath: newMovePath,
            moveResourceList: getResourceListWithPath(this.props.resources, newMovePath)
                .filter(r => !r.trashed)
                .filter(r => !r.file),
        });
    };

    handleBackMovePath = () => {
        if (this.state.movePath.length === 1 && this.state.movePath.split('/')[0] === '0') return;
        const newMovePath = url2path(changePath.back(path2url(this.state.movePath)));
        this.setState({
            movePath: newMovePath,
            moveResourceList: getResourceListWithPath(this.props.resources, newMovePath)
                .filter(r => !r.trashed)
                .filter(r => !r.file),
        });
    };

    handleMoveResource = () => async () => {
        const { toMoveResourceIdList } = this.state;
        if (!toMoveResourceIdList.length) return;
        const moveList = toMoveResourceIdList.map(id => requester.patch(`resources/${id}/move`, qs.stringify({
            path: url2path(this.state.movePath),
        })));
        await Promise.all(moveList);
        this.handleToggleMoveResourceDialog()();
        this.handleRefresh(true);
    };


    /**
     * 下载资源
     */

    handleDownload = async () => {
        if (!this.props.selectedResource) return;

        const downloadUrl = await requester.get(`resources/link/${this.props.selectedResource.resourceID}`);
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


    /**
     * 分享资源
     */

    handleShare = () => {
        if (!this.props.selectedResource) return;
        this.setState({ ShareStepperOpen: true });
    };

    closeShareStepper = () => {
        this.setState({ ShareStepperOpen: false });
    };


    /**
     * 离线下载
     */

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
            uploadState,
            uploadTitle,
            uploadValue,
        } = this.state;
        return (
            <div className={classes.root}>
                <div id="resourceContent" className={classes.root}>
                    <ResourceList
                        resourceList={resourceList}
                        checked={this.state.selected}
                        onClickResource={this.handleClickResource}
                        toggleCheck={this.handleCheckResource}
                        onRename={this.handleToggleRenameResourceDialog(true)}
                        onRemove={this.handleRemove}
                        onShare={this.handleShare}
                        onDownload={this.handleDownload}
                        onMove={this.handleMove}
                        onDetail={this.handleOpenResourceDetail}/>
                    <ResourcePreview
                        open={this.state.ResourcePreviewOpen}
                        onDownload={this.handleDownload}
                        onRefresh={this.handleRefresh}
                        onClose={this.handleToggleResourcePreview()}>
                        {getPreview(selectedResource)}
                    </ResourcePreview>
                    <ResourceDetail
                        open={this.state.ResourceDetailOpen}
                        onClose={this.handleCloseResourceDetail}/>
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
                        matchRegexp: /^[^\\/:*?"<>|]+$/,
                        dirExists: (values, value) => {
                            return !this.state.resourceList
                                .filter(item => !item.file && item.resource_name === value)
                                .length;
                        },
                    }}
                    validationErrors={{
                        matchRegexp: _illegalCharacters,
                        dirExists: _folderAlreadyExists,
                    }}/>
                <FormsyDialog
                    open={renameResourceDialogOpen}
                    title={_rename}
                    value={this.props.selectedResource.resourceName.toString() || ''}
                    onClose={this.handleToggleRenameResourceDialog()}
                    onSubmit={this.handleRenameSubmit()}
                    validations={{
                        matchRegexp: /^[^\\/:*?"<>|]+$/,
                    }}
                    validationErrors={{
                        matchRegexp: _illegalCharacters,
                    }}/>
                <Dialog
                    fullScreen
                    open={this.state.moveResourceDialogOpen}
                    TransitionComponent={Transition}>
                    <AppBar className={classes.moveDirTopBar}>
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                onClick={this.handleToggleMoveResourceDialog()}>
                                <CloseIcon/>
                            </IconButton>
                            <Typography
                                className={classes.moveDirTopBarTitle}
                                type="title"
                                color="inherit">{_moveTo}</Typography>
                            <Button color="inherit" onClick={this.handleMoveResource()}>{_ok}</Button>
                        </Toolbar>
                    </AppBar>
                    <div className={classes.resourceList}>
                        <ResourceList
                            resourceList={moveResourceList}
                            itemMenu={false}
                            onBack={this.handleBackMovePath}
                            onClickResource={this.handleGoMovePath}/>
                    </div>
                </Dialog>
                <ShareStepper
                    open={this.state.ShareStepperOpen}
                    resourceID={selectedResource.resourceID || null}
                    onComplete={this.closeShareStepper}/>
                <OfflineDownloader
                    open={this.state.OfflineDownloaderOpen}
                    onClose={this.handleCloseOfflineDownload}/>
                <input
                    accept="*"
                    style={{ display: 'none' }}
                    id="icon-button-file"
                    name="icon-button-file"
                    onChange={this.handleUpload()}
                    type="file"/>
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
    checkedResourceIdList: state.resource.checkedResourceIdList,
});

const mapDispatchToProps = dispatch => ({
    setPageTitle: pageTitle => setPageTitle(pageTitle)(dispatch),
    setAppBarMenu: appBarMenu => setAppBarMenu(appBarMenu)(dispatch),
    alert: debounce((msgText, time) => alert(msgText, time)(dispatch)),
    changePage: url => dispatch(push(url)),
    fetchOneself: () => fetchOneself()(dispatch),
    fetchResources: cb => fetchResources(cb)(dispatch),
    setResourceList: resourceList => dispatch(setResourceList(resourceList)),
    getSelectedResource: selectedResource => dispatch(getSelectedResource(selectedResource)),
    clearSelectedResource: () => dispatch(clearSelectedResource()),
    setResourceIdList: resourceIdList => setCheckedResourceIdList(resourceIdList)(dispatch),
    setCheckedResourceIdList: resourceIdList => setCheckedResourceIdList(resourceIdList)(dispatch),
    clearCheckedResourceIdList: () => dispatch(clearCheckedResourceIdList()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(CloudDrive));
