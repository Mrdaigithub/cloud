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
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

class SpeedDial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
        this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle() {
        this.setState({
            open: !this.state.open,
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <div
                className={classes.cover}>
                <div className={this.state.open ? classes.opened : classes.closed}>
                    <ul className={classes.action}>
                        {this.props.children}
                    </ul>
                    <Button
                        variant="fab"
                        color="primary"
                        onClick={this.handleToggle.bind(this)}
                        className={classes.floatButton}
                        aria-label="add">
                        <AddIcon/>
                    </Button>
                </div>
            </div>
        );
    }
}


export default withStyles(styles)(SpeedDial);
export { default as SpeedDialItem } from './SpeedDialItem';
