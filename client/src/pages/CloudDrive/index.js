import React, { Component } from 'react';
import { connect } from 'react-redux';
import qs from 'qs';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { withStyles } from 'material-ui/styles';
import Formsy from 'formsy-react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Dialog, { DialogActions, DialogContent } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import CreateNewFolder from 'material-ui-icons/CreateNewFolder';
import CompareArrows from 'material-ui-icons/CompareArrows';
import FileUpload from 'material-ui-icons/FileUpload';
import DeleteIcon from 'material-ui-icons/Delete';
import SparkMD5 from 'spark-md5';
import { alert } from '../../store/modules/assist';
import { FormsyText } from '../../components/FormsyMaterialUi';
import SpeedDial, { SpeedDialItem } from '../../components/SpeedDial';
import FileUploader from '../../components/FileUploader';
import Transition from '../../components/Transition';
import ResourceList from '../../components/ResourceList';
import styles from './styles';
import requester from '../../utils/requester';
import { fetchOneself } from '../../store/modules/oneself';
import { fetchResources, changeResourceListWithPath } from '../../store/modules/resource';


/**
 * 将url转化成上传的路径字符串/cloud-drive/0/1/2/3 => '0.1.2.3'
 *
 * @param url
 * @returns {string}
 */
const url2path = (url) => {
    return url.split('/')
        .filter(item => !!item && item !== 'cloud-drive')
        .map(item => item.trim()
            .replace(/(^\.+|\.+$)/, ''))
        .join('.');
};

/**
 * 回退url /cloud-drive/0/1/2/3 => /cloud-drive/0/1/2
 *
 * @param url
 * @returns {string}
 */
const movePath = {
    go: (url, path) => {
        const newMoveUrl = url.toString()
            .split('/')
            .filter(item => !!item);
        if (newMoveUrl[0] !== '0') {
            newMoveUrl.unshift('0');
        }
        newMoveUrl.push(path.toString()
            .trim());
        return newMoveUrl.join('/');
    },
    back: (url) => {
        const newMoveUrl = url.toString()
            .split('/')
            .filter(item => !!item);
        if (newMoveUrl[0] !== '0') {
            newMoveUrl.unshift('0');
        }
        if (newMoveUrl.length > 1) {
            newMoveUrl.pop();
        }
        return newMoveUrl.join('/');
    },
};

