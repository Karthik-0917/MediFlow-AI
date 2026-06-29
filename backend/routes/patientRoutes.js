const express = require("express");

const router = express.Router();

const {
  getPatients,
  createPatient,
  approveInsurance,
  rejectInsurance,
  escalatePatient,
} = require("../controllers/patientController");

router.get("/", getPatients);

router.post("/", createPatient);

router.put("/escalate/:id", escalatePatient);

router.put("/:id/approve", approveInsurance);
router.put("/:id/reject", rejectInsurance);

module.exports = router;