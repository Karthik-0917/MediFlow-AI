const express = require("express");

const router = express.Router();

const {
  getSupervisorDecision,
  getPatientAssessment,
  getDoctorRecommendation,
} = require("../controllers/aiController");

router.post(
  "/supervisor-decision",
  getSupervisorDecision
);

router.post(
  "/patient-assessment",
  getPatientAssessment
);

router.post(
  "/doctor-recommendation",
  getDoctorRecommendation
);

router.get("/doctor-test", (req, res) => {
  res.json({
    success: true,
    message: "Doctor Recommendation Route Working",
  });
});


module.exports = router;