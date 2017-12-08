import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import { LinearProgress } from 'material-ui/Progress';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { withStyles } from 'material-ui/styles';
import styles from './styles';
import logo from '../../static/logo.svg';

class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            completed: 0,
            time: 3,
        };
    }

    componentDidMount() {
        this.timer = setInterval(this.progress, 500);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    progress = () => {
        const { completed, time } = this.state;
        if (completed <= 100) {
            this.setState({ completed: completed + (100 / (time / 0.5)) });
        } else {
            this.props.changePage('/Login');
        }
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                <LinearProgress mode="determinate" value={this.state.completed}/>
                <Grid container alignItems={'center'} justify={'center'} className={classes.normal}>
                    <Grid item xs={12}>
                        <img src={logo} alt="logo"/>
                        <h1>Cloud</h1>
                        <p>A simple cloud project</p>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({
    changePage: url => push(url),
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(Welcome));
