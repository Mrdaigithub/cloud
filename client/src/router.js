import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';
import IndexPage from './routes/IndexPage';

function RouterConfig({ history, app }) {
  const Welcome = dynamic({
    app,
    component: () => import('./routes/WelcomePage'),
  });

  const Login = dynamic({
    app,
    models: () => [
      import('./models/oneself'),
    ],
    component: () => import('./routes/LoginPage'),
  });

  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage}/>
        <Route path="/Welcome" component={Welcome}/>
        <Route path="/login" component={Login}/>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
