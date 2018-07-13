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
import qs from 'qs';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Formsy from 'formsy-react';
import Button from '@material-ui/core/Button';
import styles from './styles';
import { _linkInvalid, _offlineDownloadInputPlaceholder, _ok, _pleaseInputDownloadFileLink } from '../../res/values/string';
import { FormsyText } from '../../components/FormsyMaterialUi';
import requester from '../../utils/requester';

class CreateLinkOfflineDownload extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleCreateLinkOfflineDownloadTask = (model) => {
        const { props } = this;
        (async function () {
            await requester.post('https://api.mrdaisite.com/api/v1/aria2/adduri', qs.stringify({
                uri: model.link,
            }));
            props.changePage('/download/offline/manager');
        }());
    };

    render() {
        const { classes } = this.props;
        return (
            <Grid className={classes.normal} container direction={'row'} justify={'center'} alignItems={'center'}>
                <Grid item xs={12}>
                    <Typography variant="subheading" gutterBottom noWrap>{_pleaseInputDownloadFileLink}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Formsy onValidSubmit={this.handleCreateLinkOfflineDownloadTask}>
                        <FormsyText
                            name="link"
                            placeholder={_offlineDownloadInputPlaceholder}
                            validations={{ matchRegexp: /^(((https?)|(ftp)):\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*)|(magnet:\?xt=urn:btih:.*)$/i }}
                            validationError={_linkInvalid}
                            value="https://fra-de-ping.vultr.com/vultr.com.100MB.bin"
                            required
                            fullWidth
                            autoFocus/>
                        <Button
                            type="submit"
                            color="primary"
                            variant="contained">{_ok}</Button>
                    </Formsy>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    changePage: url => dispatch(push(url)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(CreateLinkOfflineDownload));
