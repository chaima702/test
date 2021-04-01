const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const DoctorSchema = new mongoose.Schema(
  {
    
    specialty: {
      type: String,
    },
    country: {
      type: String,
    },
    city: {
      type: String,
    },
    delegation: {
      type: String,
    },
    status: {
      type: Boolean,
      default: 0,
    },
    users: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },

  {
    collection: "doctors",
  }
);
module.exports = mongoose.model("Doctor", DoctorSchema);
