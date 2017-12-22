import React, { Component } from 'react';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import { withStyles } from 'material-ui/styles';
import styles from './styles';

class SpeedDial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
        this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle() {
        this.setState({
            open: !this.state.open,
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <div
                className={classes.cover}>
                <div className={this.state.open ? classes.opened : classes.closed}>
                    <div className={classes.action}>
                        {this.props.children}
                    </div>
                    <Button
                        fab
                        color="primary"
                        onClick={this.handleToggle.bind(this)}
                        className={classes.floatButton}
                        aria-label="add">
                        <AddIcon/>
                    </Button>
                </div>
            </div>
        );
    }
}


export default withStyles(styles)(SpeedDial);
export { default as SpeedDialItem } from './SpeedDialItem';
