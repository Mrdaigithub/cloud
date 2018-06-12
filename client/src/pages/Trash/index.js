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
import IconButton from 'material-ui/IconButton';
import Undo from 'material-ui-icons/Undo';
import DeleteIcon from 'material-ui-icons/Delete';
import Checkbox from 'material-ui/Checkbox';
import ResourceList from '../../components/ResourceList';
import ResourceDetail from '../../components/ResourceList/ResourceDetail';
import SpeedDial, { SpeedDialItem } from '../../components/SpeedDial';
import styles from './styles';
import requester from '../../utils/requester';
import { fetchOneself } from '../../store/modules/oneself';
import { fetchResources, clearSelectedResource, getSelectedResource } from '../../store/modules/resource';


class Trash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ResourceDetailOpen: false,
            trashList: [],
            selected: [],
        };
    }

    async componentWillMount() {
        if (!this.props.resources) {
            this.props.fetchResources(() => {
                this.getTrashList();
            });
        } else {
            this.getTrashList();
        }
    }


    /**
     * 获取当前回收站的资源列表
     */
    getTrashList() {
        const { resources } = this.props;
        this.setState({
            trashList: resources.filter(r => r.trashed && r.trash_path === '0') || [],
            selected: [],
        });
    }

    handleClickResource = ({ id, name, path, createdAt, updatedAt }) => {
        this.props.getSelectedResource(id, name, mime.lookup(name), path, createdAt, updatedAt);
        this.setState({ ResourceDetailOpen: true });
    };

    handleCloseResourceDetail = () => {
        this.setState({ ResourceDetailOpen: false });
        this.props.clearSelectedResource();
    };

    handleCheckResource = resourceID => () => {
        const { selected } = this.state;
        const currentIndex = selected.indexOf(resourceID);
        const newChecked = [...selected];

        if (currentIndex === -1) {
            newChecked.push(resourceID);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        this.setState({
            selected: newChecked,
        });
    };

    /**
     * 恢复资源
     * @returns {Promise.<void>}
     */
    handleRestoreResource = () => async () => {
        const { selected } = this.state;
        for (const id of selected) {
            await requester.patch(`resources/${id}/restore`);
        }
        this.props.fetchResources(() => this.getTrashList());
    };

    /**
     * 彻底删除资源
     * @returns {Promise<void>}
     */
    handleRemoveResource = () => async () => {
        const { selected } = this.state;
        if (selected.length) {
            for (const id of selected) {
                await requester.delete(`resources/${id}`);
            }
            this.props.fetchResources(() => {
                this.getTrashList();
                this.props.fetchOneself();
            });
        }
    };

    render() {
        const { classes } = this.props;
        const { trashList, selected } = this.state;
        return (
            <div style={{ position: 'fixed', top: '60px', right: 0, left: 0, bottom: 0 }}>
                <ResourceList
                    resourceList={trashList}
                    ItemIcon={Checkbox}
                    checked={this.state.selected}
                    onClickResource={this.handleClickResource}
                    toggleCheck={this.handleCheckResource}/>
                <ResourceDetail
                    open={this.state.ResourceDetailOpen}
                    onClose={this.handleCloseResourceDetail}/>
                <SpeedDial>
                    <SpeedDialItem>
                        <label htmlFor="icon-button-move">
                            <IconButton
                                onClick={this.handleRestoreResource()}
                                disabled={!selected.length}
                                color="primary"
                                className={classes.SpeedDialItemButton}
                                component="span">
                                <Undo/>
                            </IconButton>
                        </label>
                    </SpeedDialItem>
                    <SpeedDialItem>
                        <label htmlFor="icon-button-remove">
                            <IconButton
                                onClick={this.handleRemoveResource()}
                                disabled={!selected.length}
                                color="primary"
                                className={classes.SpeedDialItemButton}
                                component="span">
                                <DeleteIcon/>
                            </IconButton>
                        </label>
                    </SpeedDialItem>
                </SpeedDial>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    resources: state.resource.resources,
    selectedResource: state.resource.selectedResource,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchOneself,
    fetchResources,
    getSelectedResource,
    clearSelectedResource,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(Trash));
