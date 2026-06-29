const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {

    
    name: {
      type: String,
      required: true,
    },

    age: {
      type: Number,
      required: true,
    },

    symptoms: {
      type: String,
      required: true,
    },

    insuranceId: {
      type: String,
      default: "",
    },

    priority: {
  type: String,
  enum: ["Emergency", "Critical", "High", "Moderate"],
  default: "Moderate",
},

    severityScore: {
  type: Number,
  default: 3,
},

    condition: {
      type: String,
      default: "Under Review",
    },

    assignedDoctor: {
  type: String,
  default: "Not Assigned",
},

recommendedSpecialty: {
  type: String,
  default: "Not Assigned",
},

insuranceStatus: {
  type: String,
  default: "Pending",
},

billAmount: {
  type: Number,
  default: 0,
},

  },
  {
    timestamps: true,
  }
  
);

module.exports = mongoose.model("Patient", patientSchema);