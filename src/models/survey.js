const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const surveySchema = new Schema({
    titulo: {
        type: String,
        required: true
    },

    descripcion: {
        type: String,
        required: true
    },
},
{
    timestamps: true
})