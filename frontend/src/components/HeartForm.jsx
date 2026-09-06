import { useState } from "react";
import jsPDF from "jspdf";
import API from "../services/api";

function HeartForm({ onClose }) {

  const [formData, setFormData] = useState({
    Age: "",
    Sex: "Male",
    ChestPainType: "ATA",
    RestingBP: "",
    Cholesterol: "",
    MaxHR: "",
  });

  const [result, setResult] = useState("");

  const handlePredict = async () => {

    try {

      const response = await API.post("/predict/heart", {

        age: Number(formData.Age),

        sex: formData.Sex === "Male" ? 1 : 0,

        cp:
          formData.ChestPainType === "TA"
            ? 0
            : formData.ChestPainType === "ATA"
            ? 1
            : formData.ChestPainType === "NAP"
            ? 2
            : 3,

        trestbps: Number(formData.RestingBP),

        chol: Number(formData.Cholesterol),

        fbs: 0,

        restecg: 1,

        thalach: Number(formData.MaxHR),

        exang: 0,

        oldpeak: 0,

        slope: 1,

        ca: 0,

        thal: 2,

      });

      setResult(response.data.prediction);

    } catch (error) {

      console.log(error);
      setResult("Prediction Failed");

    }

  };

  // -----------------------------
  // Generate Heart Disease PDF
  // -----------------------------

  const generateReport = () => {

    const doc = new jsPDF();

    const today = new Date();

    const formattedDate = today.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    // ---------- HEADER ----------

    doc.setFillColor(220, 38, 38);
    doc.rect(0, 0, 210, 42, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.text("NutriGuardian AI", 20, 20);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(13);
    doc.text("Heart Disease Risk Assessment Report", 20, 30);

    // ---------- DATE ----------

    doc.setTextColor(80, 80, 80);
    doc.setFontSize(10);

    doc.text(
      `Assessment Date: ${formattedDate}`,
      20,
      55
    );

    // ---------- HEALTH PROFILE ----------

    doc.setTextColor(30, 30, 30);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(15);

    doc.text(
      "Patient Health Profile",
      20,
      72
    );

    doc.setDrawColor(210, 210, 210);

    doc.roundedRect(
      15,
      78,
      180,
      75,
      4,
      4
    );

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    // Left column

    doc.text("Age", 25, 92);
    doc.text(
      `${formData.Age} years`,
      75,
      92
    );

    doc.text("Sex", 25, 108);
    doc.text(
      formData.Sex,
      75,
      108
    );

    doc.text(
      "Resting Blood Pressure",
      25,
      124
    );

    doc.text(
      `${formData.RestingBP}`,
      75,
      124
    );

    // Right column

    doc.text(
      "Cholesterol",
      110,
      92
    );

    doc.text(
      `${formData.Cholesterol}`,
      160,
      92
    );

    doc.text(
      "Maximum Heart Rate",
      110,
      108
    );

    doc.text(
      `${formData.MaxHR}`,
      160,
      108
    );

    doc.text(
      "Chest Pain",
      110,
      124
    );

    let chestPainText = "";

    if (formData.ChestPainType === "TA") {
      chestPainText = "During activity";
    } else if (formData.ChestPainType === "ATA") {
      chestPainText = "Mild / unusual";
    } else if (formData.ChestPainType === "NAP") {
      chestPainText = "Not heart-related";
    } else {
      chestPainText = "No symptoms";
    }

    doc.text(
      chestPainText,
      160,
      124
    );

    // ---------- RESULT ----------

    doc.setFont("helvetica", "bold");
    doc.setFontSize(15);

    doc.text(
      "Heart Disease Assessment",
      20,
      174
    );

    const isPositive =
      result.toLowerCase().includes("positive");

    if (isPositive) {

      doc.setFillColor(
        254,
        226,
        226
      );

      doc.setTextColor(
        185,
        28,
        28
      );

    } else {

      doc.setFillColor(
        220,
        252,
        231
      );

      doc.setTextColor(
        21,
        128,
        61
      );
    }

    doc.roundedRect(
      15,
      182,
      180,
      35,
      5,
      5,
      "F"
    );

    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.setFontSize(16);

    const resultText = result
      .replace(
        "Heart Disease Risk: ",
        ""
      )
      .toUpperCase();

    doc.text(
      `HEART DISEASE RISK: ${resultText}`,
      105,
      203,
      {
        align: "center"
      }
    );

    // ---------- FOOTER ----------

    doc.setTextColor(
      120,
      120,
      120
    );

    doc.setFont(
      "helvetica",
      "normal"
    );

    doc.setFontSize(9);

    doc.text(
      "NutriGuardian AI • Health Risk Assessment",
      105,
      280,
      {
        align: "center"
      }
    );

    // ---------- SAVE ----------

    doc.save(
      "NutriGuardian_Heart_Disease_Risk_Report.pdf"
    );
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

        <h2 className="text-3xl font-bold text-red-600 mb-6">
          ❤️ Heart Disease Prediction
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
                Age: e.target.value,
              })
            }
          />

          <select
            className="border rounded-xl p-3"
            value={formData.Sex}
            onChange={(e) =>
              setFormData({
                ...formData,
                Sex: e.target.value,
              })
            }
          >

            <option>Male</option>
            <option>Female</option>

          </select>

          <input
            type="number"
            placeholder="Resting Blood Pressure"
            className="border rounded-xl p-3"
            value={formData.RestingBP}
            onChange={(e) =>
              setFormData({
                ...formData,
                RestingBP: e.target.value,
              })
            }
          />

          <input
            type="number"
            placeholder="Cholesterol"
            className="border rounded-xl p-3"
            value={formData.Cholesterol}
            onChange={(e) =>
              setFormData({
                ...formData,
                Cholesterol: e.target.value,
              })
            }
          />

          <input
            type="number"
            placeholder="Maximum Heart Rate"
            className="border rounded-xl p-3"
            value={formData.MaxHR}
            onChange={(e) =>
              setFormData({
                ...formData,
                MaxHR: e.target.value,
              })
            }
          />

          <select
            className="border rounded-xl p-3"
            value={formData.ChestPainType}
            onChange={(e) =>
              setFormData({
                ...formData,
                ChestPainType: e.target.value,
              })
            }
          >

            <option value="TA">
              Chest pain during physical activity
            </option>

            <option value="ATA">
              Mild or unusual chest pain
            </option>

            <option value="NAP">
              Chest pain not related to the heart
            </option>

            <option value="ASY">
              No chest pain symptoms
            </option>

          </select>

        </div>

        <button
          onClick={handlePredict}
          className="mt-8 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl text-lg font-semibold"
        >
          Predict Heart Disease
        </button>

        {result && (
          <>
            <div className="mt-6 bg-red-100 text-red-700 p-4 rounded-xl text-center font-bold">
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

export default HeartForm;