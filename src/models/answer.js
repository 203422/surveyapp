const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const answerSchema = new Schema({
    tipo: {
        type: String, 
        enum: ['opcion_multiple', 'opcion_unica', 'respuesta_abierta']
    }
})