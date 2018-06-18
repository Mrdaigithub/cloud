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
import { withStyles } from '@material-ui/core/styles';
import mime from 'mime-types';
import { replace, goBack } from 'connected-react-router';
import Dialog from '@material-ui/core/Dialog';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import SearchIcon from '@material-ui/icons/Search';
import Info from '@material-ui/icons/Info';
import ResourceList from '../../components/ResourceList';
import ResourceDetail from '../../components/ResourceList/ResourceDetail';
import { path2url } from '../../utils/assist';
import { getSelectedResource, clearSelectedResource } from '../../store/actions/resourceActions';
import styles from './styles';
import requester from '../../utils/requester';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ResourceDetailOpen: false,
            query: '',
            result: [],
        };
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleCloseResourceDetail = () => {
        this.setState({ ResourceDetailOpen: false });
        this.props.clearSelectedResource();
    };

    handleInput = name => (event) => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleClickResource = ({ path }) => {
        this.setState({ result: [] });
        this.props.changePage(`/cloud-drive/${path2url(path)}`);
    };

    handleOpenResourceDetail = ({ id, name, path, createdAt, updatedAt }) => {
        this.props.getSelectedResource({ resourceID: id, resourceName: name, resourceMime: mime.lookup(name), resourcePath: path, resourceCreatedAt: createdAt, resourceUpdatedAt: updatedAt });
        this.setState({
            ResourceDetailOpen: true,
        });
    };

    async handleSearch() {
        let { query } = this.state;
        query = query.trim();
        if (!query) return;
        const result = await requester.get(`resources/search?q=${query}`);
        this.setState({ result });
    }

    render() {
        const { classes } = this.props;
        const { query, result } = this.state;
        return (
            <div>
                <Dialog
                    open
                    fullScreen
                    className={classes.searchList}>
                    <FormControl>
                        <Input
                            id="query"
                            type="text"
                            autoFocus
                            placeholder="搜索所有内容"
                            fullWidth
                            value={query}
                            className={classes.searchInput}
                            onChange={this.handleInput('query')}
                            onKeyPress={event => (event.key === 'Enter' ? this.handleSearch() : null)}
                            disableUnderline
                            endAdornment={
                                <IconButton onClick={this.handleSearch}>
                                    <SearchIcon/>
                                </IconButton>
                            }
                            startAdornment={
                                <InputAdornment position="start">
                                    <IconButton onClick={this.props.goBackPage}>
                                        <ArrowBack/>
                                    </IconButton>
                                </InputAdornment>
                            }/>
                    </FormControl>
                    <div className={classes.normal}>
                        <ResourceList
                            className={classes.searchList}
                            resourceList={result}
                            ItemIcon={Info}
                            onClickResource={this.handleClickResource}
                            onClickAction={this.handleOpenResourceDetail}/>
                    </div>
                </Dialog>
                <ResourceDetail
                    open={this.state.ResourceDetailOpen}
                    onClose={this.handleCloseResourceDetail}/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    selectedResource: state.resource.selectedResource,
});

const mapDispatchToProps = dispatch => ({
    getSelectedResource: selectedResource => dispatch(getSelectedResource(selectedResource)),
    clearSelectedResource: () => dispatch(clearSelectedResource()),
    changePage: url => dispatch(replace(url)),
    goBackPage: () => dispatch(goBack()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(Search));
