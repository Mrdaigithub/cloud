import React from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import styles from './styles';


const SpeedDialItem = props => (
    <li>
        <Button fab mini>
            {props.children}
        </Button>
    </li>
);


export default withStyles(styles)(SpeedDialItem);
