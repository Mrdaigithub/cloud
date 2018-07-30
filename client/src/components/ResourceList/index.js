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
import mime from 'mime-types';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Checkbox from '@material-ui/core/Checkbox';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CloseIcon from '@material-ui/icons/Close';
import PlayListAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import DeleteIcon from '@material-ui/icons/Delete';
import UndoIcon from '@material-ui/icons/Undo';
import { FolderIcon } from '../Icons';
import ResourceTypeIcon from '../ResourceTypeIconSwitcher';
import styles from './styles';
import {
    clearSelectedResource, getSelectedResource,
    setCheckedResourceIdList, clearCheckedResourceIdList, setResourceList,
} from '../../store/actions/resourceActions';
import { _alreadyChecked, _back, _detail, _download, _item, _lastUpdatedAt, _moveTo, _noData, _remove, _rename, _share } from '../../res/values/string';
import { conversionCapacityUtil } from '../../utils/assist';
import { DATE_FORMAT } from '../../constants';

class ResourceList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ResourceDescribeOpen: false,
            anchorEl: null,
            checkedMenuAnchorEl: null,
        };
    }

    handleClickResource = ({ id, resource_name, path, file, created_at, updated_at }) => () => {
        this.props.onClickResource({
            id,
            name: resource_name,
            path,
            file,
            createdAt: created_at,
            updatedAt: updated_at,
        });
    };

    handleClickMoreVert = ({ id, resource_name, path, file, created_at, updated_at }) => (event) => {
        this.setState({ anchorEl: event.currentTarget });
        this.props.getSelectedResource({
            resourceID: id,
            resourceName: resource_name,
            resourceMime: mime.lookup(resource_name),
            resourcePath: path,
            file,
            resourceCreatedAt: created_at,
            resourceUpdatedAt: updated_at,
        });
    };

    handleCloseMoreVert = () => {
        this.setState({ anchorEl: null });
    };

    handleClickCheckedMenuMoreVert = (event) => {
        this.setState({ checkedMenuAnchorEl: event.currentTarget });
    };

    handleCloseCheckedMenuMoreVert = () => {
        this.setState({ checkedMenuAnchorEl: null });
    };

    handleCloseCheckedMode = () => {
        this.props.clearCheckedResourceIdList();
    };

    handleToggleCheck = resourceId => () => {
        const checkedResourceIdList = this.props.checkedResourceIdList;
        const index = checkedResourceIdList.indexOf(resourceId);

        if (index === -1) {
            checkedResourceIdList.push(resourceId);
        } else {
            checkedResourceIdList.splice(index, 1);
        }

        this.props.setCheckedResourceIdList(checkedResourceIdList);
    };

    handleCheckedAllResourceWithPath = () => {
        this.props.setCheckedResourceIdList(this.props.resourceList.map(resource => resource.id));
    };

    handleRename = () => {
        this.handleCloseMoreVert();
        if (!this.props.onRename || !this.props.resourceID) return;
        this.props.onRename(this.props.resourceID);
    };

    handleRemove = resourceIdList => () => {
        const _resourceIdList =
            Object.prototype.toString.call(resourceIdList) !== '[object Array]' ?
                [resourceIdList] : resourceIdList;
        this.handleCloseMoreVert();

        if (_resourceIdList.length) this.props.onRemove(_resourceIdList);

        this.props.clearCheckedResourceIdList();
    };

    handleMove = resourceIdList => () => {
        const _resourceIdList =
            Object.prototype.toString.call(resourceIdList) !== '[object Array]' ?
                [resourceIdList] : resourceIdList;
        this.handleCloseMoreVert();

        if (_resourceIdList.length) this.props.onMove(_resourceIdList);

        this.props.clearCheckedResourceIdList();
    };

    handleShare = () => {
        this.handleCloseMoreVert();
        if (!this.props.onRemove || !this.props.resourceID) return;
        this.props.onShare(this.props.resourceID);
    };

    handleDownload = () => {
        this.handleCloseMoreVert();
        if (!this.props.onRemove || !this.props.resourceID) return;
        this.props.onDownload(this.props.resourceID);
    };

    handleDetail = () => {
        this.handleCloseMoreVert();
        if (!this.props.onRemove || !this.props.resourceID) return;
        this.props.onDetail(this.props.resourceID);
    };

    render() {
        const {
            classes,
            resourceList,
            itemMenu,
            selectedResource,
            checkedResourceIdList,
            onBack,
        } = this.props;

        const { anchorEl, checkedMenuAnchorEl } = this.state;

        const sortedResourceList = resourceList
            .sort((v1, v2) => {
                return new Date(v2.updated_at).getTime() - new Date(v1.updated_at).getTime();
            })
            .sort((v1, v2) => {
                return v1.file === v2.file ? 0 : v1.file ? 1 : -1;
            });

        return (
            <div className={classes.root}>
                {
                    checkedResourceIdList && checkedResourceIdList.length ?
                        <AppBar
                            position="fixed"
                            color="default"
                            classes={{ colorDefault: classes.dark }}>
                            <Toolbar>
                                <IconButton className={classes.white} onClick={this.handleCloseCheckedMode}>
                                    <CloseIcon/>
                                </IconButton>
                                <Typography
                                    variant="title"
                                    className={classes.checkedTopBarTitle}>
                                    {
                                        checkedResourceIdList ?
                                            `${_alreadyChecked}${checkedResourceIdList.length}${_item}` :
                                            null
                                    }
                                </Typography>
                                <IconButton
                                    className={classes.white}
                                    onClick={this.handleCheckedAllResourceWithPath}>
                                    <PlayListAddCheckIcon/>
                                </IconButton>
                                <IconButton
                                    className={classes.white}
                                    onClick={this.handleRemove(checkedResourceIdList)}>
                                    <DeleteIcon/>
                                </IconButton>
                                <IconButton
                                    className={classes.white}
                                    onClick={this.handleClickCheckedMenuMoreVert}>
                                    <MoreVertIcon/>
                                </IconButton>
                            </Toolbar>
                        </AppBar> : null
                }
                {
                    resourceList.length || onBack ?
                        <List className={classes.resourceList}>
                            {
                                onBack ?
                                    (
                                        <div>
                                            <ListItem
                                                button
                                                className={classes.resourceItem}
                                                onClick={onBack}>
                                                <ListItemIcon className={classes.resourceListIcon}><UndoIcon/></ListItemIcon>
                                                <ListItemText primary={_back}/>
                                            </ListItem>
                                            <Divider/>
                                        </div>
                                    ) : null
                            }
                            {sortedResourceList.map(resource => (
                                <div key={resource.id}>
                                    <ListItem
                                        button
                                        className={classes.resourceItem}
                                        onClick={
                                            checkedResourceIdList ?
                                                this.handleToggleCheck(resource.id) :
                                                this.handleClickResource(resource)
                                        }>
                                        <ListItemIcon className={classes.resourceListIcon}>
                                            {
                                                resource.file ?
                                                    <ResourceTypeIcon ext={mime.lookup(resource.resource_name)}/> :
                                                    <FolderIcon/>
                                            }
                                        </ListItemIcon>
                                        <ListItemText
                                            primaryTypographyProps={{
                                                noWrap: true,
                                            }}
                                            primary={resource.resource_name}
                                            secondary={
                                                `${resource.file ? (`${conversionCapacityUtil(resource.size)}, `) : ''}
                                                ${_lastUpdatedAt}:
                                                ${moment(new Date(resource.updated_at))
                                                    .format(DATE_FORMAT)}`
                                            }/>
                                        <ListItemSecondaryAction>
                                            {
                                                checkedResourceIdList && checkedResourceIdList.length ?
                                                    <Checkbox
                                                        checked={checkedResourceIdList.indexOf(resource.id) !== -1}
                                                        value={resource.id.toString()}
                                                        onChange={this.handleToggleCheck(resource.id)}/> :
                                                    itemMenu ?
                                                        <IconButton onClick={this.handleClickMoreVert(resource)}>
                                                            <MoreVertIcon/>
                                                        </IconButton> : null
                                            }
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                    <Divider/>
                                </div>
                            ))}
                        </List> :
                        <Grid
                            className={classes.resourceListBlank} container direction={'row'} justify={'center'}
                            alignItems={'center'}>
                            <Grid item>
                                <Typography variant="caption" gutterBottom align="center">
                                    {_noData}
                                </Typography></Grid>
                        </Grid>
                }
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleCloseMoreVert}
                    PaperProps={{
                        style: {
                            maxHeight: 80 * 4.5,
                            width: 150,
                        },
                    }}>
                    <MenuItem onClick={this.handleRename}>
                        {_rename}
                    </MenuItem>
                    <MenuItem onClick={this.handleMove(selectedResource.resourceID)}>
                        {_moveTo}
                    </MenuItem>
                    <MenuItem onClick={this.handleShare}>
                        {_share}
                    </MenuItem>
                    <MenuItem onClick={this.handleDetail}>
                        {_detail}
                    </MenuItem>
                    {
                        selectedResource.file ?
                            <MenuItem onClick={this.handleDownload}>
                                {_download}
                            </MenuItem> : null
                    }
                    <MenuItem onClick={this.handleRemove(selectedResource.resourceID)}>
                        {_remove}
                    </MenuItem>
                </Menu>
                <Menu
                    anchorEl={checkedMenuAnchorEl}
                    open={Boolean(checkedMenuAnchorEl)}
                    onClose={this.handleCloseCheckedMenuMoreVert}
                    PaperProps={{
                        style: {
                            maxHeight: 80 * 4.5,
                            width: 150,
                        },
                    }}>
                    <MenuItem onClick={this.handleMove(checkedResourceIdList)}>
                        {_moveTo}
                    </MenuItem>
                    <MenuItem onClick={this.handleRename}>
                        {_download}
                    </MenuItem>
                </Menu>
            </div>
        );
    }
}

