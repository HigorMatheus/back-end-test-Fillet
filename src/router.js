const express = require('express');
const UserController = require('./controller/userController');


const routes = express.Router()

routes.post('/user',UserController.create)

module.exports = routes;

