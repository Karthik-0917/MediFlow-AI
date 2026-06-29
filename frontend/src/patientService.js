export const escalatePatient = async (id) => {

  const response = await fetch(
    `http://localhost:5000/api/patients/escalate/${id}`,
    {
      method: "PUT",
    }
  );

  return await response.json();
};