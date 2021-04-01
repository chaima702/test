const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
mongoose.set('useFindAndModify', false);
mongoose.connect(
  "mongodb://localhost:27018/health", 
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => console.log(" Serveur mongodb est  connecté  ...")
);
