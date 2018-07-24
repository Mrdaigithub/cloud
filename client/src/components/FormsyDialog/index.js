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
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Transition from '../Transition';
import { _cancel, _ok } from '../../res/values/string';
import styles from '../OfflineDownloader/styles';
import { FormsyText } from '../FormsyMaterialUi';

class FormsyDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { open, onClose, value, onSubmit, title, validations, validationErrors } = this.props;

        return (
            <Dialog
                open={open}
                TransitionComponent={Transition}>
                <Formsy onValidSubmit={onSubmit}>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogContent>
                        <FormsyText
                            name="text"
                            value={value || ''}
                            validations={validations || {}}
                            validationErrors={validationErrors || {}}
                            required
                            fullWidth
                            autoFocus/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onClose}>{_cancel}</Button>
                        <Button variant="contained" type="submit" color="primary">{_ok}</Button>
                    </DialogActions>
                </Formsy>
            </Dialog>
        );
    }
}

FormsyDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    value: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    validations: PropTypes.object,
    validationErrors: PropTypes.object,
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(FormsyDialog));
