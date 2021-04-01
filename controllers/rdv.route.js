
const express = require("express");
const router = express.Router();

const rdvModel = require("../models/Rdv");
const Patient = require("../models/Patient");

// afficher tous les RDV
router.route("/").get((req, res) => {

  rdvModel.find()
    .populate("patients")
    .exec((err, docs) => {
      if (!err) res.send(docs);
      else res.status(400).send(err);
    });
});

//afficher un RDV
router.route("/:id").get((req, res) => {
  rdvPatient.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});


//modifier un RDV
router.route("/update/:id").put((req, res, next) => {
  rdvPatient.findByIdAndUpdate(
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
//supprimer un RDV
router.route("/delete/:id").delete((req, res, next) => {
  rdvModel.findOneAndRemove(req.params.id, (error, doc) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: doc,
      });
    }
  });
});
//reserver un RDV
router.post("/reserve/:id", async (req, res, next) => {

  const reserve = req.body;

  let date_ob = new Date()

  let date = await rdvModel.findOne({ appointTime: reserve.appointTime   });
    if (date) return res.status(400).send({ error: "Date est déjà reserver" });

  const appoint = new rdvModel({
      appointDate: reserve.appointDate,
      appointTime: reserve.appointTime,
      patients: req.params.id,
    });
    
    appoint.isNew = true;
    appoint.save((err) => { if(err) res.status(400).json({}) });
    return res.status(201).json({ message: "RDV bien enregistré" });
 
});

module.exports = router;

