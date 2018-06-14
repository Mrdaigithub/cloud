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

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContentText';
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
