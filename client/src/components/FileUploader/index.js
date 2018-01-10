import React from 'react';
import { withStyles } from 'material-ui/styles';
import { LinearProgress } from 'material-ui/Progress';
import Grid from 'material-ui/Grid';
import Dialog, { DialogContent } from 'material-ui/Dialog';
import { FileIcon } from '../../components/file-type-icon';
import styles from './styles';


const FileUploader = props => (
    <Dialog
        fullWidth
        open={props.uploadState}>
        <DialogContent className={props.classes.dialog}>
            <Grid container spacing={16}>
                <Grid item xs={12}>
                    <div className={props.classes.media}>
                        <FileIcon/>
                        <span><i>{props.uploadFilename}</i></span>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <LinearProgress mode="determinate" value={props.uploadValue || 0}/>
                </Grid>
                <Grid item xs={12}>
                    {props.done ? '文件上传成功' : '上传过程中请不要关闭程序'}
                </Grid>
            </Grid>
        </DialogContent>
    </Dialog>
);


export default withStyles(styles)(FileUploader);
