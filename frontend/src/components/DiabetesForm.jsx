import { useState } from "react";
import jsPDF from "jspdf";
import API from "../services/api";

function DiabetesForm({ onClose }) {

  const [formData, setFormData] = useState({
    Age: "",
    Height: "",
    Weight: "",
    Glucose: "",
    BloodPressure: "",
    FamilyHistory: "No",
  });

  const [result, setResult] = useState("");

  const handlePredict = async () => {
    try {

      // Calculate BMI automatically
      const heightInMeters = Number(formData.Height) / 100;

      const bmi =
        Number(formData.Weight) /
        (heightInMeters * heightInMeters);

      const response = await API.post("/predict/diabetes", {
        Pregnancies: 0,
        Glucose: Number(formData.Glucose),
        BloodPressure: Number(formData.BloodPressure),
        SkinThickness: 20,
        Insulin: 80,
        BMI: bmi,
        DiabetesPedigreeFunction:
          formData.FamilyHistory === "Yes" ? 1.0 : 0.3,
        Age: Number(formData.Age),
      });

      setResult(response.data.prediction);

    } catch (error) {
      console.log(error);
      setResult("Prediction Failed");
    }
  };

  // Generate PDF Report
 const generateReport = () => {
  const doc = new jsPDF();

  const heightInMeters = Number(formData.Height) / 100;
  const bmi =
    Number(formData.Weight) /
    (heightInMeters * heightInMeters);

  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  // ---------- HEADER ----------

  doc.setFillColor(22, 163, 74);
  doc.rect(0, 0, 210, 42, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.text("NutriGuardian AI", 20, 20);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(13);
  doc.text("Diabetes Risk Assessment Report", 20, 30);

  // ---------- DATE ----------

  doc.setTextColor(80, 80, 80);
  doc.setFontSize(10);
  doc.text(`Assessment Date: ${formattedDate}`, 20, 55);

  // ---------- HEALTH PROFILE ----------

  doc.setTextColor(30, 30, 30);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.text("Patient Health Profile", 20, 72);

  // Profile box
  doc.setDrawColor(210, 210, 210);
  doc.roundedRect(15, 78, 180, 75, 4, 4);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);

  // Left column
  doc.text(`Age`, 25, 92);
  doc.text(`${formData.Age} years`, 75, 92);

  doc.text(`Height`, 25, 108);
  doc.text(`${formData.Height} cm`, 75, 108);

  doc.text(`Weight`, 25, 124);
  doc.text(`${formData.Weight} kg`, 75, 124);

  doc.text(`BMI`, 25, 140);
  doc.text(`${bmi.toFixed(2)}`, 75, 140);

  // Right column
  doc.text(`Glucose`, 110, 92);
  doc.text(`${formData.Glucose}`, 160, 92);

  doc.text(`Blood Pressure`, 110, 108);
  doc.text(`${formData.BloodPressure}`, 160, 108);

  doc.text(`Family History`, 110, 124);
  doc.text(`${formData.FamilyHistory}`, 160, 124);

  // ---------- RESULT ----------

  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.text("Diabetes Assessment", 20, 174);

  const isPositive = result.toLowerCase().includes("positive");

  if (isPositive) {
    doc.setFillColor(254, 226, 226);
    doc.setTextColor(185, 28, 28);
  } else {
    doc.setFillColor(220, 252, 231);
    doc.setTextColor(21, 128, 61);
  }

  doc.roundedRect(15, 182, 180, 35, 5, 5, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);

  const resultText = result
    .replace("Diabetes Risk: ", "")
    .toUpperCase();

  doc.text(
    `DIABETES RISK: ${resultText}`,
    105,
    203,
    { align: "center" }
  );

  // ---------- FOOTER ----------

  doc.setTextColor(120, 120, 120);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);

  doc.text(
    "NutriGuardian AI • Health Risk Assessment",
    105,
    280,
    { align: "center" }
  );

  // ---------- SAVE ----------

  doc.save("NutriGuardian_Diabetes_Risk_Report.pdf");
};

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white rounded-3xl shadow-2xl p-8 w-[650px] relative">

        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-2xl hover:text-red-500"
        >
          ✕
        </button>

        <h2 className="text-3xl font-bold text-green-700 mb-6">
          🩸 Diabetes Prediction
        </h2>

        <div className="grid grid-cols-2 gap-4">

          <input
            type="number"
            placeholder="Age"
            className="border rounded-xl p-3"
            value={formData.Age}
            onChange={(e) =>
              setFormData({
                ...formData,
                Age: e.target.value
              })
            }
          />

          <input
            type="number"
            placeholder="Height (cm)"
            className="border rounded-xl p-3"
            value={formData.Height}
            onChange={(e) =>
              setFormData({
                ...formData,
                Height: e.target.value
              })
            }
          />

          <input
            type="number"
            placeholder="Weight (kg)"
            className="border rounded-xl p-3"
            value={formData.Weight}
            onChange={(e) =>
              setFormData({
                ...formData,
                Weight: e.target.value
              })
            }
          />

          <input
            type="number"
            placeholder="Glucose"
            className="border rounded-xl p-3"
            value={formData.Glucose}
            onChange={(e) =>
              setFormData({
                ...formData,
                Glucose: e.target.value
              })
            }
          />

          <input
            type="number"
            placeholder="Blood Pressure"
            className="border rounded-xl p-3"
            value={formData.BloodPressure}
            onChange={(e) =>
              setFormData({
                ...formData,
                BloodPressure: e.target.value
              })
            }
          />

          <select
            className="border rounded-xl p-3"
            value={formData.FamilyHistory}
            onChange={(e) =>
              setFormData({
                ...formData,
                FamilyHistory: e.target.value
              })
            }
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>

        </div>

        <button
          onClick={handlePredict}
          className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl text-lg font-semibold"
        >
          Predict Diabetes
        </button>

        {result && (
          <>
            <div className="mt-6 bg-green-100 text-green-700 p-4 rounded-xl text-center font-bold">
              {result}
            </div>

            <button
              onClick={generateReport}
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-lg font-semibold"
            >
              📄 Download PDF Report
            </button>
          </>
        )}

      </div>

    </div>
  );
}

export default DiabetesForm;