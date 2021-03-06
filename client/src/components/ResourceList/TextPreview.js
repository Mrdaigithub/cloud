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
import { withStyles } from 'material-ui/styles';
import requester from '../../utils/requester';
import styles from './styles';


class TextPreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            docUrl: null,
        };
    }

    async componentWillMount() {
        const docUrl = await requester.get(`resources/secret/${this.props.selectedResource.resourceID}`);
        this.setState({ docUrl: `https://docs.google.com/viewer?embedded=true&url=http:${docUrl}` });
    }

    render() {
        const { classes } = this.props;
        return (
            <iframe title="textPreview" className={classes.textPreview} src={this.state.docUrl}>
                <p>Your browser does not support iframes.</p>
            </iframe>
        );
    }
}

const mapStateToProps = state => ({
    selectedResource: state.resource.selectedResource,
});

export default connect(
    mapStateToProps,
)(withStyles(styles)(TextPreview));
