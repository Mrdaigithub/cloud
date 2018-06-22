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
import { connect } from 'react-redux';
import Formsy from 'formsy-react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import styles from './styles';
import BasicLayout from '../../layouts/BasicLayout';
import { FormsyText } from '../../components/FormsyMaterialUi';
import logo from '../../static/logo.png';
import requester from '../../utils/requester';


class Share extends Component {
    constructor(props) {
        super(props);
        this.state = {
            downloadButtonDisabled: false,
        };
    }

    async extract(model) {
        const { secret } = this.props.match.params;
        const { extractCode } = model;
        const requestUrl = extractCode ? `resources/share/verify/${secret}?extract_code=${extractCode}`
            : `resources/share/verify/${secret}`;
        await requester.get(requestUrl);
        this.setState({
            downloadButtonDisabled: true,
        });
    }

    render() {
        const { classes } = this.props;
        const { visibility } = this.props.match.params;

        return (
            <BasicLayout>
                <Grid className={classes.normal} container direction={'row'} justify={'center'} alignItems={'center'}>
                    <Grid item xs={7} sm={5} md={3}>
                        <Grid container alignItems={'center'} justify={'center'}>
                            <Grid item xs={7}><img className={classes.logoImg} src={logo} alt="logo"/></Grid>
                            <Grid item xs={10}>
                                <Formsy onValidSubmit={this.extract.bind(this)}>
                                    {
                                        visibility === 'private' ?
                                            <FormsyText
                                                title="请输入提取码："
                                                name="extractCode"
                                                validations={{ matchRegexp: /^(\w|\d){4}$/ }}
                                                validationError="提取码格式不正确"
                                                required
                                                fullWidth
                                                autoFocus/> :
                                            null
                                    }
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        disabled={this.state.downloadButtonDisabled}
                                        className={classes.downloadButton}>提取文件</Button>
                                </Formsy>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </BasicLayout>
        );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(Share));
