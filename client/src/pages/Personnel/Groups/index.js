import React, { Component } from 'react';
import { connect } from 'react-redux';
import createClass from 'create-react-class';
import Grid from 'material-ui/Grid';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import Slide from 'material-ui/transitions/Slide';
import Table, {
    TableBody,
    TableCell,
    TableFooter,
    TablePagination,
    TableRow,
} from 'material-ui/Table';
import { FormsyCheckbox, FormsyDate, FormsyRadio, FormsyRadioGroup, FormsySelect, FormsyText, FormsyTime, FormsyToggle, FormsyAutoComplete } from 'formsy-material-ui/lib';
import TextField from 'material-ui/TextField';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle,
} from 'material-ui/Dialog';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Checkbox from 'material-ui/Checkbox';
import Tooltip from 'material-ui/Tooltip';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import PersonAdd from 'material-ui-icons/PersonAdd';
import Edit from 'material-ui-icons/Edit';
import FilterListIcon from 'material-ui-icons/FilterList';
import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff';
import { bindActionCreators } from 'redux';
import { replace } from 'react-router-redux';
import { withStyles } from 'material-ui/styles';
import qs from 'qs';
import { alert } from '../../../store/modules/assist';
import styles from './styles';
import SpeedDial from '../../../components/SpeedDial';
import SpeedDialItem from '../../../components/SpeedDial/SpeedDialItem';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import EnhancedTableHead from '../../../components/EnhancedTableHead';
import requester from '../../../utils/requester';


const columnData = [
    { id: 'id', numeric: false, disablePadding: false, label: 'ID' },
    { id: 'username', numeric: false, disablePadding: false, label: '用户名' },
    { id: 'email', numeric: false, disablePadding: false, label: '邮箱号码' },
    { id: 'capacity', numeric: false, disablePadding: false, label: '容量' },
    { id: 'created_at', numeric: false, disablePadding: false, label: '创建时间' },
];

function Transition(props) {
    return <Slide direction="up" {...props}/>;
}


