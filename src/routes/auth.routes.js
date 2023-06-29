const express = require('express');
const authController = require('../controllers/auth.controller')
const refreshToken = require('../controllers/token.controller');
const authenticate = require('../middlewares/authenticate');
const getUser = require('../controllers/user.controller');


const router = express.Router();

//Ruta para Sign Up
router.post('/signup', authController.signUp)
//Ruta para Sign In
router.post('/signin', authController.signIn)
//Ruta para Sign Out
router.post('/signout')
//Ruta user
router.get('/user', authenticate, getUser)
//Ruta todos
router.get('/todos', authenticate)
//Ruta refresh token
router.post('/refresh-token', refreshToken)

module.exports = router;