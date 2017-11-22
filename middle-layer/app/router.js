'use strict';

module.exports = app => {
  app.get('/', app.controller.home.index);
  app.post('/api/login', app.controller.login.index);
};
