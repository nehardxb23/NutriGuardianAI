import { useState } from "react";
import API from "../services/api";
import jsPDF from "jspdf";

function HypertensionForm({ onClose }) {

  const [formData, setFormData] = useState({
    Age: "",
    Height: "",
    Weight: "",
    Salt_Intake: "",
    Stress_Score: "",
    BP_History: "Normal",
    Sleep_Duration: "",
    Medication: "Other",
    Family_History: "No",
    Exercise_Level: "Moderate",
    Smoking_Status: "Non-Smoker",
  });

  const [result, setResult] = useState("");

  const handlePredict = async () => {

    try {

      const heightInMeters = Number(formData.Height) / 100;

      const bmi =
        Number(formData.Weight) /
        (heightInMeters * heightInMeters);

      const response = await API.post("/predict/hypertension", {

        Age: Number(formData.Age),

        Salt_Intake: Number(formData.Salt_Intake),

        Stress_Score: Number(formData.Stress_Score),

        BP_History: formData.BP_History,

        Sleep_Duration: Number(formData.Sleep_Duration),

        BMI: bmi,

        Medication: formData.Medication,

        Family_History: formData.Family_History,

        Exercise_Level: formData.Exercise_Level,

        Smoking_Status: formData.Smoking_Status,

      });

      setResult(response.data.prediction);

    } catch (error) {

      console.log(error);
      setResult("Prediction Failed");

    }

  };


  // -----------------------------
  // Generate PDF Report
  // -----------------------------

  const generatePDF = () => {

    const doc = new jsPDF();

    const heightInMeters = Number(formData.Height) / 100;

    const bmi =
      Number(formData.Weight) /
      (heightInMeters * heightInMeters);

    const reportDate = new Date().toLocaleDateString();

    // Header
    doc.setFillColor(219, 39, 119);
    doc.rect(0, 0, 210, 35, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("NutriGuardian AI", 20, 15);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Hypertension Risk Assessment Report", 20, 25);

    // Date
    doc.setTextColor(80, 80, 80);
    doc.setFontSize(10);
    doc.text(`Report Date: ${reportDate}`, 20, 45);

    // Section: Health Information
    doc.setTextColor(219, 39, 119);
    doc.setFontSize(15);
    doc.setFont("helvetica", "bold");
    doc.text("Health Information", 20, 60);

    doc.setDrawColor(220, 220, 220);
    doc.line(20, 64, 190, 64);

    doc.setTextColor(50, 50, 50);
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");

    let y = 77;

    doc.text(`Age: ${formData.Age} years`, 25, y);
    doc.text(`Height: ${formData.Height} cm`, 110, y);

    y += 10;

    doc.text(`Weight: ${formData.Weight} kg`, 25, y);
    doc.text(`BMI: ${bmi.toFixed(2)}`, 110, y);

    y += 10;

    doc.text(`Salt Intake: ${formData.Salt_Intake}/10`, 25, y);
    doc.text(`Stress Score: ${formData.Stress_Score}/10`, 110, y);

    y += 10;

    doc.text(`Sleep Duration: ${formData.Sleep_Duration} hours`, 25, y);

    y += 10;

    doc.text(`Blood Pressure History: ${formData.BP_History}`, 25, y);

    y += 10;

    doc.text(`Family History: ${formData.Family_History}`, 25, y);

    y += 10;

    doc.text(`Smoking Status: ${formData.Smoking_Status}`, 25, y);

    y += 10;

    doc.text(`Exercise Level: ${formData.Exercise_Level}`, 25, y);

    y += 10;

    const medicationText =
      formData.Medication === "Other"
        ? "No medication"
        : formData.Medication;

    doc.text(`Medication: ${medicationText}`, 25, y);


    // Prediction Section
    y += 25;

    doc.setTextColor(219, 39, 119);
    doc.setFontSize(15);
    doc.setFont("helvetica", "bold");
    doc.text("Prediction Result", 20, y);

    doc.line(20, y + 4, 190, y + 4);

    y += 20;

    // Result box
    doc.setFillColor(253, 242, 248);
    doc.roundedRect(20, y - 8, 170, 25, 4, 4, "F");

    doc.setTextColor(157, 23, 77);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");

    doc.text(
      `Hypertension Prediction: ${result}`,
      30,
      y + 7
    );


    // Footer
    doc.setTextColor(120, 120, 120);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");

    doc.text(
      "NutriGuardian AI • Disease Risk Assessment",
      20,
      285
    );

    doc.text(
      "Generated from the entered health information.",
      20,
      291
    );

    // Download
    doc.save("NutriGuardian_Hypertension_Report.pdf");
  };


  return (

    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white rounded-3xl shadow-2xl p-8 w-[700px] relative">

        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-2xl hover:text-red-500"
        >
          ✕
        </button>

        <h2 className="text-3xl font-bold text-pink-600 mb-6">
          💓 Hypertension Prediction
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
            placeholder="Salt Intake (0-10)"
            className="border rounded-xl p-3"
            value={formData.Salt_Intake}
            onChange={(e) =>
              setFormData({
                ...formData,
                Salt_Intake: e.target.value
              })
            }
          />

          <input
            type="number"
            placeholder="Stress Score (1-10)"
            className="border rounded-xl p-3"
            value={formData.Stress_Score}
            onChange={(e) =>
              setFormData({
                ...formData,
                Stress_Score: e.target.value
              })
            }
          />

          <input
            type="number"
            placeholder="Sleep Duration (hours)"
            className="border rounded-xl p-3"
            value={formData.Sleep_Duration}
            onChange={(e) =>
              setFormData({
                ...formData,
                Sleep_Duration: e.target.value
              })
            }
          />

          <select
            className="border rounded-xl p-3"
            value={formData.BP_History}
            onChange={(e) =>
              setFormData({
                ...formData,
                BP_History: e.target.value
              })
            }
          >
            <option value="Normal">
              Blood pressure is usually normal
            </option>

            <option value="Prehypertension">
              Sometimes slightly high
            </option>

            <option value="Hypertension">
              Already diagnosed with high BP
            </option>
          </select>


          <select
            className="border rounded-xl p-3"
            value={formData.Family_History}
            onChange={(e) =>
              setFormData({
                ...formData,
                Family_History: e.target.value
              })
            }
          >
            <option value="No">
              No family history
            </option>

            <option value="Yes">
              Family history of hypertension
            </option>
          </select>


          <select
            className="border rounded-xl p-3"
            value={formData.Smoking_Status}
            onChange={(e) =>
              setFormData({
                ...formData,
                Smoking_Status: e.target.value
              })
            }
          >
            <option value="Non-Smoker">
              Non-Smoker
            </option>

            <option value="Smoker">
              Smoker
            </option>
          </select>


          <select
            className="border rounded-xl p-3"
            value={formData.Exercise_Level}
            onChange={(e) =>
              setFormData({
                ...formData,
                Exercise_Level: e.target.value
              })
            }
          >
            <option value="High">
              Exercise regularly
            </option>

            <option value="Moderate">
              Exercise sometimes
            </option>

            <option value="Low">
              Rarely exercise
            </option>
          </select>


          <select
            className="border rounded-xl p-3 col-span-2"
            value={formData.Medication}
            onChange={(e) =>
              setFormData({
                ...formData,
                Medication: e.target.value
              })
            }
          >
            <option value="Other">
              No medication
            </option>

            <option value="ACE Inhibitor">
              ACE Inhibitor
            </option>

            <option value="Beta Blocker">
              Beta Blocker
            </option>

            <option value="Diuretic">
              Diuretic
            </option>
          </select>

        </div>


        <button
          onClick={handlePredict}
          className="mt-8 w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-xl text-lg font-semibold"
        >
          Predict Hypertension
        </button>


        {result && (

          <>
            <div className="mt-6 bg-pink-100 text-pink-700 p-4 rounded-xl text-center font-bold">
              {result}
            </div>

            <button
              onClick={generatePDF}
              className="mt-4 w-full bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-xl text-lg font-semibold"
            >
              📄 Download PDF Report
            </button>
          </>

        )}

      </div>

    </div>

  );

}

export default HypertensionForm;