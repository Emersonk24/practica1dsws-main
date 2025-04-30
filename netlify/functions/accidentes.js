// netlify/functions/accidentes.js
const { guardarReporte } = require("../../backend/controllers/accidentesController");

exports.handler = async function (event, context) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Método no permitido" })
    };
  }

  const data = JSON.parse(event.body);
  const req = { body: data };
  const res = {
    json: (body) => ({
      statusCode: 200,
      body: JSON.stringify(body)
    })
  };

  return guardarReporte(req, res);
};
