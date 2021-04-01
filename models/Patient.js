//const { createdAt } = require("./preSave");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Patient = new Schema({
  
  numCnam: { type: Number , unique : true },
  profession: { type: String },
  image: String,
  users: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});
//createdAt(Patient);

module.exports = mongoose.model("Patient", Patient);


