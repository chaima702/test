const express = require("express");
const drugsRouter = express.Router();

Drugs = require("../models/Drugs");


//ajouter un médicament
drugsRouter.route("/create").post((req, res, next) => {
  Drugs.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

//afficher tous les médicaments
drugsRouter.route("/").get((req, res) => {
  Drugs.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

//afficher un médicament
drugsRouter.route("/read/:id").get((req, res) => {
  Drugs.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

//modifier un médicament
drugsRouter.route("/update/:id").put((req, res, next) => {
  Drugs.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error);
        console.log(error);
      } else {
        res.json(data);
        console.log("Data updated successfully");
      }
    }
  );
});

//supprimer un médicament
drugsRouter.route("/delete/:id").delete((req, res, next) => {
  Drugs.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

module.exports = drugsRouter;
