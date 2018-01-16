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
