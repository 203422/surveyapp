const User = require('../models/user');
const jsonResponse = require('../libs/jsonResponse')

const jwt = require('jsonwebtoken');

const signUp = async (req, res) => {

    const { name, email, password } = req.body;

    if (!!!name || !!!email || !!!password) {
        return res.status(400).json(jsonResponse(400, {
            error: "Los campos son requeridos"
        }))
    }

    // Crear usuario
    try {
        const user = new User();
        const exists = await user.userExist(email);

        if (exists) {
            return res.status(400).json(jsonResponse(400,
                { error: "El usuario ya existe" }))
        }

        const newUser = new User({ name, email, password: await User.encryptPassword(password) })

        newUser.save();
        res.status(200).json(jsonResponse(200, {
            message: "Usuario creado exitosamente"
        }))

    } catch (error) {
        res.status(500).json(jsonResponse(400, {
            error: "Error al crear el usuario"
        }))
    }



    // const token = jwt.sign({id: savedUser._id}, 'survey-blue-app', {
    //     expiresIn: 86400 //24 horas
    // })

    // res.status(200).json({token})
}

const signIn = async (req, res) => {
    const { email, password } = req.body;

    if (!!!email || !!!password) {
        return res.status(400).json(jsonResponse(400, {
            error: "Los campos son requeridos"
        }))
    }

    const user = await User.findOne({ email })

    if (user) {
        const correctPassword = await User.comparePassword(password, user.password)

        if (correctPassword) {
            //Autenticar usuario
            const accesToken = user.createAccesToken();
            const refreshToken = user.refreshToken();

            res.status(200).json(jsonResponse(200, {
                user, accesToken, refreshToken
            }))
        } else {
            res.status(400).json(jsonResponse(400, {
                error: "Usuario o contraseña incorrecto"
            }))
        }

    } else {
        res.status(400).json(jsonResponse(400, {
            error: "Usuario no encontrado"
        }))
    }


    // const userFound = await userSchema.findOne({email})
    // if (!userFound) return res.status(400).json({message: 'Usuario no encontrado'})

    // if (!matchPassword) return res.status(401).json({token: null, message: 'Contraseña incorrecta'})

    // const token = jwt.sign({id: userFound._id}, 'survey-blue-app', {
    //     expiresIn: 86400 //24 horas
    // })

    // console.log(userFound)
    // res.json({token})
}

module.exports = { signUp, signIn }