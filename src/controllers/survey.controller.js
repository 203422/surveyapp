const jsonResponse = require("../libs/jsonResponse");
const Survey = require('../models/survey')

const getSurveys = (req, res) => {
    
}

const createSurveys = async (req, res) => {

    const { title, description } = req.body;

    if (!!!title || !!!description) {
        res.status(400).json(jsonResponse(400, {
            error: "Los campos son requeridos"
        }));
    }
    // Crear encuesta
    try {

        const survey = Survey({ title, description, idUser: req.user.id });
        const newSurvey = await survey.save();
        res.status(200).json(jsonResponse(200, {
            message: "Encuesta creada exitosamente",
            newSurvey
        }))

    } catch (error) {
        res.status(500).json(jsonResponse(500, {
            error: "Error al crear la encuesta", 
            error
        }))
        console.log(error)
    }

}

module.exports = { getSurveys, createSurveys }; 