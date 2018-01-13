import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import Undo from 'material-ui-icons/Undo';
import DeleteIcon from 'material-ui-icons/Delete';
import { alert } from '../../store/modules/assist';
import ResourceList from '../../components/ResourceList';
import SpeedDial, { SpeedDialItem } from '../../components/SpeedDial';
import styles from './styles';
import requester from '../../utils/requester';
import { fetchOneself } from '../../store/modules/oneself';
import { fetchResources, changeResourceListWithPath } from '../../store/modules/resource';


/**
 * 将url转化成上传的路径字符串/cloud-drive/0/1/2/3 => '0.1.2.3'
 *
 * @param url
 * @returns {string}
 */
const url2path = (url) => {
    return url.split('/')
        .filter(item => !!item && item !== 'cloud-drive')
        .map(item => item.trim()
            .replace(/(^\.+|\.+$)/, ''))
        .join('.');
};

class Trash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            trashList: [],
            selected: [],
        };
        this.handleRemoveResource = this.handleRemoveResource.bind(this);
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
        });
    }

    handleClickResource = (resourceID, file) => {
        console.log('show resource info');
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
     * 彻底删除资源
     * @returns {Promise<void>}
     */
    async handleRemoveResource() {
        const { resources } = this.props;
        const { selected, trashList } = this.state;
        if (selected.length) {
            // const deleteList = selected.map(id => requester.delete(`resources/${id}`));
            // await Promise.all(deleteList);
            console.log(trashList);
            selected.forEach(i => {
                this.props.changeResourceListWithPath(i.path, resources[i.path].filter(resource => selected.indexOf(resource.id) === -1));
            });
            this.getTrashList();
            this.props.fetchOneself();
        }
    }

    render() {
        const { classes } = this.props;
        const { trashList, selected } = this.state;
        return (
            <div>
                <ResourceList
                    resourceList={trashList}
                    checked={this.state.selected}
                    onClickResource={this.handleClickResource}
                    toggleCheck={this.handleCheckResource}/>
                <SpeedDial>
                    <SpeedDialItem>
                        <label htmlFor="icon-button-move">
                            <IconButton
                                onClick={this.handleOpenMoveDirDiglog}
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
                                onClick={this.handleRemoveResource}
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

const mapStateToProps = (state, routing) => ({
    routing,
    capacity: state.oneself.capacity,
    used: state.oneself.used,
    resources: state.resource.resources,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    changePage: url => (push(url)),
    alert,
    fetchOneself,
    fetchResources,
    changeResourceListWithPath,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(Trash));
