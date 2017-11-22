import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import PageHeaderLayout from '../layouts/PageHeaderLayout/PageHeaderLayout'
import BasicLayout from '../layouts/BasicLayout/BasicLayout'
import Login from '../pages/login/Login'
import CloudDrive from '../pages/cloud-drive/CloudDrive'
import Oneself from '../pages/personnel/oneself/Oneself'
import Groups from '../pages/personnel/groups/Groups'
import Users from '../pages/personnel/users/Users'

const Routes = () => (
    <Router>
        <div>
            <Route path="/login" render={() => <BasicLayout><Login/></BasicLayout>}/>
            <Route path="/cloud-drive" render={() => <PageHeaderLayout><CloudDrive/></PageHeaderLayout>}/>
            <Route path="/personnel/oneself" render={() => <BasicLayout><Oneself/></BasicLayout>}/>
            <Route path="/personnel/groups" render={() => <PageHeaderLayout><Groups/></PageHeaderLayout>}/>
            <Route path="/personnel/users" render={() => <PageHeaderLayout><Users/></PageHeaderLayout>}/>
        </div>
    </Router>
);

export default Routes