import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import { bindActionCreators } from 'redux';
import { replace } from 'react-router-redux';
import { withStyles } from 'material-ui/styles';
import { login } from '../../store/modules/oneself';
import { alert } from '../../store/modules/assist';
import styles from './styles';
import BasicLayout from '../../layouts/BasicLayout';
import GithubIcon from '../../components/GithubIcon';
import logo from '../../static/logo.svg';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'root',
            password: 'root',
        };
    }

    handleChange = name => (event) => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleValidation = name => () => {
        let state = true;
        if (name === 'username' && this.state.username === '') {
            this.setState({ usernameErr: true });
            state = false;
        }
        if (name === 'username' && this.state.username !== '') {
            this.setState({ usernameErr: false });
        }
        if (name === 'password' && this.state.password === '') {
            this.setState({ passwordErr: true });
            state = false;
        }
        if (name === 'password' && this.state.password !== '') {
            this.setState({ passwordErr: false });
        }
        return state;
    };

    login() {
        const ustate = this.handleValidation('username')();
        const pstate = this.handleValidation('password')();
        if (!ustate || !pstate) {
            return false;
        }
        this.props.login(this.state.username, this.state.password, () => {
            this.props.alert('登录成功', 1000);
            setTimeout(() => {
                this.props.changePage('/cloud-drive');
            }, 1300);
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <BasicLayout>
                <Grid className={classes.normal} container direction={'row'} justify={'center'} alignItems={'center'}>
                    <Grid item xs={7} sm={5} md={3}>
                        <Grid container alignItems={'center'} justify={'center'}>
                            <Grid item xs={4}><img className={classes.logoImg} src={logo} alt="logo"/></Grid>
                            <Grid item xs={5} className={classes.logoTitle}>Cloud</Grid>
                            <Grid item xs={12} className={classes.logoText}>A simple cloud project</Grid>
                        </Grid>
                        <FormControl fullWidth required>
                            <InputLabel>用户名</InputLabel>
                            <Input
                                error={this.state.usernameErr} required value={this.state.username}
                                onChange={this.handleChange('username').bind(this)}
                                onBlur={this.handleValidation('username').bind(this)}/>
                            <FormHelperText error={this.state.usernameErr}>
                                {this.state.usernameErr ? 'username is require' : ''}
                            </FormHelperText>
                        </FormControl>
                        <FormControl fullWidth required>
                            <InputLabel>密码</InputLabel>
                            <Input
                                error={this.state.passwordErr}
                                value={this.state.password}
                                onChange={this.handleChange('password').bind(this)}
                                onBlur={this.handleValidation('password').bind(this)}/>
                            <FormHelperText error={this.state.passwordErr}>
                                {this.state.passwordErr ? 'password is require' : ''}
                            </FormHelperText>
                        </FormControl>
                        <Button
                            raised color="primary"
                            className={classes.loginButton}
                            onClick={this.login.bind(this)}>登录</Button>
                        <Grid container alignItems={'center'} justify={'flex-start'}>
                            <Grid item xs={2}>
                                <IconButton
                                    href={`https://github.com/login/oauth/authorize?client_id=${'fbc7ce7b78d475a3a327'}`}>
                                    <GithubIcon/>
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </BasicLayout>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => bindActionCreators({
    login,
    alert,
    changePage: url => replace(url),
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(Login));
