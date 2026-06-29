require("dotenv").config();
const express = require("express");
const cors = require("cors");
const patientRoutes = require("./routes/patientRoutes");
const connectDB = require("./config/db");
const aiRoutes = require("./routes/aiRoutes");


const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/patients", patientRoutes);
app.use("/api/ai", aiRoutes);

app.get("/", (req, res) => {
  res.send("MediFlow AI Backend Running");
});

const PORT = 5000;

connectDB();

app.get("/test-ai", async (req, res) => {
  try {
    const Groq = require("groq-sdk");

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: "Say 'MediFlow AI connected successfully'",
        },
      ],
    });

    res.send(
      completion.choices[0].message.content
    );

  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

app.get("/test-patient-ai", async (req, res) => {

  try {

    const Groq = require("groq-sdk");

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: `
Patient Name: Ramu
Age: 55
Symptoms: Chest Pain

Provide:

Risk Level:
Recommended Department:
Suggested Tests:
Immediate Action:

Plain text only.
          `,
        },
      ],
    });

    res.send(
      completion.choices[0].message.content
    );

  } catch (error) {

    console.log(error);

    res.status(500).send(error.message);

  }

});

app.get("/test-doctor-ai", async (req, res) => {

  try {

    const Groq = require("groq-sdk");

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: `
Patient Name: Ramu
Age: 55
Symptoms: Chest Pain

Provide:

Recommended Specialist:
Confidence:
Reason:

Plain text only.
          `,
        },
      ],
    });

    res.send(
      completion.choices[0].message.content
    );

  } catch (error) {

    console.log(error);

    res.status(500).send(error.message);

  }

});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

