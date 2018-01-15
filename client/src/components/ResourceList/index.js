import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Undo from 'material-ui-icons/Undo';
import Divider from 'material-ui/Divider';
import ResourceDescribe from './ResourceDescribe';
import { FolderIcon } from '../../components/file-type-icon';
import ResourceTypeIcon from '../../components/ResourceTypeIcon';
import styles from './styles';

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
            resourceID: '',
            resourceName: '',
        };
    }

    handleClickResource = (id, name, file) => () => {
        if (file) {
            this.setState({
                ResourceDescribeOpen: true,
                resourceID: id,
                resourceName: name,
            });
        }
        if (this.props.onClickResource) {
            this.props.onClickResource(id, file);
        }
    };

    handleDownload = () => {
        if (this.props.onDownload) this.props.onDownload(this.state.resourceID);
    };

    handleClose = () => {
        this.setState({
            ResourceDescribeOpen: false,
            resourceID: '',
            resourceName: '',
        });
        if (this.props.onClose) this.props.onClose();
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
                                onClick={this.handleClickResource(resource.id, resource.resource_name, resource.file)}>
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
                                            (<ItemIcon onClick={onClickAction(resource.id)}/>) : null
                                    }
                                </ListItemSecondaryAction>
                            </ListItem>
                            <Divider/>
                        </div>
                    ))}
                </List>
                <ResourceDescribe
                    open={this.state.ResourceDescribeOpen}
                    name={this.state.resourceName}
                    onDownload={this.handleDownload}
                    onClose={this.handleClose}/>
            </div>
        );
    }
}


export default withStyles(styles)(ResourceList);
