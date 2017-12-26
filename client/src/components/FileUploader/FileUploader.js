import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import { LinearProgress } from 'material-ui/Progress';
import Grid from 'material-ui/Grid';
import Dialog, { DialogContent } from 'material-ui/Dialog';
import { FileIcon } from '../../components/file-type-icon';
import styles from './styles';


class FileUploader extends Component {
    render() {
        const {
            classes,
            uploadState,
            uploadValue,
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
                            <LinearProgress mode="buffer" value={uploadValue ? uploadValue : 0}/>
                        </Grid>
                        <Grid item xs={12}>
                            {uploadValue === 100 ? '文件上传成功' : '上传过程中请不要关闭程序'}
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        );
    }
}

export default withStyles(styles)(FileUploader);