ResourceList.propTypes = {
    resourceList: PropTypes.array.isRequired,
    itemMenu: PropTypes.bool.isRequired,
    onClickResource: PropTypes.func.isRequired,
    onBack: PropTypes.func,
    onRename: PropTypes.func,
    onRemove: PropTypes.func,
    onShare: PropTypes.func,
    onDownload: PropTypes.func,
    onMove: PropTypes.func,
    onDetail: PropTypes.func,
};

ResourceList.defaultProps = {
    resourceList: [],
    itemMenu: true,
};

const mapStateToProps = state => ({
    resources: state.resource.resources,
    resourceID: state.resource.selectedResource.resourceID,
    selectedResource: state.resource.selectedResource,
    checkedResourceIdList: state.resource.checkedResourceIdList,
});

const mapDispatchToProps = dispatch => ({
    setResourceList: resourceList => dispatch(setResourceList(resourceList)),
    getSelectedResource: selectedResource => dispatch(getSelectedResource(selectedResource)),
    clearSelectedResource: () => dispatch(clearSelectedResource()),
    setCheckedResourceIdList: resourceIdList => setCheckedResourceIdList(resourceIdList)(dispatch),
    clearCheckedResourceIdList: () => dispatch(clearCheckedResourceIdList()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(ResourceList));
