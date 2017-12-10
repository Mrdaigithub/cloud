import React from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import styles from './styles';


const SpeedDialItem = props => (
    <Button fab mini>
        {props.children}
    </Button>
);


export default withStyles(styles)(SpeedDialItem);
