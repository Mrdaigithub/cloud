/*
 * MIT License
 *
 * Copyright (c) 2017 Mrdai
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import React from 'react';
import { Route, Switch } from 'react-router';
import Home from '../components/Home';
import Hello from '../components/Hello';
import Counter from '../components/Counter';
import NoMatch from '../components/NoMatch';
import NavBar from '../components/NavBar';

const Routes = (
    <div>
        <NavBar/>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/hello" component={Hello}/>
            <Route path="/counter" component={Counter}/>
            <Route component={NoMatch}/>
        </Switch>
    </div>
);

export default Routes;


// import React from 'react';
// import { Route, Switch } from 'react-router-dom';
// import Welcome from '../pages/Welcome';
// import Login from '../pages/Login';
// // import PrivateRoute from './PrivateRoute';
//
// const Routes = props => (
//     <Switch>
//         <Route exact path="/" component={Welcome}/>
//         <Route exact path="/login" component={Login}/>
//     </Switch>
// );
//
// export default Routes;
