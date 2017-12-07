import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';
import IndexPage from './routes/IndexPage';

function RouterConfig({ history, app }) {
  const Welcomes = dynamic({
    app,
    component: () => import('./routes/Welcome/Welcome'),
  });

  const Login = dynamic({
    app,
    models: () => [
      import('./models/oneself'),
    ],
    component: () => import('./routes/Login/Login'),
  });
  const CloudDrive = dynamic({
    app,
    models: () => [
      import('./models/oneself'),
    ],
    component: () => import('./routes/CloudDrive/CloudDrive'),
  });

  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage}/>
        <Route path="/Welcome" component={Welcomes}/>
        <Route path="/login" component={Login}/>
        <Route path="/cloud-drive" component={CloudDrive}/>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
