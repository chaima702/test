
const express = require("express");
const uploadFile = require("../middelware/upload");
const router = express.Router();
let Dossier = require("../models/Dossier");
const Patient  = require("../models/Patient");

const multer = require('multer');
let fileExtension = require('file-extension');



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



const file = (req, file) => {
    return new Promise((resolve, reject) => {
        if (file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            resolve({
                bucketName: 'words',
                filename: `${file.originalname}`
            })
        } else {
            reject(Error("File type has been rejected"));
        }
    });    
}

let upload = multer({
  storage: storage, 
  //fileFilter: fileFilter
  file: file
});


  // ajouet un dossier
  router.route("/update/:id").put(upload.single('file'), (req, res, next) => {

    if (!req.file) {
      console.log("No file is available! "+req.file);
      return res.send({
        success: false
      });
  
    } else {
      console.log('File is available!');
  
      req.body.file = req.file.filename;
    }
  
    Dossier.findByIdAndUpdate(
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

  //supprimer un dossier
  router.route("/delete/:id").delete((req, res, next) => {
    Dossier.findOneAndRemove(req.params.id, (error, data) => {
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