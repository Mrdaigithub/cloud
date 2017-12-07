import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import GithubIcon from '../GithubIcon';
import logo from '../../assets/logo.svg';
import styles from './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'root',
      password: 'user1',
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
    // let that = this;
    let ustate = this.handleValidation('username')();
    let pstate = this.handleValidation('password')();
    if (!ustate || !pstate) {
      return false;
    }
    this.props.dispatch({
      type: 'oneself/login',
      payload: {
        username: this.state.username,
        password: this.state.password,
      },
    });
  }

  render() {
    return (
      <Grid className={styles.normal} container direction={'row'} justify={'center'} alignItems={'center'}>
        <Grid item xs={7} sm={5} md={3}>
          <Grid container alignItems={'center'} justify={'center'}>
            <Grid item xs={4}><img className={styles['logo-img']} src={logo} alt="logo"/></Grid>
            <Grid item xs={5} className={styles['logo-title']}>Cloud</Grid>
            <Grid item xs={12} className={styles['logo-text']}>A simple cloud project</Grid>
          </Grid>
          <FormControl fullWidth required>
            <InputLabel>Username</InputLabel>
            <Input error={this.state.usernameErr} required value={this.state.username}
                   onChange={this.handleChange('username').bind(this)}
                   onBlur={this.handleValidation('username').bind(this)}/>
            <FormHelperText error={this.state.usernameErr}>
              {this.state.usernameErr ? 'username is require' : ''}
            </FormHelperText>
          </FormControl>
          <FormControl fullWidth required>
            <InputLabel>Password</InputLabel>
            <Input
              error={this.state.passwordErr}
              value={this.state.password}
              onChange={this.handleChange('password').bind(this)}
              onBlur={this.handleValidation('password').bind(this)}/>
            <FormHelperText error={this.state.passwordErr}>
              {this.state.passwordErr ? 'password is require' : ''}
            </FormHelperText>
          </FormControl>
          <Button raised color="primary" className={styles['login-button']}
                  onClick={this.login.bind(this)}>login</Button>
          <Grid container alignItems={'center'} justify={'flex-start'}>
            <Grid item xs={2}>
              <IconButton href={`https://github.com/login/oauth/authorize?client_id=${'fbc7ce7b78d475a3a327'}`}>
                <GithubIcon/>
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default Login;
