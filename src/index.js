const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const port = process.env.PORT || 4000;
const app = express();

const authRoutes = require('./routes/auth.routes')

app.listen(port, () => console.log('Servidor ejecutandose en el puerto ', port))

mongoose.connect('mongodb://localhost/surveydb',{useNewUrlParser: true,  useUnifiedTopology: true })
    .then(db => console.log('Conectado a la base de datos'))
    .catch(error => console.log(error))

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes)
