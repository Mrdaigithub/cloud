import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import styles from './style';

class BasicLayout extends Component {
    render() {
        const { children, classes } = this.props;
        return (
            <div>
                {children}
                <footer className={classes['global-footer']}>
                    <div>
                        <a className={classes.links} href="https://github.com/Mrdaigithub/cloud">
                            Github
                        </a>
                        <a className={classes.links} href="https://github.com/Mrdaigithub/cloud/blob/master/README.md">
                            Doc
                        </a>
                        <a className={classes.links} href="https://github.com/Mrdaigithub/cloud/blob/master/LICENSE">
                            LICENSE
                        </a>
                    </div>
                    <p className={classes.copyright}>Copyright (c) 2017 Mrdai</p>
                </footer>
            </div>
        );
    }
}

export default withStyles(styles)(BasicLayout);
