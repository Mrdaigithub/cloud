import React from 'react'
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom'
import PageHeaderLayout from '../layouts/PageHeaderLayout/PageHeaderLayout'
import Login from '../pages/login/Login'
import CloudDrive from '../pages/cloud-drive/CloudDrive'
import Oneself from '../pages/users/oneself/Oneself'

const Routes = () => (
    <Router>
        <div>
            <Route path="/login" component={Login}/>
            <Route path="/cloud-drive" render={() => <PageHeaderLayout><CloudDrive/></PageHeaderLayout>}/>
            <Route path="/users/oneself" component={Oneself}/>
        </div>
    </Router>
)

export default Routes
