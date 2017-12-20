import React, { Component } from 'react';
import { propTypes, withFormsy } from 'formsy-react';


class FormsyText extends Component {
    constructor(props) {
        super(props);
        this.changeValue = this.changeValue.bind(this);
    }

    changeValue(event) {
        this.props.setValue(event.currentTarget[this.props.type === 'checkbox' ? 'checked' : 'value']);
    }

    render() {
        const className = `form-group ${this.props.className} ${this.props.showRequired() ? 'required' : ''} ${this.props.showError() ? 'error' : ''}`;
        const errorMessage = this.props.getErrorMessage();
        return (
            <div className={className}>
                <label htmlFor={this.props.name}>{this.props.title}</label>
                <input
                    onChange={this.changeValue}
                    name={this.props.name}
                    type={this.props.type || 'text'}
                    value={this.props.getValue() || ''}/>
                <span className="validation-error">{errorMessage}</span>
            </div>
        );
    }
}

FormsyText.propTypes = {
    ...propTypes,
};

export default withFormsy(FormsyText);
