import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from 'material-ui/styles';
import { replace } from 'react-router-redux';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import IconButton from 'material-ui/IconButton';
import ArrowBack from 'material-ui-icons/ArrowBack';
import SearchIcon from 'material-ui-icons/Search';
import Divider from 'material-ui/Divider';
import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Transition from '../../components/Transition';
import styles from './styles';


class Search extends Component {
    render() {
        const { classes } = this.props;
        return (
            <Dialog
                open
                fullScreen
                transition={Transition}>
                <FormControl className={classes.formControl}>
                    <Input
                        type="text"
                        placeholder="搜索所有内容"
                        value=""
                        className={classes.searchInput}
                        disableUnderline
                        endAdornment={
                            <IconButton>
                                <SearchIcon/>
                            </IconButton>
                        }
                        startAdornment={
                            <InputAdornment position="start">
                                <IconButton>
                                    <ArrowBack/>
                                </IconButton>
                            </InputAdornment>
                        }/>
                </FormControl>
                <List className={classes.searchList}>
                    <ListItem button className={classes.searchItem}>
                        <ListItemText primary="Phone ringtone"/>
                    </ListItem>
                    <Divider/>
                    <ListItem button className={classes.searchItem}>
                        <ListItemText primary="Default notification ringtone"/>
                    </ListItem>
                </List>
            </Dialog>
        );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({
    changePage: url => (replace(url)),
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(Search));
