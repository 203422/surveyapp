const express = require('express');
const mongoose = require('mongoose')

const authRoutes = require('./routes/auth.routes')

const app = express();
const port = 4000;

app.listen(port, () => console.log('Servidor ejecutandose en el puerto ', port))

mongoose.connect('mongodb://localhost/surveydb',{useNewUrlParser: true,  useUnifiedTopology: true })
    .then(db => console.log('Conectado a la base de datos'))
    .catch(error => console.log(error))

app.use(express.json());
app.use('/auth', authRoutes)
