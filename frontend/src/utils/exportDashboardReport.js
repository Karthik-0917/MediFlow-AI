import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const exportDashboardReport = ({
  totalPatients,
  criticalPatients,
  pendingApprovals,
  totalRevenue,
}) => {
  const doc = new jsPDF();

  doc.setFontSize(22);
  doc.text("MediFlow AI", 14, 20);

  doc.setDrawColor(37, 99, 235);
doc.line(14, 25, 195, 25);

  doc.setFontSize(14);
  doc.text("Hospital Workflow Report", 14, 32);

  doc.setFontSize(11);
  doc.text(
    `Generated On: ${new Date().toLocaleString()}`,
    14,
    42
  );

  autoTable(doc, {
  startY: 55,
  head: [["Metric", "Value"]],
  body: [
    ["Total Patients", totalPatients],
    ["Critical Cases", criticalPatients],
    ["Pending Approvals", pendingApprovals],
    ["Total Revenue", `Rs. ${totalRevenue.toLocaleString()}`],
    ["Workflow Status", "Operational"],
    ["AI Supervisor", "Active"],
  ],
  theme: "grid",
  headStyles: {
    fillColor: [37, 99, 235],
    textColor: 255,
    fontStyle: "bold",
  },
  alternateRowStyles: {
    fillColor: [248, 250, 252],
  },
});

doc.setFontSize(14);
doc.text("Executive Summary", 14, 160);

doc.setFontSize(11);

doc.text(
  `The hospital currently has ${totalPatients} active patients with ${criticalPatients} critical cases requiring immediate attention. There are ${pendingApprovals} insurance approvals pending and the total generated revenue is Rs. ${totalRevenue.toLocaleString()}. The AI Supervisor Agent is actively monitoring hospital workflow and coordinating patient management.`,
  14,
  172,
  {
    maxWidth: 180,
  }
);

  doc.save("MediFlow_Report.pdf");
};

export default exportDashboardReport;