const express = require('express');
const authController = require('../controllers/auth.controller')
const authjwt = require('../middlewares/authjwt')

const router = express.Router();

//Ruta para Sign Up
router.post('/signup', authController.signUp)
//Ruta para Sign In
router.post('/signin', authController.signIn)
//Ruta para Sign Out

module.exports = router;