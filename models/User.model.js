const mongoose = require("mongoose");
const mongooseUniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
  },
  tel: {
    type: Number,
    unique: true,
  },
  gender: {
    type: String,
  },
  adress: {
    type: String,
  },
  datenais: { 
    type: Date 
  },
  image: {type: String},
  email: {
    type: String,
    unique: true,
  },
  password: String,
  
  role: {
    type: String,
    default: "ROLE_PATIENT",
    enum:["ROLE_PATIENT","ROLE_ADMIN","ROLE_SECRETAIRE","ROLE_DOCTOR"]
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
userSchema.plugin(mongooseUniqueValidator);
module.exports = mongoose.model("User", userSchema);




