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
import { Route, Redirect, Switch } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PageHeaderLayout from '../layouts/PageHeaderLayout';
import Trash from '../pages/Trash';
import Search from '../pages/Search';
import CloudDrive from '../pages/CloudDrive';
import Groups from '../pages/Personnel/Groups';
import NotFound from '../pages/NotFound';

const PrivateRoute = () => (
    <Route
        render={({ location }) => (
            <PageHeaderLayout>
                {
                    (sessionStorage.accessToken && sessionStorage.refreshToken) ?
                        (
                            <div>
                                <TransitionGroup>
                                    <CSSTransition
                                        classNames="fade"
                                        timeout={300}
                                        key={location.key}>
                                        <Switch location={location}>
                                            <Route exact path="/search" component={Search}/>
                                            <Route
                                                location={location}
                                                key={location.key}
                                                path="/cloud-drive/0"
                                                component={CloudDrive}/>
                                            <Route exact path="/trash" component={Trash}/>
                                            <Route exact path="/personnel/groups" component={Groups}/>
                                            <Route component={NotFound}/>
                                        </Switch>
                                    </CSSTransition>
                                </TransitionGroup>
                            </div>
                        ) :
                        (<Redirect to="/login"/>)
                }
            </PageHeaderLayout>
        )}/>
);

export default PrivateRoute;
