const express = require("express");

const mongoose = require("mongoose");

const router = express.Router();

const Patient = mongoose.model("Patient");

const Doctor = mongoose.model("Doctor");

const Diagnose = mongoose.model("Diagnose");

router.post("/addpatient", (req, res) => {
  const { patientId, fullName, oib, gender, email, contact } = req.body;
  if ((!patientId, !fullName, !oib, !gender, !email, !contact)) {
    return res.status(422).json({ error: "Molim Vas ispunite sve podatke" });
  }
  const patientInfo = new Patient({
    patientId,
    fullName,
    oib,
    gender,
    email,
    contact,
    time: new Date(),
  });

  patientInfo
    .save()
    .then((result) => {
      res.json({ result });
    })
    .catch((error) => console.log(error));
});

module.exports = router;

router.post("/loginDoctor", (req, res) => {
  const { doctorId, password } = req.body;
  if ((!doctorId, !password)) {
    return res.status(422).json({ error: "Molim Vas ispunite sve podatke" });
  }
  const doctorLog = new Doctor({
    doctorId,
    password,
    time: new Date(),
  });
  doctorLog
    .save()
    .then((result) => {
      res.json({ result });
    })
    .catch((error) => console.log(error));
});
router.get("/allpatient", (req, res) => {
  Patient.find()

    .then((patients) => {
      res.json({ patients });
    })

    .catch((error) => {
      console.log(error);
    });
});

router.get("/patientData", (req, res) => {
  // console.log(req.user._id);
  Patient.findById()
    .then((patientData) => res.json({ patientData }))
    .catch((error) => {
      console.log(error);
    });
});

router.post("/addDiagnose", (req, res) => {
  const { name, description, media, patientId } = req.body;
  if (!name || !description) {
    return res.status(422).json({ error: "Molim Vas ispunite sve podatke" });
  }

  const diagnoseInfo = new Diagnose({
    name,
    description,
    media,
    patientId,

    time: new Date(),
  });

  diagnoseInfo
    .save()
    .then((result) => {
      //console.log(result);
      res.json({ result });
    })
    .catch((error) => console.log(error));
});

router.get("/patientDiagnose", (req, res) => {
  Diagnose.find()
    .populate("patientId", "_id ")
    .then((patientDiagnose) => {
      console.log(patientDiagnose);
      res.json({ patientDiagnose });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get("/diagnoseData", (req, res) => {
  // console.log(req.user._id);
  Diagnose.findById()
    .populate("patientId", "_id ")
    .then((diagnoseData) => res.json({ diagnoseData }))
    .catch((error) => {
      console.log(error);
    });
});

router.post("/diagnoseDelete/:_id", (req, res) => {
  let id = req.params._id;
  const name = req.body.name;
  Diagnose.findByIdAndRemove(
    { _id: id },
    { $pull: { name: req.body.name } },
    (err, result) => {
      if (err) {
        console.log(err, id);
        return res.status(422).json({ error: "gender cannot be edited" });
      }
      console.log(result);
      res.json({ result });
    }
  );
});

router.put("/patientUpdate/:_id", (req, res) => {
  let id = req.params._id;
  Patient.findByIdAndUpdate(
    { _id: id },
    {
      $set: req.body,
    },
    { new: true },
    (err, result) => {
      if (err) {
        console.log(err, id);
        return res.status(422).json({ error: "gender cannot be edited" });
      }
      res.json({ result });
    }
  );
});
module.exports = router;
