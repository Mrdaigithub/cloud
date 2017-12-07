import React, { Component } from 'react';
import styles from './BasicLayout.css';

class BasicLayout extends Component {
  render() {
    const { children } = this.props;
    return (
      <div>
        {children}
        <footer className={styles['global-footer']}>
          <div>
            <a className={styles.links} href="https://github.com/Mrdaigithub/cloud">
              Github
            </a>
            <a className={styles.links} href="https://github.com/Mrdaigithub/cloud/blob/master/README.md">
              Doc
            </a>
            <a className={styles.links} href="https://github.com/Mrdaigithub/cloud/blob/master/LICENSE">
              LICENSE
            </a>
          </div>
          <p className={styles.copyright}>Copyright (c) 2017 Mrdai</p>
        </footer>
      </div>
    );
  }
}

export default BasicLayout;
