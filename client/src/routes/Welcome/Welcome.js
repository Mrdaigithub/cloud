import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import Grid from 'material-ui/Grid';
import { LinearProgress } from 'material-ui/Progress';
import styles from './Welcome.css';
import logo from '../../assets/logo.svg';

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
      this.props.dispatch(routerRedux.push({
        pathname: '/login',
      }));
    }
  };

  render() {
    return (
      <div>
        <LinearProgress mode="determinate" value={this.state.completed}/>
        <Grid container alignItems={'center'} justify={'center'} className={styles.normal}>
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

export default connect()(Welcome);
