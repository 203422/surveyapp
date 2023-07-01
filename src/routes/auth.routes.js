const express = require('express');
const authController = require('../controllers/auth.controller')
const refreshToken = require('../controllers/token.controller');
const authenticate = require('../middlewares/authenticate');
const getUser = require('../controllers/user.controller');
const surveys = require('../controllers/survey.controller');


const router = express.Router();

//Ruta para Sign Up
router.post('/signup', authController.signUp)
//Ruta para Sign In
router.post('/signin', authController.signIn)
//Ruta para Sign Out
router.delete('/signout', authController.signOut)
//Ruta user
router.get('/user', authenticate, getUser)
//Ruta para obtener encuestas
router.get('/surveys', authenticate, surveys.getSurveys)
//Ruta para crear encuesta
router.post('/surveys', authenticate, surveys.createSurveys)
//Ruta refresh token
router.post('/refresh-token', refreshToken)


module.exports = router;