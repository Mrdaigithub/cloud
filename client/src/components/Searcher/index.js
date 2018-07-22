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
import { connect } from 'react-redux';
import { replace } from 'connected-react-router';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import CloseIcon from '@material-ui/icons/Close';
import Info from '@material-ui/icons/Info';
import Transition from '../../components/Transition';
import { logout } from '../../store/actions/oneselfActions';
import ResourceList from '../../components/ResourceList';
import ResourceDetail from '../../components/ResourceList/ResourceDetail';
import styles from './styles';
import { _searchPlaceholder } from '../../res/values/string';

const suggestions = [
    { label: 'Afghanistan' },
    { label: 'Aland Islands' },
    { label: 'Albania' },
    { label: 'Algeria' },
    { label: 'American Samoa' },
    { label: 'Andorra' },
    { label: 'Angola' },
    { label: 'Anguilla' },
    { label: 'Antarctica' },
    { label: 'Antigua and Barbuda' },
    { label: 'Argentina' },
    { label: 'Armenia' },
    { label: 'Aruba' },
    { label: 'Australia' },
    { label: 'Austria' },
    { label: 'Azerbaijan' },
    { label: 'Bahamas' },
    { label: 'Bahrain' },
    { label: 'Bangladesh' },
    { label: 'Barbados' },
    { label: 'Belarus' },
    { label: 'Belgium' },
    { label: 'Belize' },
    { label: 'Benin' },
    { label: 'Bermuda' },
    { label: 'Bhutan' },
    { label: 'Bolivia, Plurinational State of' },
    { label: 'Bonaire, Sint Eustatius and Saba' },
    { label: 'Bosnia and Herzegovina' },
    { label: 'Botswana' },
    { label: 'Bouvet Island' },
    { label: 'Brazil' },
    { label: 'British Indian Ocean Territory' },
    { label: 'Brunei Darussalam' },
];

function renderInput(inputProps) {
    console.log(inputProps);
    const { classes, ref, ...other } = inputProps;

    return (
        <TextField
            fullWidth
            InputProps={{
                inputRef: ref,
                classes: {
                    input: classes.input,
                },
                ...other,
            }}/>
    );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
    const matches = match(suggestion.label, query);
    const parts = parse(suggestion.label, matches);

    return (
        <MenuItem selected={isHighlighted} component="div">
            <div>
                {parts.map((part, index) => {
                    return part.highlight ? (
                        <span key={String(index)} style={{ fontWeight: 500 }}>
                            {part.text}
                        </span>
                    ) : (
                        <strong key={String(index)} style={{ fontWeight: 300 }}>
                            {part.text}
                        </strong>
                    );
                })}
            </div>
        </MenuItem>
    );
}

function renderSuggestionsContainer(options) {
    const { containerProps, children } = options;

    return (
        <Paper {...containerProps} square>
            {children}
        </Paper>
    );
}

function getSuggestionValue(suggestion) {
    return suggestion.label;
}

function getSuggestions(value) {
    const inputValue = value.trim()
        .toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
        ? []
        : suggestions.filter((suggestion) => {
            const keep =
                count < 5 && suggestion.label.toLowerCase()
                    .slice(0, inputLength) === inputValue;

            if (keep) {
                count += 1;
            }

            return keep;
        });
}

class Searcher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ResourceDetailOpen: false,
            query: '',
            result: [],
            suggestions: [],
            value: '',
        };
    }

    handleInput = name => (event) => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleClearInput = () => {
        this.setState({
            query: '',
        });
    };

    handleSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: getSuggestions(value),
        });
    };

    handleSuggestionsClearRequested = () => {
        this.setState({
            suggestions: [],
        });
    };

    handleChange = (event, { newValue }) => {
        this.setState({
            value: newValue,
        });
    };

    render() {
        const { classes, open, onClose } = this.props;
        const { query, result } = this.state;

        return (
            <Dialog
                fullScreen
                open={open}
                TransitionComponent={Transition}>
                <AppBar classes={{ colorPrimary: classes.appBarColorPrimary }}>
                    <Toolbar>
                        <Autosuggest
                            theme={{
                                container: classes.container,
                                suggestionsContainerOpen: classes.suggestionsContainerOpen,
                                suggestionsList: classes.suggestionsList,
                                suggestion: classes.suggestion,
                            }}
                            renderInputComponent={renderInput}
                            suggestions={this.state.suggestions}
                            onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
                            onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
                            renderSuggestionsContainer={renderSuggestionsContainer}
                            getSuggestionValue={getSuggestionValue}
                            renderSuggestion={renderSuggestion}
                            inputProps={{
                                classes,
                                placeholder: 'Search a country (start with a)',
                                value: this.state.value,
                                onChange: this.handleChange,
                            }}/>
                    </Toolbar>
                </AppBar>
                <div className={classes.resultListContainer}>
                    <ResourceList
                        className={classes.searchList}
                        resourceList={result}
                        ItemIcon={Info}
                        onClickResource={this.handleClickResource}
                        onClickAction={this.handleOpenResourceDetail}/>
                </div>
            </Dialog>
        );
    }
}

Searcher.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    clearOneself: () => dispatch(logout()),
    changePage: url => dispatch(replace(url)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(Searcher));
