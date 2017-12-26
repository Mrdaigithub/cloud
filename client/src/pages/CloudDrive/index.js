import React, { Component } from 'react';
import { connect } from 'react-redux';
import qs from 'qs';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import FileUpload from 'material-ui-icons/FileUpload';
import DeleteIcon from 'material-ui-icons/Delete';
import SparkMD5 from 'spark-md5';
import { FileIcon, FolderIcon, TextIcon, PdfIcon, ZipIcon } from '../../components/file-type-icon';
import SpeedDial, { SpeedDialItem } from '../../components/SpeedDial';
import { FileUploader } from '../../components/FileUploader';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './styles';
import requester from '../../utils/requester';

class CloudDrive extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploadState: false,
            uploadValue: 0,
            chunkSize: 2097152,
            file: null,
            fileHash: '',
        };
        this.handleUpload = this.handleUpload.bind(this);
    }

    handleUpload() {
        const file = document.querySelector('#icon-button-file').files[0];
        if (!file) return false;
        this.setState({ file });
        this.calculateHash(file);
    }

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
                this.setState({
                    fileHash: spark.end(),
                });
                this.preprocess();
            }
        };

        fileReader.onerror = () => {
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

    async preprocess() {
        const { fileHash } = this.state;
        const { name, size } = this.state.file;
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
        }));
        if (error) {
            console.error('error');
            return false;
        }
        const chunkCount = Math.ceil(size / chunkSize);
        if (savedPath.length === 0) {
            this.setState({ uploadValue: 0 });
            this.uploadChunk([...Array(chunkCount)
                .keys()], chunkSize, chunkCount, uploadExt, uploadBaseName, subDir);
        } else {
            this.setState({ uploadValue: 100 });
            setTimeout(() => {
                this.setState({

                });
            }, 1000);
        }
    }

    async uploadChunk(chunkCountArr, chunkSize, chunkCount, uploadExt, uploadBaseName, subDir) {
        const file = this.state.file;
        const { size } = file;
        for (const i of chunkCountArr) {
            const form = new FormData();
            const start = i * chunkSize;
            const end = Math.min(size, start + chunkSize);
            form.append('file', file.slice(start, end));
            form.append('upload_ext', uploadExt);
            form.append('chunk_total', chunkCount);
            form.append('chunk_index', i + 1);
            form.append('upload_basename', uploadBaseName);
            form.append('sub_dir', subDir);
            const res = await requester.post('//api.mrdaisite.com/aetherupload/uploading', form);
            console.log(res);
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <PageHeaderLayout>
                <List>
                    <ListItem button>
                        <ListItemIcon><FolderIcon/></ListItemIcon>
                        <ListItemText primary={`folder`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><FileIcon/></ListItemIcon>
                        <ListItemText primary={`file`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><TextIcon/></ListItemIcon>
                        <ListItemText primary={`text`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><PdfIcon/></ListItemIcon>
                        <ListItemText primary={`pdf`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><ZipIcon/></ListItemIcon>
                        <ListItemText primary={`zip`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><ZipIcon/></ListItemIcon>
                        <ListItemText primary={`zip`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><ZipIcon/></ListItemIcon>
                        <ListItemText primary={`zip`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><ZipIcon/></ListItemIcon>
                        <ListItemText primary={`zip`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><ZipIcon/></ListItemIcon>
                        <ListItemText primary={`zip`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><ZipIcon/></ListItemIcon>
                        <ListItemText primary={`zip`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><ZipIcon/></ListItemIcon>
                        <ListItemText primary={`zip`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><ZipIcon/></ListItemIcon>
                        <ListItemText primary={`zip`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><ZipIcon/></ListItemIcon>
                        <ListItemText primary={`zip`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><ZipIcon/></ListItemIcon>
                        <ListItemText primary={`zip`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><ZipIcon/></ListItemIcon>
                        <ListItemText primary={`zip`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><ZipIcon/></ListItemIcon>
                        <ListItemText primary={`zip`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><ZipIcon/></ListItemIcon>
                        <ListItemText primary={`zip`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><ZipIcon/></ListItemIcon>
                        <ListItemText primary={`zip`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><ZipIcon/></ListItemIcon>
                        <ListItemText primary={`zip`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><ZipIcon/></ListItemIcon>
                        <ListItemText primary={`zip`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><ZipIcon/></ListItemIcon>
                        <ListItemText primary={`zip`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><ZipIcon/></ListItemIcon>
                        <ListItemText primary={`zip`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><ZipIcon/></ListItemIcon>
                        <ListItemText primary={`zip`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><ZipIcon/></ListItemIcon>
                        <ListItemText primary={`zip`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><ZipIcon/></ListItemIcon>
                        <ListItemText primary={`zip`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><ZipIcon/></ListItemIcon>
                        <ListItemText primary={`zip`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><ZipIcon/></ListItemIcon>
                        <ListItemText primary={`zip`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
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
                            <IconButton color="primary" className={classes.SpeedDialItemButton} component="span">
                                <FileUpload/>
                            </IconButton>
                        </label>
                    </SpeedDialItem>
                    <SpeedDialItem>
                        <DeleteIcon/>
                    </SpeedDialItem>
                </SpeedDial>
                <FileUploader uploadState={this.state.uploadState} uploadValue={this.state.uploadValue}/>
            </PageHeaderLayout>
        );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({
    changePage: url => push(url),
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(CloudDrive));
