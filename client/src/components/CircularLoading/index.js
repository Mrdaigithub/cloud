import React from 'react';
import Grid from 'material-ui/Grid';
import { CircularProgress } from 'material-ui/Progress';
import { withStyles } from 'material-ui/styles';
import styles from './styles';

const hideStyles = {
    zIndex: '-999',
    opacity: 0,
};
const showStyles = {
    zIndex: '999',
    opacity: 1,
};

const CircularLoading = props => (
    <Grid
        container justify={'center'}
        alignItems={'center'}
        className={props.classes.normal}
        style={props.show ? showStyles : hideStyles}>
        <Grid item xs={1} sm={1}>
            <CircularProgress/>
        </Grid>
    </Grid>
);

export default withStyles(styles)(CircularLoading);
