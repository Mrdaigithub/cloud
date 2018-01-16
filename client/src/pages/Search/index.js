import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from 'material-ui/styles';
import { replace, goBack } from 'react-router-redux';
import Drawer from 'material-ui/Drawer';
import Dialog from 'material-ui/Dialog';
import Card, { CardHeader, CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Input, { InputAdornment } from 'material-ui/Input';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import { FormControl } from 'material-ui/Form';
import IconButton from 'material-ui/IconButton';
import ArrowBack from 'material-ui-icons/ArrowBack';
import SearchIcon from 'material-ui-icons/Search';
import Info from 'material-ui-icons/Info';
import { FolderIcon } from '../../components/file-type-icon';
import ResourceList from '../../components/ResourceList';
import ResourceTypeIcon from '../../components/ResourceTypeIcon/index';
import styles from './styles';
import requester from '../../utils/requester';

/**
 * 获取文件后缀
 *
 * @param resourceName
 * @returns {string}
 */
const getResourceExt = (resourceName) => {
    if (resourceName.split('.').length <= 1) return '文件夹';
    const index = resourceName.lastIndexOf('.');
    return resourceName.substr(index + 1);
};

/**
 * 0.1.2.3 => 0/1/2/3
 *
 * @param path
 * @returns {string}
 */
const path2url = (path) => {
    return path.split('.')
        .map(item => item.trim())
        .filter(item => item)
        .join('/');
};

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rightDrawer: false,
            query: '',
            result: [],
            showName: '',
            showExt: '',
            showPath: '',
            showCreatedAt: '',
            showUpdatedAt: '',
        };
        this.handleSearch = this.handleSearch.bind(this);
    }

    closeDrawer = () => {
        this.setState({
            rightDrawer: false,
            showName: '',
            showPath: '',
            showCreatedAt: '',
            showUpdatedAt: '',
        });
    };

    handleInput = name => (event) => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleClickResource = (id, file, path) => {
        if (file) return;
        this.props.changePage(`/cloud-drive/${path2url(path)}`);
    };

    handleShowResourceInfo = ({ name, path, createdAt, updatedAt }) => {
        this.setState({
            rightDrawer: true,
            showName: name,
            showExt: getResourceExt(name),
            showPath: path,
            showCreatedAt: createdAt,
            showUpdatedAt: updatedAt,
        });
    };

    async handleSearch() {
        let { query } = this.state;
        query = query.trim();
        if (!query) return;
        const result = await requester.get(`resources/search?q=${query}`);
        this.setState({ result });
    }

    /**
     * 下载资源
     *
     * @param resourceID
     * @returns {Promise.<void>}
     */
    async handleDownload(resourceID) {
        const downloadUrl = await requester.get(`secret/${resourceID}`);
        const downloadDom = document.createElement('a');
        downloadDom.id = 'downloadUrl';
        downloadDom.download = true;
        downloadDom.href = downloadUrl;
        document.querySelector('body')
            .appendChild(downloadDom);
        downloadDom.click();
        document.querySelector('body')
            .removeChild(downloadDom);
    }

    render() {
        const { classes, goBackPage } = this.props;
        const { query, result, showName, showExt, showPath, showCreatedAt, showUpdatedAt } = this.state;
        return (
            <div>
                <Dialog
                    open
                    fullScreen
                    className={classes.searchList}>
                    <FormControl>
                        <Input
                            id="query"
                            type="text"
                            autoFocus
                            placeholder="搜索所有内容"
                            fullWidth
                            value={query}
                            className={classes.searchInput}
                            onChange={this.handleInput('query')}
                            onKeyPress={event => (event.key === 'Enter' ? this.handleSearch() : null)}
                            disableUnderline
                            endAdornment={
                                <IconButton onClick={this.handleSearch}>
                                    <SearchIcon/>
                                </IconButton>
                            }
                            startAdornment={
                                <InputAdornment position="start">
                                    <IconButton onClick={goBackPage}>
                                        <ArrowBack/>
                                    </IconButton>
                                </InputAdornment>
                            }/>
                    </FormControl>
                    <div className={classes.normal}>
                        <ResourceList
                            className={classes.searchList}
                            resourceList={result}
                            ItemIcon={Info}
                            onClickResource={this.handleClickResource}
                            onClickAction={this.handleShowResourceInfo}
                            onDownload={this.handleDownload}/>
                    </div>
                </Dialog>
                <Drawer
                    anchor="right"
                    open={this.state.rightDrawer}
                    onRequestClose={this.closeDrawer}>
                    <div className={classes.rightDrawer}>
                        <Card
                            className={classes.rightDrawerCard}
                            tabIndex={0}
                            role="button"
                            onKeyDown={this.closeDrawer}>
                            <CardHeader
                                avatar={showExt === '文件夹' ? <FolderIcon className={classes.iconColor}/> : <ResourceTypeIcon ext={showExt}/>}
                                title={
                                    <Grid item xs={12}>
                                        <h2 className={classes.rightDrawerCardTitle}>{showName}</h2>
                                    </Grid>
                                }/>
                            <Divider/>
                            <CardContent>
                                <Typography
                                    component="p"
                                    className={classes.rightDrawerCardContentText}>
                                    类型&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <span className={classes.rightDrawerCardContentRightText}>
                                        {showExt.toUpperCase()}
                                    </span>
                                </Typography>
                                <Typography
                                    component="p"
                                    className={classes.rightDrawerCardContentText}>
                                    路径&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <span className={classes.rightDrawerCardContentRightText}>
                                        {`/${path2url(showPath)}`}
                                    </span>
                                </Typography>
                                <Typography
                                    component="p"
                                    className={classes.rightDrawerCardContentText}>
                                    创建时间
                                    <span className={classes.rightDrawerCardContentRightText}>
                                        {showCreatedAt}
                                    </span>
                                </Typography>
                                <Typography
                                    component="p"
                                    className={classes.rightDrawerCardContentText}>
                                    修改时间
                                    <span className={classes.rightDrawerCardContentRightText}>
                                        {showUpdatedAt}
                                    </span>
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                </Drawer>
            </div>
        );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({
    changePage: url => (replace(url)),
    goBackPage: () => (goBack()),
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(Search));
