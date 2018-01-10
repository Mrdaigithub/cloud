import React from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Dialog, { DialogContent } from 'material-ui/Dialog';
import ResourceTypeIcon from '../ResourceTypeIcon/index';
import Transition from '../Transition/index';
import styles from './styles';

/**
 * 获取文件后缀
 *
 * @param resourceName
 * @returns {string}
 */
const getResourceExt = (resourceName) => {
    const index = resourceName.lastIndexOf('.');
    return resourceName.substr(index + 1);
};

const ResourceDescribe = props => (
    <Dialog
        fullScreen
        open={props.open}
        transition={Transition}>
        <DialogContent>
            <AppBar>
                <Toolbar>
                    <IconButton color="contrast" onClick={props.onClose} aria-label="Close">
                        <CloseIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Grid
                container justify={'center'}
                alignItems={'center'}
                className={props.classes.container}>
                <Grid item xs={6} className={props.classes.textCenter}>
                    <ResourceTypeIcon
                        style={{ width: 96, height: 96 }}
                        ext={getResourceExt(props.name)}/>
                    <h3 className={props.classes.resourceName}>{props.name || '未命名'}</h3>
                    <p className={props.classes.resourceDes}>{props.text || '暂未添加预览功能'}</p>
                    <Button
                        raised
                        color="primary"
                        href={props.downloadHref || null}
                        onClick={props.onDownload}>下载</Button>
                </Grid>
            </Grid>
        </DialogContent>
    </Dialog>
);


export default withStyles(styles)(ResourceDescribe);

