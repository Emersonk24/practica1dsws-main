const { db } = require("../../firebaseConfig");

exports.handler = async () => {
  try {
    const snapshot = await db.collection("reportes").get();
    const reportes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return {
      statusCode: 200,
      body: JSON.stringify(reportes),
    };
  } catch (error) {
    return { statusCode: 500, body: `Error: ${error.message}` };
  }
};
