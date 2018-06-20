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
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Transition from '../Transition';

class ShareStepper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
        };
    }

    handleNext = () => {
        this.setState({
            activeStep: this.state.activeStep + 1,
        });
    };

    handleReset = () => {
        this.setState({
            activeStep: 0,
        });
    };

    render() {
        const { open } = this.props;
        return (
            <Dialog
                open={open ? open : false}
                TransitionComponent={Transition}>
                <DialogTitle>分享你的资源链接</DialogTitle>
                <DialogContent>
                    <Stepper activeStep={this.state.activeStep} orientation="vertical">
                        <Step>
                            <StepLabel>选择分享模式</StepLabel>
                            <StepContent>
                                <Grid container spacing={24} justify="space-around" alignItems="center">
                                    <Grid item xs={12} sm={6}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={this.handleNext}>
                                            公开链接
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={this.handleNext}>
                                            私有链接
                                        </Button>
                                    </Grid>
                                </Grid>
                            </StepContent>
                        </Step>
                        <Step>
                            <StepLabel>复制资源链接</StepLabel>
                            <StepContent>
                                <Grid container spacing={16} justify="space-around" alignItems="center">
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            id="name"
                                            label="资源链接"
                                            value="https://www.google.com.hk/sssssssssssssssssssss"/>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            id="name"
                                            label="提取密码"
                                            value="pass"/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={this.handleNext}>
                                            复制链接及密码
                                        </Button>
                                    </Grid>
                                </Grid>
                            </StepContent>
                        </Step>
                        <Step>
                            <StepLabel>成功创建资源链接</StepLabel>
                            <StepContent>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={this.handleReset}>完成</Button>
                            </StepContent>
                        </Step>
                    </Stepper>
                </DialogContent>
            </Dialog>
        );
    }
}

export default ShareStepper;
