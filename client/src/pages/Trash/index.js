import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import Undo from 'material-ui-icons/Undo';
import DeleteIcon from 'material-ui-icons/Delete';
import Checkbox from 'material-ui/Checkbox';
import ResourceList from '../../components/ResourceList';
import ResourceDetail from '../../components/ResourceList/ResourceDetail';
import SpeedDial, { SpeedDialItem } from '../../components/SpeedDial';
import styles from './styles';
import requester from '../../utils/requester';
import { fetchOneself } from '../../store/modules/oneself';
import { fetchResources, clearSelectedResource, getSelectedResource } from '../../store/modules/resource';

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

class Trash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ResourceDetailOpen: false,
            trashList: [],
            selected: [],
        };
    }

    async componentWillMount() {
        if (!this.props.resources) {
            this.props.fetchResources(() => {
                this.getTrashList();
            });
        } else {
            this.getTrashList();
        }
    }


    /**
     * 获取当前回收站的资源列表
     */
    getTrashList() {
        const { resources } = this.props;
        let rList = [];
        for (const r in resources) {
            if (Object.prototype.hasOwnProperty.call(resources, r)) {
                rList = [...rList, ...Array.from(resources[r])];
            }
        }
        this.setState({
            trashList: rList.filter(r => r.trashed && r.trash_path === '0') || [],
            selected: [],
        });
    }

    handleClickResource = ({ id, name, path, createdAt, updatedAt }) => {
        this.props.getSelectedResource(id, name, getResourceExt(name), path, createdAt, updatedAt);
        this.setState({ ResourceDetailOpen: true });
    };

    handleCloseResourceDetail = () => {
        this.setState({ ResourceDetailOpen: false });
        this.props.clearSelectedResource();
    };

    handleCheckResource = resourceID => () => {
        const { selected } = this.state;
        const currentIndex = selected.indexOf(resourceID);
        const newChecked = [...selected];

        if (currentIndex === -1) {
            newChecked.push(resourceID);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        this.setState({
            selected: newChecked,
        });
    };

    /**
     * 恢复资源
     * @returns {Promise.<void>}
     */
    handleRestoreResource = () => async () => {
        const { selected } = this.state;
        console.log(selected);
        for (const id of selected) {
            await requester.patch(`resources/${id}/restore`);
        }
        this.props.fetchResources(() => this.getTrashList());
    };

    /**
     * 彻底删除资源
     * @returns {Promise<void>}
     */
    handleRemoveResource = () => async () => {
        const { selected } = this.state;
        if (selected.length) {
            for (const id of selected) {
                await requester.delete(`resources/${id}`);
            }
            this.props.fetchResources(() => {
                this.getTrashList();
                this.props.fetchOneself();
            });
        }
    };

    render() {
        const { classes } = this.props;
        const { trashList, selected } = this.state;
        return (
            <div style={{ position: 'fixed', top: '60px', right: 0, left: 0, bottom: 0 }}>
                <ResourceList
                    resourceList={trashList}
                    ItemIcon={Checkbox}
                    checked={this.state.selected}
                    onClickResource={this.handleClickResource}
                    toggleCheck={this.handleCheckResource}/>
                <ResourceDetail
                    open={this.state.ResourceDetailOpen}
                    onClose={this.handleCloseResourceDetail}/>
                <SpeedDial>
                    <SpeedDialItem>
                        <label htmlFor="icon-button-move">
                            <IconButton
                                onClick={this.handleRestoreResource()}
                                disabled={!selected.length}
                                color="primary"
                                className={classes.SpeedDialItemButton}
                                component="span">
                                <Undo/>
                            </IconButton>
                        </label>
                    </SpeedDialItem>
                    <SpeedDialItem>
                        <label htmlFor="icon-button-remove">
                            <IconButton
                                onClick={this.handleRemoveResource()}
                                disabled={!selected.length}
                                color="primary"
                                className={classes.SpeedDialItemButton}
                                component="span">
                                <DeleteIcon/>
                            </IconButton>
                        </label>
                    </SpeedDialItem>
                </SpeedDial>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    resources: state.resource.resources,
    selectedResource: state.resource.selectedResource,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchOneself,
    fetchResources,
    getSelectedResource,
    clearSelectedResource,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(Trash));
