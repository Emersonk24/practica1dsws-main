const { initializeApp, applicationDefault } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

const app = initializeApp({
  credential: applicationDefault(), // Se conecta con GOOGLE_APPLICATION_CREDENTIALS
});

const db = getFirestore(app);
module.exports = { db };