class CloudDrive extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resourceList: [],
            moveResourceList: [],
            movePath: '0',
            selected: [],
            createDirDiglogState: false,
            moveDirDiglogState: false,
            uploadState: false,
            uploadValue: 0,
            uploadDone: false,
            chunkSize: 2097152,
            file: null,
            fileHash: '',
            group: 'file',
            locale: 'zh',
        };
        this.handleUpload = this.handleUpload.bind(this);
        this.handleCreateDir = this.handleCreateDir.bind(this);
        this.handleOpencreateDirDiglog = this.handleOpencreateDirDiglog.bind(this);
        this.handleClosecreateDirDiglog = this.handleClosecreateDirDiglog.bind(this);
        this.handleOpenMoveDirDiglog = this.handleOpenMoveDirDiglog.bind(this);
        this.handleCloseMoveDirDiglog = this.handleCloseMoveDirDiglog.bind(this);
        this.handleRemoveResource = this.handleRemoveResource.bind(this);
        this.handleMoveResource = this.handleMoveResource.bind(this);
        this.handleDownload = this.handleDownload.bind(this);
    }

    async componentDidMount() {
        const { routing } = this.props;
        if (!this.props.resources) {
            this.props.fetchResources((resources) => {
                this.setState({
                    resourceList: resources[url2path(routing.location.pathname)] || [],
                });
            });
        } else {
            this.getResourceList(url2path(routing.location.pathname));
        }
    }

    /**
     * 获取当前路径的资源列表
     *
     * @param path
     * @param moveMode
     * @returns {Promise<void>}
     */
    async getResourceList(path = '0', moveMode = false) {
        if (moveMode) {
            this.setState({
                moveResourceList: this.props.resources[path] || [],
            });
        } else {
            this.setState({
                resourceList: this.props.resources[path] || [],
                selected: [],
            });
        }
    }

    handleClickResource = (resourceID, file) => {
        const { changePage, routing } = this.props;
        return file ? null : changePage(`${routing.location.pathname}/${resourceID}`);
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


    /**  创建文件夹 **/

    handleOpencreateDirDiglog() {
        this.setState({ createDirDiglogState: true });
    }

    handleClosecreateDirDiglog() {
        this.setState({ createDirDiglogState: false });
    }

    async handleCreateDir(model) {
        const { routing } = this.props;
        this.handleClosecreateDirDiglog();
        const { path } = await requester.post('resources', qs.stringify({
            resource_name: model.newDir,
            path: url2path(routing.location.pathname),
        }));
        const resourceListWithPath = await requester.get(`resources/${path}`);
        this.props.changeResourceListWithPath(Object.keys(resourceListWithPath)[0], resourceListWithPath[Object.keys(resourceListWithPath)[0]]);
        this.getResourceList(url2path(routing.location.pathname));
    }


    /**  上传文件 **/

    handleUpload() {
        const { capacity, used } = this.props;
        const file = document.querySelector('#icon-button-file').files[0];
        if (!file) return false;
        if (this.state.resourceList.filter(item => item.file && item.resource_name === file.name).length) {
            return this.props.alert('在当前目录下已有同名文件');
        }
        if (!!capacity && file.size + parseInt(used, 10) > capacity) {
            return this.props.alert('存储容量不足');
        }
        this.setState({
            file,
            uploadState: true,
            uploadDone: false,
        });
        this.calculateHash(file);
    }

    /**
     * 预先计算上传文件的Hash值
     * @param file
     */
    calculateHash(file) {
        const blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
        const { chunkSize } = this.state;
        const chunks = Math.ceil(file.size / chunkSize);
        const spark = new SparkMD5.ArrayBuffer();
        const fileReader = new FileReader();
        let currentChunk = 0;

        fileReader.onload = (e) => {
            spark.append(e.target.result);
            currentChunk += 1;
            if (currentChunk < chunks) {
                loadNext();
            } else {
                this.setState({ fileHash: spark.end() });
                this.preprocess();
            }
        };

        fileReader.onerror = () => {
            this.resetUploadProcess();
            console.error('文件Hash计算失败');
            return false;
        };

        const loadNext = () => {
            const start = currentChunk * chunkSize;
            const end = start + chunkSize >= file.size ? file.size : start + chunkSize;
            fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
        };

        loadNext();
    }

    /**
     * 预处理上传文件 (判断秒传)
     * @returns {Promise.<boolean>}
     */
    async preprocess() {
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
        } = await requester.post('//api.mrdaisite.com/aetherupload/preprocess', qs.stringify({
            file_name: name,
            file_size: size,
            file_hash: fileHash,
            locale,
            group,
            path: url2path(this.props.routing.location.pathname),
        }));
        if (error) {
            this.resetUploadProcess();
            return this.props.alert('文件上传失败, 暂不支持无后缀名与空文件');
        }
        const chunkCount = Math.ceil(size / chunkSize);
        if (savedPath.length === 0) {
            this.setState({
                uploadValue: 0,
                uploadDone: false,
            });
            this.uploadChunk([...Array(chunkCount)
                .keys()], chunkSize, chunkCount, uploadExt, uploadBaseName, subDir);
        } else {
            this.setState({
                uploadValue: 100,
                uploadDone: true,
            });
            setTimeout(() => {
                this.resetUploadProcess();
                this.props.fetchResources(() => {
                    this.getResourceList(url2path(routing.location.pathname));
                    this.props.fetchOneself();
                });
            }, 1500);
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
            const end = Math.min(size, start + chunkSize);
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
            await requester.post('//api.mrdaisite.com/aetherupload/uploading', form);
            this.setState({ uploadValue: ((i + 1) * 100) / chunkCount });
        }
        this.setState({
            uploadDone: true,
        });
        setTimeout(() => {
            this.resetUploadProcess();
            this.props.fetchResources(() => {
                this.getResourceList(url2path(routing.location.pathname));
                this.props.fetchOneself();
            });
        }, 2000);
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

    async handleRemoveResource() {
        const { resources, routing } = this.props;
        const resourcePath = url2path(routing.location.pathname);
        const { selected } = this.state;
        if (selected.length) {
            const deleteList = selected.map(id => requester.delete(`resources/${id}`));
            await Promise.all(deleteList);
            resources[resourcePath] = resources[resourcePath].filter(resource => selected.indexOf(resource.id) === -1);
            this.getResourceList(resourcePath);
            this.props.fetchOneself();
        }
    }


    /**  移动资源 **/

    handleOpenMoveDirDiglog() {
        if (!this.state.selected.length) return;
        this.getResourceList(undefined, true);
        this.setState({ moveDirDiglogState: true });
    }

    handleCloseMoveDirDiglog() {
        this.setState({
            moveDirDiglogState: false,
            moveResourceList: [],
            movePath: '0',
        });
    }

    handleClickMoveDir = (resourceID, file) => {
        if (file) return;
        const newMovePath = movePath.go(this.state.movePath, resourceID);
        this.setState({ movePath: newMovePath });
        this.getResourceList(url2path(newMovePath), true);
    };

    handleBackMovePath = () => () => {
        if (this.state.movePath.length === 1 && this.state.movePath.split('/')[0] === '0') return;
        const newMovePath = movePath.back(this.state.movePath);
        this.setState({ movePath: newMovePath });
        this.getResourceList(url2path(newMovePath), true);
    };

    async handleMoveResource() {
        if (!this.state.selected.length) return;
        const { selected } = this.state;
        const moveList = selected.map(id => requester.patch(`resources/${id}`, qs.stringify({
            path: url2path(this.state.movePath),
        })));
        this.handleCloseMoveDirDiglog();
        await Promise.all(moveList);
        this.props.fetchResources(() => {
            this.getResourceList(url2path(this.props.routing.location.pathname));
        });
    }


    /**  下载资源 **/

    async handleDownload(resourceID) {
        const downloadUrl = await requester.get(`secret/${resourceID}`);
        const downloadDom = document.createElement('a');
        downloadDom.id = 'downloadUrl';
        downloadDom.download = true;
        downloadDom.href = downloadUrl;
        document.querySelector('body')
            .appendChild(downloadDom);
        downloadDom.click();
        document.querySelector('body')
            .removeChild(downloadDom);
    }

    render() {
        const { classes } = this.props;
        const { resourceList, moveResourceList, selected, uploadState, uploadValue, file, uploadDone } = this.state;
        return (
            <div className={classes.normal}>
                <ResourceList
                    resourceList={resourceList}
                    checked={this.state.selected}
                    onClickResource={this.handleClickResource}
                    onDownload={this.handleDownload}
                    toggleCheck={this.handleCheckResource}/>
                <SpeedDial>
                    <SpeedDialItem>
                        <input
                            accept="*"
                            className={classes.SpeedDialItemInput}
                            id="icon-button-file"
                            name="icon-button-file"
                            onChange={this.handleUpload}
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
                                onClick={this.handleOpencreateDirDiglog}>
                                <CreateNewFolder/>
                            </IconButton>
                        </label>
                    </SpeedDialItem>
                    <SpeedDialItem>
                        <label htmlFor="icon-button-move">
                            <IconButton
                                onClick={this.handleOpenMoveDirDiglog}
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
                                onClick={this.handleRemoveResource}
                                disabled={!selected.length}
                                color="primary"
                                className={classes.SpeedDialItemButton}
                                component="span">
                                <DeleteIcon/>
                            </IconButton>
                        </label>
                    </SpeedDialItem>
                </SpeedDial>
                <FileUploader
                    uploadState={uploadState}
                    uploadValue={uploadValue}
                    uploadFilename={file ? file.name : ''}
                    done={uploadDone}/>
                <Dialog open={this.state.createDirDiglogState}>
                    <Formsy onValidSubmit={this.handleCreateDir}>
                        <DialogContent>
                            <FormsyText
                                title="文件夹名称"
                                name="newDir"
                                validations={{
                                    isAlphanumeric: true,
                                    dirExists: (values, value) => {
                                        return !this.state.resourceList
                                            .filter(item => !item.file && item.resource_name === value)
                                            .length;
                                    },
                                }}
                                validationErrors={{
                                    isAlphanumeric: '存在非法字符',
                                    dirExists: '文件夹已存在',
                                }}
                                required
                                fullWidth
                                autoFocus/>
                        </DialogContent>
                        <DialogActions>
                            <Button color="primary" onClick={this.handleClosecreateDirDiglog}>关闭</Button>
                            <Button type="submit" color="primary">创建</Button>
                        </DialogActions>
                    </Formsy>
                </Dialog>
                <Dialog
                    fullScreen
                    open={this.state.moveDirDiglogState}
                    transition={Transition}>
                    <AppBar className={classes.moveDirTopBar}>
                        <Toolbar>
                            <IconButton color="contrast" onClick={this.handleCloseMoveDirDiglog} aria-label="Close">
                                <CloseIcon/>
                            </IconButton>
                            <Typography className={classes.moveDirTopBarTitle} type="title" color="inherit">移动至...</Typography>
                            <Button color="contrast" onClick={this.handleMoveResource}>确认</Button>
                        </Toolbar>
                    </AppBar>
                    <div className={classes.resourceList}>
                        <ResourceList
                            resourceList={moveResourceList}
                            moveMode
                            onBack={this.handleBackMovePath}
                            onClickResource={this.handleClickMoveDir}/>
                    </div>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = (state, routing) => ({
    routing,
    capacity: state.oneself.capacity,
    used: state.oneself.used,
    resources: state.resource.resources,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    changePage: url => (push(url)),
    alert,
    fetchOneself,
    fetchResources,
    changeResourceListWithPath,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(CloudDrive));
