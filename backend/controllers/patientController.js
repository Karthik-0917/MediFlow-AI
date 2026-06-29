const Patient = require("../models/Patient");

const getPatients = async (req, res) => {

  try {

    let patients = await Patient.find();

for (const patient of patients) {

  if (
    patient.priority === "Critical" &&
    patient.severityScore !== 1
  ) {
    patient.severityScore = 1;
    await patient.save();
  }

  else if (
    patient.priority === "High" &&
    patient.severityScore !== 2
  ) {
    patient.severityScore = 2;
    await patient.save();
  }

  else if (
    patient.priority === "Moderate" &&
    patient.severityScore !== 3
  ) {
    patient.severityScore = 3;
    await patient.save();
  }

}

patients.sort((a, b) => {
  if (a.severityScore !== b.severityScore) {
    return a.severityScore - b.severityScore;
  }

  return new Date(b.createdAt) - new Date(a.createdAt);
});

    res.json({
      success: true,
      patients,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to fetch patients",
    });

  }

};

const createPatient = async (req, res) => {

  try {

    let priority = "Moderate";
let severityScore = 3;

const symptoms = req.body.symptoms.toLowerCase();

if (
  symptoms.includes("chest pain") ||
  symptoms.includes("heart") ||
  symptoms.includes("breathing")
) {
  priority = "Critical";
  severityScore = 1;
}
else if (
  symptoms.includes("fever") ||
  symptoms.includes("infection")
) {
  priority = "High";
  severityScore = 2;
}

let assignedDoctor = "General Physician";

if (priority === "Critical") {
  assignedDoctor = "Dr. Emergency";
}
else if (priority === "High") {
  assignedDoctor = "Dr. Specialist";
}

let insuranceStatus = "Pending";

if (
  !req.body.insuranceId ||
  req.body.insuranceId.trim() === ""
) {
  insuranceStatus = "Rejected";
}

let billAmount = 2000;

if (priority === "Critical") {
  billAmount = 10000;
}
else if (priority === "High") {
  billAmount = 5000;
}

    const patient = await Patient.create({
      name: req.body.name,
      age: req.body.age,
      symptoms: req.body.symptoms,
      insuranceId: req.body.insuranceId,
      priority,
      assignedDoctor,
      severityScore,
      insuranceStatus,
      billAmount,
    });

    res.status(201).json({
      success: true,
      message: "Patient created successfully",
      patient,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to create patient",
    });

  }

};

const approveInsurance = async (req, res) => {

  try {

    const patient = await Patient.findByIdAndUpdate(
      req.params.id,
      {
        insuranceStatus: "Verified",
      },
      { new: true }
    );

    res.json({
      success: true,
      patient,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to approve insurance",
    });

  }

};

const rejectInsurance = async (req, res) => {

  try {

    const patient = await Patient.findByIdAndUpdate(
      req.params.id,
      {
        insuranceStatus: "Rejected",
      },
      { new: true }
    );

    res.json({
      success: true,
      patient,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to reject insurance",
    });

  }

};

const escalatePatient = async (req, res) => {
  try {

    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    patient.priority = "Emergency";
patient.severityScore = 0;  

    await patient.save();

    res.json({
      success: true,
      message: "Patient escalated successfully",
      patient,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Escalation failed",
    });

  }
};

module.exports = {
  getPatients,
  createPatient,
  approveInsurance,
  rejectInsurance,
  escalatePatient,
};