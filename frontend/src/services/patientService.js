const API_URL = "http://localhost:5000/api/patients";

export const getPatients = async () => {
  try {
    const response = await fetch(API_URL);

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching patients:", error);
  }
};

export const submitPatient = async (patientData) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(patientData),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error submitting patient:", error);
  }
};

export const approveInsurance = async (id) => {
  const response = await fetch(
    `http://localhost:5000/api/patients/${id}/approve`,
    {
      method: "PUT",
    }
  );

  return response.json();
};

export const rejectInsurance = async (id) => {
  const response = await fetch(
    `http://localhost:5000/api/patients/${id}/reject`,
    {
      method: "PUT",
    }
  );

  return response.json();
};

export const escalatePatient = async (id) => {

  const response = await fetch(
    `http://localhost:5000/api/patients/escalate/${id}`,
    {
      method: "PUT",
    }
  );

  return response.json();

};