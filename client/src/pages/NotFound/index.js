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
import { push } from 'connected-react-router';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styles from './styles';
import { _back, _pageNotFound } from '../../res/values/string';
import { setPageTitle, alert } from '../../store/actions/assistActions';
import { debounce } from '../../utils/assist';

class NotFound extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        this.props.setPageTitle(_pageNotFound);
    }

    render() {
        const { classes, changePage } = this.props;
        return (
            <Grid className={classes.normal} container direction={'row'} justify={'center'} alignItems={'center'}>
                <Grid item sm={7} xs={12} className={classes.left}/>
                <Grid item sm={5} xs={12} className={classes.right}>
                    <Typography variant="display1" gutterBottom>404</Typography>
                    <Typography variant="title" gutterBottom>{_pageNotFound}</Typography>
                    <Button
                        variant="outlined" color="primary"
                        onClick={changePage.bind(this, '/cloud-drive/0')}>{_back}</Button>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    setPageTitle: pageTitle => setPageTitle(pageTitle)(dispatch),
    alert: debounce((msgText, time) => alert(msgText, time)(dispatch)),
    changePage: url => dispatch(push(url)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(NotFound));
