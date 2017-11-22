'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  constructor(){
    this.username = 'root'
    this.password = 'root'
  }
  async index() {
    this.ctx.body = 'login';
  }
}

module.exports = LoginController;
