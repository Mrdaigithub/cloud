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

/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import JssProvider from 'react-jss/lib/JssProvider';
import { withStyles, MuiThemeProvider } from '@material-ui/core/styles';
import wrapDisplayName from 'recompose/wrapDisplayName';
import createContext from '../styles/createContext';

// Apply some reset
const styles = theme => ({
    '@global': {
        html: {
            background: theme.palette.background.default,
            WebkitFontSmoothing: 'antialiased', // Antialiasing.
            MozOsxFontSmoothing: 'grayscale', // Antialiasing.
        },
        body: {
            margin: 0,
            padding: 0,
        },
    },
});

let AppWrapper = props => props.children;

AppWrapper = withStyles(styles)(AppWrapper);

const context = createContext();

function withRoot(BaseComponent) {
    class WithRoot extends Component {
        componentDidMount() {
            // Remove the server-side injected CSS.
            const jssStyles = document.querySelector('#jss-server-side');
            if (jssStyles && jssStyles.parentNode) {
                jssStyles.parentNode.removeChild(jssStyles);
            }
        }

        render() {
            return (
                <JssProvider registry={context.sheetsRegistry} jss={context.jss}>
                    <MuiThemeProvider theme={context.theme} sheetsManager={context.sheetsManager}>
                        <AppWrapper>
                            <BaseComponent {...this.props}/>
                        </AppWrapper>
                    </MuiThemeProvider>
                </JssProvider>
            );
        }
    }

    if (process.env.NODE_ENV !== 'production') {
        WithRoot.displayName = wrapDisplayName(BaseComponent, 'withRoot');
    }

    return WithRoot;
}

export default withRoot;
