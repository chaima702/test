const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let Secreataire = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    sex: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    birthDate: {
      type: Date,
    },

    mobilePhone: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    
    users: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },



  {
    collection: "secretaires",
  }
);

module.exports = mongoose.model("Secreataire", Secreataire);
