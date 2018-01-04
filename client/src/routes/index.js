import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Welcome from '../pages/Welcome';
import Login from '../pages/Login';

const Routes = props => (
    <Switch>
        <Route exact path="/" component={Welcome}/>
        <Route exact path="/welcome" component={Welcome}/>
        <Route exact path="/login" component={Login}/>
        <PrivateRoute/>
    </Switch>
);

export default Routes;
