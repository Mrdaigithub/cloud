import React from 'react'
import {push} from 'react-router-redux'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
    increment,
    incrementAsync
} from '../../store/modules/counter'
import {toggleLoading} from "../../store/modules/loading"
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

const Home = props => (
    <div>
        <h1>Home</h1>
        <p>Count: {props.count}</p>
        <TextField label="Uncontrolled"/>

        <p>
            <Button raised color="primary" onClick={props.toggleLoading}>toggle loading</Button>
            <Button raised color="primary" onClick={props.increment} disabled={props.isIncrementing}>Increment</Button>
            <button onClick={props.incrementAsync} disabled={props.isIncrementing}>Increment Async</button>
        </p>

        <p>
            <button onClick={() => props.changePage('/about-us')}>Go to about page via redux</button>
            <button onClick={() => props.changePage('/welcome')}>Go to welcome page via redux</button>
        </p>
    </div>
);

const mapStateToProps = state => ({
    count: state.counter.count,
    loading: state.counter.loading,
    isIncrementing: state.counter.isIncrementing
});

const mapDispatchToProps = dispatch => bindActionCreators({
    increment,
    incrementAsync,
    toggleLoading,
    changePage: (url) => push(url)
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)