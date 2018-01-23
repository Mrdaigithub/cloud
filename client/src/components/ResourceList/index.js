import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import List, { ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import Undo from 'material-ui-icons/Undo';
import Divider from 'material-ui/Divider';
import { FolderIcon } from '../../components/file-type-icon';
import ResourceTypeIcon from '../../components/ResourceTypeIcon';
import styles from './styles';
import { clearSelectedResource, getSelectedResource } from '../../store/modules/resource';

/**
 * 获取文件后缀
 *
 * @param resourceName
 * @returns {string}
 */
const getResourceExt = (resourceName) => {
    const index = resourceName.lastIndexOf('.');
    return resourceName.substr(index + 1);
};

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
        const { classes, onBack, resourceList, checked, toggleCheck, ItemIcon, onClickAction } = this.props;
        return (
            <div className={classes.root}>
                <List className={classes.normal}>
                    {
                        onBack ?
                            (
                                <div>
                                    <ListItem
                                        button
                                        onClick={onBack()}>
                                        <ListItemIcon className={classes.resourceListIcon}><Undo/></ListItemIcon>
                                        <ListItemText primary="返回上一级"/>
                                    </ListItem>
                                    <Divider/>
                                </div>
                            ) : null
                    }
                    {resourceList.map(resource => (
                        <div key={resource.id}>
                            <ListItem
                                button
                                className={classes.resourceItem}
                                onClick={this.handleClickResource(resource)}>
                                <ListItemIcon className={classes.resourceListIcon}>
                                    {
                                        resource.file ?
                                            <ResourceTypeIcon ext={getResourceExt(resource.resource_name)}/> :
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
                </List>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    resourceID: state.resource.selectedResource.resourceID,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getSelectedResource,
    clearSelectedResource,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(ResourceList));
