import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
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
import ResourceDetail from '../../components/ResourceList/ResourceDetail';
import styles from './styles';


class ResourceDescribe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            rightDrawer: false,
        };
    }

    handleClickMenu = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleCloseMenu = () => {
        this.setState({ anchorEl: null });
    };

    handleShowResourceInfo = () => {
        this.setState({ rightDrawer: true });
        this.handleCloseMenu();
    };

    closeDrawer = () => {
        this.setState({ rightDrawer: false });
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
                                    ext={this.props.selectedResource.resourceExt}/>
                                {this.props.selectedResource.resourceName || '未命名'}
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
                                <MenuItem onClick={this.handleShowResourceInfo}>
                                    <ListItemIcon>
                                        <Info/>
                                    </ListItemIcon>
                                    <ListItemText inset primary="详细信息"/>
                                </MenuItem>
                            </Menu>
                        </Toolbar>
                    </AppBar>
                    <ResourceDetail
                        open={this.state.rightDrawer}
                        onClose={this.closeDrawer}/>
                    <div className={props.classes.modal}>
                        asdadsasd
                    </div>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = state => ({
    selectedResource: state.resource.selectedResource,
});

export default connect(
    mapStateToProps,
)(withStyles(styles)(ResourceDescribe));
