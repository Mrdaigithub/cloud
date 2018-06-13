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
import { bindActionCreators } from 'redux';
import { withStyles } from 'material-ui/styles';
import mime from 'mime-types';
import { replace, goBack } from 'react-router-redux';
import Dialog from 'material-ui/Dialog';
import Input, { InputAdornment } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import IconButton from 'material-ui/IconButton';
import ArrowBack from 'material-ui-icons/ArrowBack';
import SearchIcon from 'material-ui-icons/Search';
import Info from 'material-ui-icons/Info';
import ResourceList from '../../components/ResourceList';
import ResourcePreview from '../../components/ResourceList/ResourcePreview';
import ResourceDetail from '../../components/ResourceList/ResourceDetail';
import { getPreview, path2url } from '../../utils/assist';
import { getSelectedResource, clearSelectedResource } from '../../store/modules/resource';
import styles from './styles';
import requester from '../../utils/requester';


class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ResourcePreviewOpen: false,
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

    handleOpenResourcePreview = ({ id, name, path, file, createdAt, updatedAt }) => {
        if (!file) {
            this.props.changePage(`/cloud-drive/${path2url(path)}`);
        } else {
            this.props.getSelectedResource(id, name, mime.lookup(name), path, createdAt, updatedAt);
            this.setState({ ResourcePreviewOpen: true });
        }
        this.setState({ result: [] });
    };

    handleCloseResourcePreview = () => {
        this.setState({ ResourcePreviewOpen: false });
        this.props.clearSelectedResource();
    };

    handleOpenResourceDetail = ({ id, name, path, createdAt, updatedAt }) => {
        this.props.getSelectedResource(id, name, mime.lookup(name), path, createdAt, updatedAt);
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

    /**
     * 下载资源
     *
     * @param resourceID
     * @returns {Promise.<void>}
     */
    handleDownload = resourceID => async () => {
        const downloadUrl = await requester.get(`resources/link/${resourceID}`);
        const downloadDom = document.createElement('a');
        downloadDom.id = 'downloadUrl';
        downloadDom.download = true;
        downloadDom.href = downloadUrl.url;
        document.querySelector('body')
            .appendChild(downloadDom);
        downloadDom.click();
        document.querySelector('body')
            .removeChild(downloadDom);
    };

    render() {
        const { classes, goBackPage, selectedResource } = this.props;
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
                                    <IconButton onClick={goBackPage}>
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
                            onClickResource={this.handleOpenResourcePreview}
                            onClickAction={this.handleOpenResourceDetail}/>
                        <ResourcePreview
                            open={this.state.ResourcePreviewOpen}
                            onDownload={this.handleDownload(this.props.selectedResource.resourceID)}
                            onClose={this.handleCloseResourcePreview}>
                            {getPreview(selectedResource.resourceName)}
                        </ResourcePreview>
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

const mapDispatchToProps = dispatch => bindActionCreators({
    changePage: url => (replace(url)),
    goBackPage: () => (goBack()),
    getSelectedResource,
    clearSelectedResource,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(Search));
