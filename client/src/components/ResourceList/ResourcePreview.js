import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import Modal from 'material-ui/Modal';
import Typography from 'material-ui/Typography';
import Formsy from 'formsy-react';
import Menu, { MenuItem } from 'material-ui/Menu';
import { ListItemIcon, ListItemText } from 'material-ui/List';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle,
} from 'material-ui/Dialog';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import FileDownload from 'material-ui-icons/FileDownload';
import Delete from 'material-ui-icons/Delete';
import Edit from 'material-ui-icons/Edit';
import Info from 'material-ui-icons/Info';
import ResourceTypeIcon from '../ResourceTypeIcon/index';
import ResourceDetail from '../../components/ResourceList/ResourceDetail';
import { FormsyText } from '../../components/FormsyMaterialUi';
import styles from './styles';
import requester from '../../utils/requester';
import { fetchResources } from '../../store/modules/resource';


class ResourceDescribe extends Component {
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

    /**
     * 重命名
     *
     * @returns {Promise<void>}
     */
    handleRename = async () => {
        const { selectedResource } = this.props;
        console.log(selectedResource.resourceID);
    };


    /**
     * 删除资源
     *
     * @returns {Promise<void>}
     */
    handleRemove = async () => {
        const { selectedResource } = this.props;
        await requester.patch(`resources/${selectedResource.resourceID}/trash`);
        this.props.fetchResources(() => null);
        this.handleCloseResourcePreview();
    };

    render() {
        const props = this.props;
        const { open, classes, onDownload } = this.props;
        const { anchorEl, RenameDialogOpen } = this.state;
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
                                        ext={this.props.selectedResource.resourceExt}/>
                                    {this.props.selectedResource.resourceName || '未命名'}
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
                        <div className={props.classes.modal}>
                            asdadsasd
                        </div>
                    </div>
                </Modal>
                <Dialog
                    open={RenameDialogOpen}>
                    <DialogTitle>重命名资源</DialogTitle>
                    <DialogContent>
                        <Formsy onValidSubmit={this.handleRename}>
                            <FormsyText
                                title="资源名称"
                                name="name"
                                validations={{ matchRegexp: /(\w|\d){1,20}/ }}
                                validationError="新名称不合法"
                                required
                                fullWidth
                                autoFocus/>
                        </Formsy>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleToggleRenameDialog()} color="primary">关闭</Button>
                        <Button onClick={this.handleClose} color="primary">确认</Button>
                    </DialogActions>
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
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(ResourceDescribe));
