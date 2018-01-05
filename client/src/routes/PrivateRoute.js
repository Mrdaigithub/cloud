import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import CloudDrive from '../pages/CloudDrive';
import Groups from '../pages/Personnel/Groups';
import NotFound from '../pages/NotFound';

const PrivateRoute = () => (
    <div>
        {
            (sessionStorage.accessToken && sessionStorage.refreshToken) ?
                (<Switch>
                    <Route path="/cloud-drive/0" component={CloudDrive}/>
                    <Route exact path="/personnel/groups" component={Groups}/>
                    <Route component={NotFound}/>
                </Switch>) :
                (<Redirect to="/login"/>)
        }
    </div>
);

export default PrivateRoute;
