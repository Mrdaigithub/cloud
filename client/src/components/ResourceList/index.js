import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import List, { ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import Undo from 'material-ui-icons/Undo';
import Divider from 'material-ui/Divider';
import ResourcePreview from './ResourcePreview';
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
            resourceID: '',
            resourceName: '',
        };
    }

    onClickAction = ({ id, resource_name, path, created_at, updated_at }) => () => {
        this.props.onClickAction({
            id,
            name: resource_name,
            path,
            createdAt: created_at,
            updatedAt: updated_at,
        });
    };

    handleClickResource = (resource) => () => {
        console.log(resource);
        // if (file) {
        //     this.setState({ ResourceDescribeOpen: true });
        //     console.log();
        // this.props.getSelectedResource(name)
        // }
        // if (this.props.onClickResource) {
        //     this.props.onClickResource(id, file, path);
        // }
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
                <ResourcePreview
                    open={this.state.ResourceDescribeOpen}
                    name={this.state.resourceName}
                    onDownload={this.handleDownload}
                    onClose={this.handleClose}/>
            </div>
        );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({
    getSelectedResource,
    clearSelectedResource,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(ResourceList));
