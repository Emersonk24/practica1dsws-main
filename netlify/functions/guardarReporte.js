const { db } = require("../../firebaseConfig");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Método no permitido" };
  }

  try {
    const data = JSON.parse(event.body);
    const docRef = await db.collection("reportes").add(data);
    return {
      statusCode: 200,
      body: JSON.stringify({ id: docRef.id, message: "Reporte guardado correctamente" }),
    };
  } catch (error) {
    return { statusCode: 500, body: `Error: ${error.message}` };
  }
};
