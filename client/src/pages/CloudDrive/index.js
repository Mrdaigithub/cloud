import React, { Component } from 'react';
import { connect } from 'react-redux';
import qs from 'qs';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { withStyles } from 'material-ui/styles';
import Formsy from 'formsy-react';
import List, { ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Dialog, { DialogActions, DialogContent } from 'material-ui/Dialog';
import Checkbox from 'material-ui/Checkbox';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import CreateNewFolder from 'material-ui-icons/CreateNewFolder';
import FileUpload from 'material-ui-icons/FileUpload';
import DeleteIcon from 'material-ui-icons/Delete';
import SparkMD5 from 'spark-md5';
import { history } from '../../store';
import { alert } from '../../store/modules/assist';
import { FormsyText } from '../../components/FormsyMaterialUi';
import { FolderIcon } from '../../components/file-type-icon';
import ResourceTypeIcon from '../../components/ResourceTypeIcon';
import SpeedDial, { SpeedDialItem } from '../../components/SpeedDial';
import { FileUploader } from '../../components/FileUploader';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './styles';
import requester from '../../utils/requester';

class CloudDrive extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentResourceList: [],
            createDirDiglogState: false,
            uploadState: false,
            uploadValue: 0,
            uploadDone: false,
            chunkSize: 2097152,
            file: null,
            fileHash: '',
            group: 'file',
            locale: 'zh',
        };
        this.unlisten = null;
        this.handleUpload = this.handleUpload.bind(this);
        this.handleCreateDir = this.handleCreateDir.bind(this);
        this.handleOpencreateDirDiglog = this.handleOpencreateDirDiglog.bind(this);
        this.handleClosecreateDirDiglog = this.handleClosecreateDirDiglog.bind(this);
    }

    async componentWillMount() {
        this.unlisten = history.listen((location) => {
            if (/cloud-drive\/\d+/.test('/cloud-drive/0'.trim())) {
                this.getResourceList(this.url2path(location.pathname));
            }
        });
        if (!this.state.currentResourceList.length) {
            this.getResourceList(this.url2path(this.props.location.pathname));
        }
    }

    componentWillUnmount() {
        this.unlisten();
    }

    /**
     * 获取当前路径的资源列表
     *
     * @param pathnameStr
     * @returns {Promise<void>}
     */
    async getResourceList(pathnameStr = '0') {
        const currentResourceList = await requester.get(`resources?path=${pathnameStr}`);
        this.setState({ currentResourceList });
    }

    /**
     * 获取文件后缀
     *
     * @param resourceName
     * @returns {string}
     */
    getResourceExt(resourceName) {
        const index = resourceName.lastIndexOf('.');
        return resourceName.substr(index + 1);
    }

    handleClickDir(resourceID, file) {
        const { changePage, routing } = this.props;
        return file ? null : changePage(`${routing.location.pathname}/${resourceID}`);
    }

    /**
     * 将url转化成上传的路径字符串/cloud-drive/0/1/2/3 => '0.1.2.3'
     *
     * @param url
     * @returns {string}
     */
    url2path(url) {
        return url.split('/')
            .filter(item => !!item && item !== 'cloud-drive')
            .map(item => item.trim()
                .replace(/(^\.+|\.+$)/, ''))
            .join('.');
    }


    /**  创建文件夹 **/

    handleOpencreateDirDiglog() {
        this.setState({ createDirDiglogState: true });
    }

    handleClosecreateDirDiglog() {
        this.setState({ createDirDiglogState: false });
    }

    async handleCreateDir(model) {
        const { routing } = this.props;
        const currentPath = this.url2path(routing.location.pathname);
        await requester.post('resources', qs.stringify({
            new_dir: model.newDir,
            current_path: currentPath,
        }));
        this.handleClosecreateDirDiglog();
        this.getResourceList(this.url2path(routing.location.pathname));
    }


    /**  上传文件 **/

    handleUpload() {
        const file = document.querySelector('#icon-button-file').files[0];
        if (!file) return false;
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
        const { routing, alert } = this.props;
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
            path: this.url2path(this.props.routing.location.pathname),
        }));
        if (error) {
            this.resetUploadProcess();
            alert('文件上传失败, 暂不支持无后缀名与空文件');
            return false;
        }
        const chunkCount = Math.ceil(size / chunkSize);
        if (savedPath.length === 0) {
            this.setState({
                uploadValue: 0,
                uploadDone: false,
            });
            this.uploadChunk([...Array(chunkCount).keys()], chunkSize, chunkCount, uploadExt, uploadBaseName, subDir);
        } else {
            this.setState({
                uploadValue: 100,
                uploadDone: true,
            });
            setTimeout(() => {
                this.resetUploadProcess();
                this.getResourceList(this.url2path(routing.location.pathname));
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
            form.append('upload_ext', uploadExt);
            form.append('chunk_total', chunkCount);
            form.append('chunk_index', i + 1);
            form.append('upload_basename', uploadBaseName);
            form.append('sub_dir', subDir);
            form.append('group', this.state.group);
            form.append('locale', this.state.locale);
            form.append('path', this.url2path(this.props.routing.location.pathname));
            await requester.post('//api.mrdaisite.com/aetherupload/uploading', form);
            this.setState({ uploadValue: ((i + 1) * 100) / chunkCount });
        }
        this.setState({
            uploadDone: true,
        });
        setTimeout(() => {
            this.resetUploadProcess();
            this.getResourceList(this.url2path(routing.location.pathname));
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

    render() {
        const { classes } = this.props;
        const { currentResourceList, uploadState, uploadValue, file, uploadDone } = this.state;
        return (
            <PageHeaderLayout>
                <List className={classes.resourceList}>
                    {currentResourceList.map((resource) => {
                        return (
                            <ListItem
                                button
                                key={resource.id}
                                onClick={this.handleClickDir.bind(this, resource.id, resource.file)}>
                                <ListItemIcon className={classes.resourceIcon}>
                                    {
                                        resource.file ?
                                            <ResourceTypeIcon ext={this.getResourceExt(resource.resource_name)}/> :
                                            <FolderIcon/>
                                    }
                                </ListItemIcon>
                                <ListItemText primary={resource.resource_name}/>
                                <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                            </ListItem>
                        );
                    })}
                </List>
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
                        <label htmlFor="icon-button-remove">
                            <IconButton
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
                                        return !this.state.currentResourceList
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
            </PageHeaderLayout>
        );
    }
}

const mapStateToProps = (state, routing) => ({
    routing,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    changePage: url => (push(url)),
    alert,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(CloudDrive));
