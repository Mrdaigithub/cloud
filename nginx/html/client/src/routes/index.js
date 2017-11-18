import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    // Link
} from 'react-router-dom'
import Login from '../pages/login/Login'
import CloudDrive from '../pages/cloud-drive/CloudDrive'

const Routes = () => (
    <Router>
        <div>
            <Route path="/login" component={Login}/>
            <Route path="/cloud-drive" component={CloudDrive}/>
        </div>
    </Router>
)

export default Routes
