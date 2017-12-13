import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { withStyles } from 'material-ui/styles';
import qs from 'qs';
import Grid from 'material-ui/Grid';
import List, { ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import FileUpload from 'material-ui-icons/FileUpload';
import DeleteIcon from 'material-ui-icons/Delete';
import SparkMD5 from 'spark-md5';
import FileIcon from '../../components/file-type-icon/FileIcon';
import FolderIcon from '../../components/file-type-icon/FolderIcon';
import TextIcon from '../../components/file-type-icon/TextIcon';
import PdfIcon from '../../components/file-type-icon/PdfIcon';
import RarIcon from '../../components/file-type-icon/ZipIcon';
import SpeedDial from '../../components/SpeedDial';
import SpeedDialItem from '../../components/SpeedDial/SpeedDialItem';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './styles';
import request from '../../utils/requester';

class CloudDrive extends Component {
    constructor(props) {
        super(props);
        this.handleUpload = this.handleUpload.bind(this);
    }

    /**
     * chunk file
     * @param file
     * @param tmpSize
     * @returns {Array}
     * @private
     */
    _splitFile(file, tmpSize = 5242880) {
        const chunkNum = Math.ceil(file.size / tmpSize);
        const tmpList = [];
        for (let i = 0; i < chunkNum; i += 1) {
            tmpList.push(file.slice(i * tmpSize, (i + 1) * tmpSize));
        }
        return tmpList;
    }

    handleUpload() {
        const file = document.querySelector('#icon-button-file').files[0];
        const fileReader = new FileReader();
        const spark = new SparkMD5();
        const tmpList = this._splitFile(file, 512000);
        const loadNextTmp = tmp => fileReader.readAsBinaryString(tmp);
        const tmpName = file.name;
        const tmpNum = tmpList.length;
        let tmpIndex = 0;
        let tmp = tmpList.shift();
        fileReader.onload = async (e) => {
            const formData = new FormData();
            spark.appendBinary(e.target.result);
            const tmpHash = spark.end();
            formData.append('files', tmp);
            formData.append('name', tmpName);
            formData.append('hash', tmpHash);
            formData.append('index', tmpIndex);
            formData.append('num', tmpNum);
            await request.post(
                '/file/upload',
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } },
            );
            if (tmpList.length) {
                tmp = tmpList.shift();
                tmpIndex += 1;
                loadNextTmp(tmp);
            }
        };
        loadNextTmp(tmp);
    }

    render() {
        const { classes } = this.props;
        return (
            <PageHeaderLayout>
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
                        <ListItemIcon><RarIcon/></ListItemIcon>
                        <ListItemText primary={`zip`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><RarIcon/></ListItemIcon>
                        <ListItemText primary={`zip`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><RarIcon/></ListItemIcon>
                        <ListItemText primary={`zip`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><RarIcon/></ListItemIcon>
                        <ListItemText primary={`zip`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><RarIcon/></ListItemIcon>
                        <ListItemText primary={`zip`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><RarIcon/></ListItemIcon>
                        <ListItemText primary={`zip`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><RarIcon/></ListItemIcon>
                        <ListItemText primary={`zip`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><RarIcon/></ListItemIcon>
                        <ListItemText primary={`zip`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><RarIcon/></ListItemIcon>
                        <ListItemText primary={`zip`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><RarIcon/></ListItemIcon>
                        <ListItemText primary={`zip`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><RarIcon/></ListItemIcon>
                        <ListItemText primary={`zip`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><RarIcon/></ListItemIcon>
                        <ListItemText primary={`zip`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><RarIcon/></ListItemIcon>
                        <ListItemText primary={`zip`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><RarIcon/></ListItemIcon>
                        <ListItemText primary={`zip`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><RarIcon/></ListItemIcon>
                        <ListItemText primary={`zip`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><RarIcon/></ListItemIcon>
                        <ListItemText primary={`zip`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><RarIcon/></ListItemIcon>
                        <ListItemText primary={`zip`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><RarIcon/></ListItemIcon>
                        <ListItemText primary={`zip`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><RarIcon/></ListItemIcon>
                        <ListItemText primary={`zip`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><RarIcon/></ListItemIcon>
                        <ListItemText primary={`zip`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><RarIcon/></ListItemIcon>
                        <ListItemText primary={`zip`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><RarIcon/></ListItemIcon>
                        <ListItemText primary={`zip`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><RarIcon/></ListItemIcon>
                        <ListItemText primary={`zip`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                </List>
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
