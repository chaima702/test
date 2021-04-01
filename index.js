const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const router = express.Router();
require("./db");

const userController = require("./controllers/users.route");
const patientController = require("./controllers/patient.route");
const secretaryController = require("./controllers/secretaire.route");
const rdvController = require("./controllers/rdv.route");
const doctorController = require("./controllers/doctor.route");
const drugsController = require ("./controllers/drugs.route");
const dossierController = require ("./controllers/dossier.route");

app.use(bodyParser.json());
app.use(cors());

app.use("/users", userController);
app.use("/secretary", secretaryController);
app.use("/patients", patientController);
app.use("/appointments", rdvController);
app.use("/doctors", doctorController);
app.use("/drugs", drugsController);
app.use("/dossier",dossierController);


app.use(express.static('uploads/patients'));

let port = process.env.NODE_ENV || 3000;
app.listen(port, () => {
  console.log("Serveur est connecté sur le port 3000 ...");
}); 
