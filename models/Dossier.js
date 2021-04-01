const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Dossier = new Schema({ 
    
    file: String,
    patients: 
    {
      type: Schema.Types.ObjectId,
      ref: "Patient",
    }
  });

  
  module.exports = mongoose.model("Dossier", Dossier);