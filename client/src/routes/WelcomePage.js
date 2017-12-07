import React from 'react';
import { connect } from 'dva';
import styles from './WelcomePage.css';
import WelcomeComponent from '../components/Welcome/Welcome';

function WelcomePage({ dispatch }) {
  return (
    <div className={styles.normal}>
      <WelcomeComponent dispatch={dispatch}/>
    </div>
  );
}

export default connect()(WelcomePage);
