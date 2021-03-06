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
import { withStyles } from 'material-ui/styles';
import styles from './style';

class BasicLayout extends Component {
    render() {
        const { children, classes } = this.props;
        return (
            <div>
                {children}
                <footer className={classes.globalFooter}>
                    <div>
                        <a className={classes.links} href="https://github.com/Mrdaigithub/cloud">
                            Github
                        </a>
                        <a className={classes.links} href="https://github.com/Mrdaigithub/cloud/blob/master/README.md">
                            Doc
                        </a>
                        <a className={classes.links} href="https://github.com/Mrdaigithub/cloud/blob/master/LICENSE">
                            LICENSE
                        </a>
                    </div>
                    <p className={classes.copyright}>Copyright (c) 2017 Mrdai</p>
                </footer>
            </div>
        );
    }
}

export default withStyles(styles)(BasicLayout);
