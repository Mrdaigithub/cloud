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
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import qs from 'qs';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { ListItemIcon, ListItemText } from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FileDownload from '@material-ui/icons/FileDownload';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import Info from '@material-ui/icons/Info';
import Formsy from 'formsy-react';
import ResourceTypeIcon from '../ResourceTypeIcon/index';
import ResourceDetail from '../../components/ResourceList/ResourceDetail';
import { FormsyText } from '../../components/FormsyMaterialUi';
import styles from './styles';
import requester from '../../utils/requester';
import { fetchResources, getSelectedResource } from '../../store/modules/resource';


class ResourcePreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            ResourceDetailOpen: false,
            RenameDialogOpen: false,
        };
    }

    handleToggleMenu = (open = false) => (event) => {
        if (open) {
            this.setState({ anchorEl: event.currentTarget });
        } else {
            this.setState({ anchorEl: null });
        }
    };

    handleToggleResourceDetail = (open = false) => () => {
        if (open) {
            this.setState({ ResourceDetailOpen: true });
            this.handleToggleMenu()();
        } else {
            this.setState({ ResourceDetailOpen: false });
        }
    };

    handleCloseResourcePreview = () => {
        this.handleToggleMenu()();
        this.handleToggleResourceDetail()();
        if (this.props.onClose) this.props.onClose();
    };

    handleToggleRenameDialog = (open = false) => () => {
        this.setState({ RenameDialogOpen: open });
        if (!open) {
            this.handleToggleMenu()();
        }
    };

    handleRefresh = () => {
        if (this.props.onRefresh) this.props.onRefresh();
    };

    /**
     * 重命名
     *
     * @returns {Promise<void>}
     */
    handleRename = async (model) => {
        const { newName } = model;
        const { selectedResource } = this.props;
        const {
            id,
            resource_name,
            path,
            created_at,
            updated_at,
        } = await requester.patch(`resources/${selectedResource.resourceID}`, qs.stringify({
            resource_name: newName,
        }));
        this.props.getSelectedResource(id, resource_name, path, created_at, updated_at);
        this.props.fetchResources(() => this.handleRefresh());
        this.handleToggleRenameDialog()();
    };

    /**
     * 删除资源
     *
     * @returns {Promise<void>}
     */
    handleRemove = async () => {
        const { selectedResource } = this.props;
        await requester.patch(`resources/${selectedResource.resourceID}/trash`);
        this.props.fetchResources(() => this.handleRefresh());
        this.handleCloseResourcePreview();
    };

    render() {
        const { open, classes, onDownload, selectedResource, children } = this.props;
        const { anchorEl, RenameDialogOpen } = this.state;
        const newName = selectedResource.resourceName;
        return (
            <div>
                <Modal
                    open={open}>
                    <div>
                        <AppBar className={classes.modalHeader}>
                            <Toolbar>
                                <IconButton color="inherit" onClick={this.handleCloseResourcePreview} aria-label="Close">
                                    <CloseIcon/>
                                </IconButton>
                                <Typography type="title" color="inherit" className={classes.modalHeaderFlex}>
                                    <ResourceTypeIcon
                                        style={{ width: ':30px', height: '30px', verticalAlign: 'middle', marginRight: '10px' }}
                                        className={classes.modalHeaderFileIcon}
                                        ext={selectedResource.resourceMime}/>
                                    {selectedResource.resourceName || '未命名'}
                                </Typography>
                                <IconButton color="inherit" onClick={onDownload}>
                                    <FileDownload/>
                                </IconButton>
                                <IconButton
                                    id="resourceDesMenuIcon"
                                    color="inherit"
                                    onClick={this.handleToggleMenu(true)}>
                                    <MoreVertIcon/>
                                </IconButton>
                                <Menu
                                    open={Boolean(anchorEl)}
                                    anchorEl={anchorEl}
                                    onClose={this.handleToggleMenu()}
                                    PaperProps={{
                                        style: {
                                            width: 160,
                                        },
                                    }}>
                                    <MenuItem onClick={this.handleToggleRenameDialog(true)}>
                                        <ListItemIcon>
                                            <Edit/>
                                        </ListItemIcon>
                                        <ListItemText inset primary="重命名"/>
                                    </MenuItem>
                                    <MenuItem onClick={this.handleRemove}>
                                        <ListItemIcon>
                                            <Delete/>
                                        </ListItemIcon>
                                        <ListItemText inset primary="删除"/>
                                    </MenuItem>
                                    <MenuItem onClick={this.handleToggleResourceDetail(true)}>
                                        <ListItemIcon>
                                            <Info/>
                                        </ListItemIcon>
                                        <ListItemText inset primary="详细信息"/>
                                    </MenuItem>
                                </Menu>
                            </Toolbar>
                        </AppBar>
                        <ResourceDetail
                            open={this.state.ResourceDetailOpen}
                            onClose={this.handleToggleResourceDetail()}/>
                        <Grid
                            className={classes.fullScreen}
                            container
                            alignItems="center"
                            direction="row"
                            justify="center">
                            <Grid item className={classes.textCenter}>
                                {children}
                            </Grid>
                        </Grid>
                    </div>
                </Modal>
                <Dialog
                    open={RenameDialogOpen}>
                    <Formsy onValidSubmit={this.handleRename}>
                        <DialogTitle>重命名资源</DialogTitle>
                        <DialogContent>
                            <FormsyText
                                name="newName"
                                value={newName}
                                validations={{ matchRegexp: /(\w|\d){1,50}/ }}
                                validationError="名称不合法"
                                required
                                fullWidth
                                autoFocus/>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleToggleRenameDialog()} color="primary">关闭</Button>
                            <Button type="submit" color="primary">确认</Button>
                        </DialogActions>
                    </Formsy>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    selectedResource: state.resource.selectedResource,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchResources,
    getSelectedResource,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(ResourcePreview));
