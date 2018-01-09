import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Undo from 'material-ui-icons/Undo';
import { FolderIcon } from '../../components/file-type-icon';
import ResourceTypeIcon from '../../components/ResourceTypeIcon';
import styles from './styles';

/**
 * 获取文件后缀
 *
 * @param resourceName
 * @returns {string}
 */
const getResourceExt = resourceName => () => {
    const index = resourceName.lastIndexOf('.');
    return resourceName.substr(index + 1);
};


const ResourceList = props => (
    <List className={props.classes.normal}>
        {
            props.onBack ?
                (<ListItem
                    button
                    onClick={props.onBack()}>
                    <ListItemIcon className={props.classes.resourceIcon}><Undo/></ListItemIcon>
                    <ListItemText primary="返回上一级"/>
                </ListItem>) : null
        }
        {props.resourceList.map((resource) => {
            return (
                <ListItem
                    button
                    key={resource.id}
                    onClick={props.onClickDir(resource.id, resource.file)}>
                    <ListItemIcon className={props.classes.resourceIcon}>
                        {
                            resource.file ?
                                <ResourceTypeIcon ext={getResourceExt(resource.resource_name)}/> :
                                <FolderIcon/>
                        }
                    </ListItemIcon>
                    <ListItemText primary={resource.resource_name}/>
                    <ListItemSecondaryAction>
                        {
                            props.checked ?
                                (<Checkbox
                                    onChange={props.toggleCheck(resource.id)}
                                    checked={props.checked.indexOf(resource.id) !== -1}/>) : null
                        }
                    </ListItemSecondaryAction>
                </ListItem>
            );
        })}
    </List>
);

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(ResourceList));
