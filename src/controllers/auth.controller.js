const userSchema = require('../models/user');
const jwt = require('jsonwebtoken');

const signUp = async (req, res) => {

    const { name, email, password } = req.body;

    const newUser = new userSchema ( {
        name,
        email,
        password: await userSchema.encryptPassword(password)
    })

    const savedUser = await newUser.save();

    const token = jwt.sign({id: savedUser._id}, 'survey-blue-app', {
        expiresIn: 86400 //24 horas
    })

    res.status(200).json({token})
}

const signIn = async (req, res) => {
    const { email, password } = req.body;
    
    const userFound = await userSchema.findOne({email})
    if (!userFound) return res.status(400).json({message: 'Usuario no encontrado'})

    const matchPassword = await userSchema.comparePassword(password, userFound.password)

    if (!matchPassword) return res.status(401).json({token: null, message: 'Contraseña incorrecta'})

    const token = jwt.sign({id: userFound._id}, 'survey-blue-app', {
        expiresIn: 86400 //24 horas
    })

    console.log(userFound)
    res.json({token})
}

module.exports = { signUp, signIn }