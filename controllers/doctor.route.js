const express = require("express");
const doctorRouter = express.Router();

let Doctor = require("../models/Doctor");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//ajouter un docteur
doctorRouter.route("/create").post(function (req, res) {
  let docteur = new Doctor(req.body);
  docteur
    .save()
    .then((docs) => {
      res.status(200).json({ docteur: "nouveau docteur" });
    })
    .catch((err) => {
      res.status(400).send("Something Went Wrong");
    });
});

//afficher tous les docteurs
doctorRouter.route("/").get((req, res) => {
  Doctor.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

//afficher un docteur
doctorRouter.route("/read/:id").get((req, res) => {
  Doctor.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});


//modifier un docteur
doctorRouter.route("/update/:id").put(async (req, res, next) => {


  Doctor.findByIdAndUpdate(
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

//supprimer un docteur
doctorRouter.route("/delete/:id").delete((req, res, next) => {
  Doctor.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

module.exports = doctorRouter;
