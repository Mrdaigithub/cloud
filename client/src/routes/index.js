import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Welcome from '../pages/Welcome';
import Login from '../pages/Login';
import CloudDrive from '../pages/CloudDrive';
import Oneself from '../pages/Personnel/Oneself';
import Groups from '../pages/Personnel/Groups';
import NotFound from '../pages/NotFound';

const Routes = props => (
    <Switch>
        <Route exact path="/" component={Welcome}/>
        <Route exact path="/welcome" component={Welcome}/>
        <Route exact path="/login" component={Login}/>
        <Route path="/cloud-drive/0" component={CloudDrive}/>
        <Redirect exact from="/cloud-drive" to="/cloud-drive/0"/>
        <Route exact path="/personnel/oneself" component={Oneself}/>
        <Route exact path="/personnel/groups" component={Groups}/>
        <Route component={NotFound}/>
    </Switch>
);

export default Routes;
