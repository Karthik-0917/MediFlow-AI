const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const Patient = require("../models/Patient");

const getSupervisorDecision = async (req, res) => {
  try {
    const { criticalPatients, pendingApprovals } = req.body;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant" ,
      messages: [
        {
          role: "system",
          content:
            "You are an AI hospital supervisor responsible for managing hospital workflow.",
        },
        {
          role: "user",
          content: `
Critical Patients: ${criticalPatients}
Pending Approvals: ${pendingApprovals}

Provide a professional hospital supervisor decision.

Respond in exactly this format:

Risk Level: <value>
Recommended Action: <value>
Explanation: <value>

Rules:
- No markdown
- No asterisks (*)
- No bullet points
- No numbering
- Plain text only
- Keep the response under 70 words.
- Recommended Action should be 1-2 professional sentences.
- Explanation should be 1-2 concise sentences.
- Keep the response clear, actionable, and suitable for a hospital operations dashboard.
          `,
        },
      ],
    });

    res.json({
      success: true,
      decision: completion.choices[0].message.content,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "AI decision failed",
    });
  }
};

const getPatientAssessment = async (req, res) => {
  try {

    const {
  name,
  age,
  symptoms,
} = req.body;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "You are an AI hospital triage assistant.",
        },
        {
          role: "user",
          content: `
Patient Name: ${name}
Age: ${age}
Symptoms: ${symptoms}

Provide:

Risk Level:
Recommended Department:
Suggested Tests:
Immediate Action:

Keep response under 60 words.
No markdown.
Plain text only.
          `,
        },
      ],
    });

    res.json({
      success: true,
      assessment:
        completion.choices[0].message.content,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Assessment generation failed",
    });
  }
};

const getDoctorRecommendation = async (req, res) => {
  try {

    const {
      patientId,
      name,
      age,
      symptoms,
    } = req.body;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "You are an AI medical specialist recommendation assistant.",
        },
        {
          role: "user",
          content: `
Patient Name: ${name}
Age: ${age}
Symptoms: ${symptoms}

Provide:

Recommended Specialist:
Confidence:
Reason:

Keep response under 50 words.
No markdown.
Plain text only.
          `,
        },
      ],
    });

    const recommendation =
      completion.choices[0].message.content;

    const specialtyMatch = recommendation.match(
      /Recommended Specialist:\s*(.*)/i
    );

    const recommendedSpecialty = specialtyMatch
      ? specialtyMatch[1].trim()
      : "General Medicine";

    await Patient.findByIdAndUpdate(
      patientId,
      {
        recommendedSpecialty,
      }
    );

    res.json({
      success: true,
      recommendation,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Doctor recommendation failed",
    });

  }
};

module.exports = {
  getSupervisorDecision,
  getPatientAssessment,
  getDoctorRecommendation,
};