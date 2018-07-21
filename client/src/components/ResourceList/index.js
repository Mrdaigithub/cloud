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
import { bindActionCreators } from 'redux';
import mime from 'mime-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import { FolderIcon } from '../Icons';
import ResourceTypeIcon from '../ResourceTypeIconSwitcher';
import styles from './styles';
import { clearSelectedResource, getSelectedResource } from '../../store/actions/resourceActions';
import { _noData } from '../../res/values/string';

class ResourceList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ResourceDescribeOpen: false,
        };
    }

    onClickAction = ({ id, resource_name, path, file, created_at, updated_at }) => () => {
        if (this.props.onClickAction) {
            this.props.onClickAction({
                id,
                name: resource_name,
                path,
                file,
                createdAt: created_at,
                updatedAt: updated_at,
            });
        }
    };

    handleClickResource = ({ id, resource_name, path, file, created_at, updated_at }) => () => {
        if (this.props.onClickResource) {
            this.props.onClickResource({
                id,
                name: resource_name,
                path,
                file,
                createdAt: created_at,
                updatedAt: updated_at,
            });
        }
    };

    render() {
        const { classes, resourceList, checked, toggleCheck, ItemIcon, onClickAction } = this.props;

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
                    resourceList.length ?
                        <List className={classes.resourceList}>
                            {sortedResourceList.map(resource => (
                                <div key={resource.id}>
                                    <ListItem
                                        button
                                        className={classes.resourceItem}
                                        onClick={this.handleClickResource(resource)}>
                                        <ListItemIcon className={classes.resourceListIcon}>
                                            {
                                                resource.file ?
                                                    <ResourceTypeIcon ext={mime.lookup(resource.resource_name)}/> :
                                                    <FolderIcon/>
                                            }
                                        </ListItemIcon>
                                        <ListItemText primary={resource.resource_name}/>
                                        <ListItemSecondaryAction>
                                            {
                                                (checked && ItemIcon && toggleCheck) ?
                                                    (<ItemIcon
                                                        onChange={toggleCheck(resource.id)}
                                                        checked={checked.indexOf(resource.id) !== -1}/>) : null
                                            }
                                            {
                                                (ItemIcon && onClickAction) ?
                                                    (
                                                        <IconButton>
                                                            <ItemIcon
                                                                onClick={this.onClickAction(resource)}/>
                                                        </IconButton>
                                                    ) : null
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
            </div>
        );
    }
}

ResourceList.propTypes = {
    resourceList: PropTypes.array.isRequired,
    checked: PropTypes.array,
    toggleCheck: PropTypes.func,
    ItemIcon: PropTypes.func,
    onClickAction: PropTypes.func,
};

const mapStateToProps = state => ({
    resourceID: state.resource.selectedResource.resourceID,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getSelectedResource: selectedResource => dispatch(getSelectedResource(selectedResource)),
    clearSelectedResource: () => dispatch(clearSelectedResource()),
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(ResourceList));
