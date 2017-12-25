import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import { LinearProgress } from 'material-ui/Progress';
import Grid from 'material-ui/Grid';
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog';
import { FileIcon } from '../../components/file-type-icon';
import styles from './styles';


class FileUploader extends Component {
    render() {
        const {
            classes,
            uploadState,
        } = this.props;
        return (
            <Dialog
                fullWidth
                open={uploadState}>
                <DialogContent className={classes.dialog}>
                    <Grid container spacing={16}>
                        <Grid item xs={12}>
                            <div className={classes.media}>
                                <FileIcon/>
                                <span><i>CentOS-7-x86_64-Everything-1708.iso</i></span>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <LinearProgress mode="determinate" value={0}/>
                        </Grid>
                        <Grid item xs={12}>
                            上传过程中请不要关闭程序
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        );
    }
}

export default withStyles(styles)(FileUploader);
