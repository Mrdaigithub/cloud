import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import Modal from 'material-ui/Modal';
import Typography from 'material-ui/Typography';
import Menu, { MenuItem } from 'material-ui/Menu';
import { ListItemIcon, ListItemText } from 'material-ui/List';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import FileDownload from 'material-ui-icons/FileDownload';
import Delete from 'material-ui-icons/Delete';
import Edit from 'material-ui-icons/Edit';
import Info from 'material-ui-icons/Info';
import ResourceTypeIcon from '../ResourceTypeIcon/index';
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

class ResourceDescribe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
        };
    }

    handleClickMenu = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleCloseMenu = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const props = this.props;
        const { anchorEl } = this.state;
        return (
            <Modal
                open={props.open}>
                <div>
                    <AppBar className={props.classes.modalHeader}>
                        <Toolbar>
                            <IconButton color="inherit" onClick={props.onClose} aria-label="Close">
                                <CloseIcon/>
                            </IconButton>
                            <Typography type="title" color="inherit" className={props.classes.modalHeaderFlex}>
                                <ResourceTypeIcon
                                    style={{ width: ':30px', height: '30px', verticalAlign: 'middle', marginRight: '10px' }}
                                    className={props.classes.modalHeaderFileIcon}
                                    ext={getResourceExt(props.name)}/>
                                {props.name || '未命名'}
                            </Typography>
                            <IconButton color="inherit" onClick={props.onDownload}>
                                <FileDownload/>
                            </IconButton>
                            <IconButton
                                id="resourceDesMenuIcon"
                                color="inherit"
                                onClick={this.handleClickMenu}>
                                <MoreVertIcon/>
                            </IconButton>
                            <Menu
                                open={Boolean(anchorEl)}
                                anchorEl={anchorEl}
                                onClose={this.handleCloseMenu}
                                PaperProps={{
                                    style: {
                                        width: 160,
                                    },
                                }}>
                                <MenuItem onClick={props.rename}>
                                    <ListItemIcon>
                                        <Edit/>
                                    </ListItemIcon>
                                    <ListItemText inset primary="重命名"/>
                                </MenuItem>
                                <MenuItem onClick={props.remove}>
                                    <ListItemIcon>
                                        <Delete/>
                                    </ListItemIcon>
                                    <ListItemText inset primary="删除"/>
                                </MenuItem>
                                <MenuItem>
                                    <ListItemIcon>
                                        <Info/>
                                    </ListItemIcon>
                                    <ListItemText inset primary="详细信息"/>
                                </MenuItem>
                            </Menu>
                        </Toolbar>
                    </AppBar>
                    <div className={props.classes.modal}>
                        asdadsasd
                    </div>
                </div>
            </Modal>
        );
    }
}


export default withStyles(styles)(ResourceDescribe);
