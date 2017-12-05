import React from 'react'
import {Route, Redirect} from 'react-router-dom'

import Home from '../pages/home'
import About from '../pages/about'
import Welcome from '../pages/welcome'

export default () => (
    <div>
        <Route exact path="/" component={Home}/>
        <Route exact path="/about-us" component={About}/>
        <Route exact path="/welcome" component={Welcome}/>
    </div>
);
