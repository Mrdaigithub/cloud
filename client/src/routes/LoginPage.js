import React from 'react';
import { connect } from 'dva';
import styles from './LoginPage.css';
import LoginComponent from '../components/Login/Login';

function Login({ dispatch }) {
  return (
    <div className={styles.normal}>
      <LoginComponent dispatch={dispatch}/>
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Login);
