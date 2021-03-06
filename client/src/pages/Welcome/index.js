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
import Grid from 'material-ui/Grid';
import { LinearProgress } from 'material-ui/Progress';
import { bindActionCreators } from 'redux';
import { replace } from 'react-router-redux';
import { withStyles } from 'material-ui/styles';
import styles from './styles';
import logo from '../../static/logo.svg';

class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            completed: 0,
            time: 3,
        };
    }

    componentDidMount() {
        this.timer = setInterval(this.progress, 500);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    progress = () => {
        const { completed, time } = this.state;
        if (completed <= 100) {
            this.setState({ completed: completed + (100 / (time / 0.5)) });
        } else {
            this.props.changePage('/login');
        }
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                <LinearProgress mode="determinate" value={this.state.completed}/>
                <Grid container alignItems={'center'} justify={'center'} className={classes.normal}>
                    <Grid item xs={12}>
                        <img src={logo} alt="logo"/>
                        <h1>Cloud</h1>
                        <p>A simple cloud project</p>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({
    changePage: url => replace(url),
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(Welcome));
