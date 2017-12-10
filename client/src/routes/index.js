import React from 'react';
import { Route } from 'react-router-dom';
import Welcome from '../pages/Welcome';
import Login from '../pages/Login';
import CloudDrive from '../pages/CloudDrive';

const Routes = props => (
    <div>
        <Route exact path="/" component={Welcome}/>
        <Route exact path="/welcome" component={Welcome}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/cloud-drive" component={CloudDrive}/>
    </div>
);

export default Routes;
