
const mongoose = require("mongoose");
//const { createdAt } = require("./preSave");
const Schema = mongoose.Schema;

const rdvModel = mongoose.Schema({
  appointDate: {
    type: Date,
  },
  appointTime: {
    type: String,
  },
  status: {
    type: Boolean,
    default: false,
  },
  patients: 
    {
      type: Schema.Types.ObjectId,
      ref: "Patient",
    }
});

//createdAt(rdvModel);
module.exports = mongoose.model("rdvModel", rdvModel);


