import React from 'react';
import { Route } from 'react-router-dom';
import Welcome from '../pages/Welcome';
import Login from '../pages/Login';
import CloudDrive from '../pages/CloudDrive';
import Oneself from '../pages/Personnel/Oneself';

const Routes = props => (
    <div>
        <Route exact path="/" component={Welcome}/>
        <Route exact path="/welcome" component={Welcome}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/cloud-drive" component={CloudDrive}/>
        <Route exact path="/personnel/oneself" component={Oneself}/>
    </div>
);

export default Routes;
