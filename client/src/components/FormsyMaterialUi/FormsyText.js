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