class Oneself extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            order: 'asc',
            orderBy: 'calories',
            selected: [],
            data: [],
            page: 0,
            rowsPerPage: 10,
            DialogOpen: false,
            showPassword: false,
            username: '',
            password: '',
            confirmPassword: '',
            email: '',
            size: 0,
        };
    }

    async componentWillMount() {
        this.setState({
            data: await requester.get('/users'),
        });
    }

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        const data =
            order === 'desc'
                ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
                : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

        this.setState({ data, order, orderBy });
    };

    handleSelectAllClick = (event, checked) => {
        if (checked) {
            this.setState({ selected: this.state.data.map(n => n.id) });
            return;
        }
        this.setState({ selected: [] });
    };

    handleClick = (event, id) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        this.setState({ selected: newSelected });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = (event) => {
        this.setState({ rowsPerPage: event.target.value });
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    handleCloseDialog() {
        this.setState({
            DialogOpen: false,
        });
    }

    handleChangePasswordVisibility() {
        this.setState({
            showPassword: !this.state.showPassword,
        });
    }

    handleChangeInput = name => (event) => {
        this.setState({
            [name]: event.target.value,
        });
    };

    async handleDeleteUser() {
        const deleteList = this.state.selected.map(id => requester.delete(`users/${id}`));
        await Promise.all(deleteList);
        this.setState(() => {
            return {
                data: this.state.data.filter(({ id }, index) => {
                    return this.isSelected(id) ? false : this.state.data[index];
                }),
                selected: [],
            };
        });
    }

    async handleAddUser() {
        const { username, password, confirmPassword, email, size } = this.state;
        requester.post('/users', qs.stringify({
            username,
            password,
            confirmPassword,
            email,
            size,
        }));
        this.handleCloseDialog();
    }

    render() {
        const { classes } = this.props;
        const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - (page * rowsPerPage));

        return (
            <PageHeaderLayout>
                <Grid
                    container
                    direction={'row'}
                    justify={'center'}
                    alignItems={'flex-start'}
                    spacing={8}>
                    <Grid item xs={11} className={classes.normal}>
                        <Paper className={classes.root}>
                            <Toolbar
                                className={classNames(classes.root, {
                                    [classes.highlight]: selected.length > 0,
                                })}>
                                <div className={classes.title}>
                                    {selected.length > 0 ? (
                                        <Typography type="subheading">{selected.length} selected</Typography>
                                    ) : (
                                        <Typography type="title">人员管理</Typography>
                                    )}
                                </div>
                                <div className={classes.spacer}/>
                                <div className={classes.actions}>
                                    {selected.length > 0 ? (
                                        <Tooltip title="删除">
                                            <IconButton aria-label="Delete" onClick={this.handleDeleteUser.bind(this)}>
                                                <DeleteIcon/>
                                            </IconButton>
                                        </Tooltip>
                                    ) : (
                                        <Tooltip title="Filter list">
                                            <IconButton aria-label="Filter list">
                                                <FilterListIcon/>
                                            </IconButton>
                                        </Tooltip>
                                    )}
                                </div>
                            </Toolbar>
                            <div className={classes.tableWrapper}>
                                <Table className={classes.table}>
                                    <EnhancedTableHead
                                        columnData={columnData}
                                        numSelected={selected.length}
                                        order={order}
                                        orderBy={orderBy}
                                        onSelectAllClick={this.handleSelectAllClick}
                                        onRequestSort={this.handleRequestSort}
                                        rowCount={data.length}/>
                                    <TableBody>
                                        {data.slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage).map((n) => {
                                            const isSelected = this.isSelected(n.id);
                                            return (
                                                <TableRow
                                                    hover
                                                    onClick={event => this.handleClick(event, n.id)}
                                                    role="checkbox"
                                                    aria-checked={isSelected}
                                                    tabIndex={-1}
                                                    key={n.id}
                                                    selected={isSelected}>
                                                    <TableCell padding="checkbox">
                                                        <Checkbox checked={isSelected}/>
                                                    </TableCell>
                                                    <TableCell>{n.id}</TableCell>
                                                    <TableCell>{n.username}</TableCell>
                                                    <TableCell>{n.email}</TableCell>
                                                    <TableCell>{n.capacity}</TableCell>
                                                    <TableCell>{n.created_at}</TableCell>
                                                </TableRow>
                                            );
                                        })}
                                        {emptyRows > 0 && (
                                            <TableRow style={{ height: 49 * emptyRows }}>
                                                <TableCell colSpan={6}/>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                    <TableFooter>
                                        <TableRow>
                                            <TablePagination
                                                count={data.length}
                                                rowsPerPage={rowsPerPage}
                                                page={page}
                                                onChangePage={this.handleChangePage}
                                                onChangeRowsPerPage={this.handleChangeRowsPerPage}/>
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
                <SpeedDial>
                    <SpeedDialItem>
                        <label htmlFor="icon-button-file">
                            <IconButton
                                color="primary"
                                className={classes.SpeedDialItemButton}
                                component="span"
                                onClick={() => this.setState({ DialogOpen: true })}>
                                <PersonAdd/>
                            </IconButton>
                        </label>
                    </SpeedDialItem>
                    <SpeedDialItem>
                        <label htmlFor="icon-button-file">
                            <IconButton
                                color="primary"
                                className={classes.SpeedDialItemButton}
                                component="span">
                                <Edit/>
                            </IconButton>
                        </label>
                    </SpeedDialItem>
                </SpeedDial>
                <Dialog
                    open={this.state.DialogOpen}
                    onClose={this.handleClose}
                    transition={Transition}
                    aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">创建用户</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="username"
                            value={this.state.username}
                            onChange={this.handleChangeInput('username')}
                            label="用户名"
                            type="text"
                            fullWidth/>
                        <FormControl className={classes.formControl} fullWidth>
                            <InputLabel htmlFor="password">密码</InputLabel>
                            <Input
                                id="password"
                                type={this.state.showPassword ? 'text' : 'password'}
                                value={this.state.password}
                                onChange={this.handleChangeInput('password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={this.handleChangePasswordVisibility.bind(this)}>
                                            {this.state.showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                }/>
                        </FormControl>
                        {/*<FormsyText*/}
                        {/*name="name"*/}
                        {/*validations="isWords"*/}
                        {/*validationError={'error'}*/}
                        {/*required*/}
                        {/*hintText="What is your name?"*/}
                        {/*floatingLabelText="Name"/>*/}
                        <FormControl className={classes.formControl} fullWidth>
                            <InputLabel htmlFor="confirmPassword">确认密码</InputLabel>
                            <Input
                                id="confirmPassword"
                                type={this.state.showPassword ? 'text' : 'password'}
                                value={this.state.confirmPassword}
                                onChange={this.handleChangeInput('confirmPassword')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={this.handleChangePasswordVisibility.bind(this)}>
                                            {this.state.showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                }/>
                        </FormControl>
                        <TextField
                            margin="dense"
                            id="email"
                            label="邮箱"
                            type="text"
                            value={this.state.email}
                            onChange={this.handleChangeInput('email')}
                            fullWidth/>
                        <FormControl
                            fullWidth>
                            <InputLabel htmlFor="size">容量</InputLabel>
                            <Input
                                id="size"
                                type="number"
                                value={this.state.size}
                                onChange={this.handleChangeInput('size')}
                                endAdornment={<InputAdornment position="end">bit</InputAdornment>}/>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseDialog.bind(this)} color="primary">关闭</Button>
                        <Button onClick={this.handleAddUser.bind(this)} color="primary">提交</Button>
                    </DialogActions>
                </Dialog>
            </PageHeaderLayout>
        );
    }
}

Oneself.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({
    alert,
    changePage: url => replace(url),
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(createClass(withStyles(styles)(Oneself)));
