import React from 'react';
import { Route } from 'react-router-dom';
import Welcome from '../pages/Welcome';
import Login from '../pages/Login';
import CloudDrive from '../pages/CloudDrive';
import Oneself from '../pages/Personnel/Oneself';
import Groups from '../pages/Personnel/Groups';

const Routes = props => (
    <div>
        <Route exact path="/" component={Welcome}/>
        <Route exact path="/welcome" component={Welcome}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/cloud-drive" component={CloudDrive}/>
        <Route exact path="/personnel/oneself" component={Oneself}/>
        <Route exact path="/personnel/groups" component={Groups}/>
        <Route component={NoMatch}/>
    </div>
);

const NoMatch = ({ location }) => (
    <div>
        <h3>No match for <code>{location.pathname}</code></h3>
    </div>
);

export default Routes;
