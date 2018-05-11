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
import { propTypes, withFormsy } from 'formsy-react';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';


class FormsyText extends Component {
    constructor(props) {
        super(props);
        this.changeValue = this.changeValue.bind(this);
    }

    changeValue(event) {
        this.props.setValue(event.currentTarget[this.props.type === 'checkbox' ? 'checked' : 'value']);
    }

    render() {
        const {
            getErrorMessage,
            autoFocus,
            fullWidth,
            title,
            type,
            getValue,
            endAdornment,
            startAdornment,
            disabled,
        } = this.props;
        const errorMessage = getErrorMessage();
        return (
            <FormControl error={!!errorMessage} fullWidth={fullWidth}>
                <InputLabel>{title}</InputLabel>
                <Input
                    autoFocus={autoFocus}
                    id={title}
                    type={type || 'text'}
                    value={getValue() || ''}
                    disabled={disabled || false}
                    autoComplete="off"
                    endAdornment={endAdornment}
                    startAdornment={startAdornment}
                    onChange={this.changeValue}/>
                <FormHelperText>{errorMessage}</FormHelperText>
            </FormControl>
        );
    }
}

FormsyText.propTypes = {
    ...propTypes,
};

export default withFormsy(FormsyText);
