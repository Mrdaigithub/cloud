import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import styles from './styles'

class CloudDrive extends Component {
    render() {
        const {classes} = this.props;
        return (
            <div>
                cloud-drive
            </div>
        )
    }
}

export default withStyles(styles)(CloudDrive)