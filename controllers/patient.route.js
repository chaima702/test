
const express = require("express");
const router = express.Router();

const multer = require('multer');
let fileExtension = require('file-extension');

const Patient  = require("../models/Patient");
const rdvModel = require("../models/Rdv");

// File upload settings
const PATH = './uploads/patients';

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PATH);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now()+ '.' +fileExtension(file.originalname))
  }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let upload = multer({
  storage: storage, 
  fileFilter: fileFilter
});

// afficher tous les Patients
router.route("/").get((req, res) => {

  Patient.find()
    .populate("users")
    .exec((err, docs) => {
      if (!err) res.send(docs);
      else res.status(400).send(err);
    });
});

// afficher un  patient
router.route("/:id").get((req, res) => {
  Patient.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// modifier un patient
router.route("/update/:id").put(upload.single('image'), (req, res, next) => {

  if (!req.file) {
    console.log("No file is available! "+req.file);
    return res.send({
      success: false
    });

  } else {
    console.log('File is available!');

    req.body.image = req.file.filename;
  }

  Patient.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error);
        console.log(error);
      } else {
        res.json("Données mises à jour avec succès");
        console.log("Données mises à jour avec succès");
      }
    }
  );
});

// supprimer un  patient
router.route("/delete/:id").delete((req, res, next) => {
  Patient.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

module.exports = router;





