import { useState } from "react";
import API from "../services/api";
import jsPDF from "jspdf";

function ObesityForm({ onClose }) {

  const [formData, setFormData] = useState({

    Gender: "",
    Age: "",
    Height: "",
    Weight: "",
    family_history_with_overweight: "",
    FAVC: "",
    FCVC: "",
    NCP: "",
    CH2O: "",
    FAF: "",
    CALC: ""

  });

  const [result, setResult] = useState("");


 const handlePredict = async () => {

  try {

    // Validate input ranges

    if (
      Number(formData.FCVC) < 1 ||
      Number(formData.FCVC) > 3
    ) {
      alert("Vegetable Intake must be between 1 and 3.");
      return;
    }

    if (
      Number(formData.CH2O) < 1 ||
      Number(formData.CH2O) > 3
    ) {
      alert("Water Intake must be between 1 and 3.");
      return;
    }

    if (
      Number(formData.FAF) < 0 ||
      Number(formData.FAF) > 3
    ) {
      alert("Physical Activity must be between 0 and 3.");
      return;
    }


    // Send data to backend

    const response = await API.post("/predict/obesity", {

      Gender: formData.Gender,

      Age: Number(formData.Age),

      Height: Number(formData.Height),

      Weight: Number(formData.Weight),

      family_history_with_overweight:
        formData.family_history_with_overweight,

      FAVC: formData.FAVC,

      FCVC: Number(formData.FCVC),

      NCP: Number(formData.NCP),

      // Hidden values for model

      CAEC: "Sometimes",

      SMOKE: "no",

      CH2O: Number(formData.CH2O),

      SCC: "no",

      FAF: Number(formData.FAF),

      TUE: 1,

      CALC: formData.CALC,

      MTRANS: "Public_Transportation"

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

  const today = new Date().toLocaleDateString();

  // --------------------------------
  // Page background/header
  // --------------------------------

  doc.setFillColor(236, 253, 245);
  doc.rect(0, 0, 210, 48, "F");

  // Brand
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.setTextColor(22, 101, 52);
  doc.text("NutriGuardian AI", 20, 23);

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(75, 85, 99);
  doc.text("AI-Powered Health & Nutrition Platform", 20, 32);

  // Date
  doc.setFontSize(10);
  doc.text(`Report Date: ${today}`, 150, 23);

  // --------------------------------
  // Main title
  // --------------------------------

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(31, 41, 55);

  doc.text("OBESITY RISK", 20, 67);

  doc.setTextColor(22, 101, 52);
  doc.text("ASSESSMENT REPORT", 20, 76);

  // --------------------------------
  // Patient information box
  // --------------------------------

  doc.setFillColor(249, 250, 251);
  doc.setDrawColor(209, 213, 219);

  doc.roundedRect(15, 88, 180, 105, 5, 5, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(31, 41, 55);

  doc.text("Patient Information", 25, 102);

  doc.setDrawColor(229, 231, 235);
  doc.line(25, 107, 185, 107);

  // --------------------------------
  // Calculate BMI
  // --------------------------------

  const height = Number(formData.Height);
  const weight = Number(formData.Weight);

  let bmi = 0;

  if (height > 0) {
    bmi = weight / (height * height);
  }

  // --------------------------------
  // Left column
  // --------------------------------

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(107, 114, 128);

  doc.text("Gender", 25, 120);
  doc.text("Age", 25, 138);
  doc.text("Height", 25, 156);
  doc.text("Weight", 25, 174);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(31, 41, 55);

  doc.setFontSize(11);

  doc.text(`${formData.Gender}`, 75, 120);
  doc.text(`${formData.Age} years`, 75, 138);
  doc.text(`${formData.Height} m`, 75, 156);
  doc.text(`${formData.Weight} kg`, 75, 174);

  // --------------------------------
  // Right column
  // --------------------------------

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(107, 114, 128);

  doc.text("BMI", 110, 120);
  doc.text("Family History", 110, 138);
  doc.text("High Calorie Food", 110, 156);
  doc.text("Physical Activity", 110, 174);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(31, 41, 55);

  doc.text(bmi.toFixed(2), 160, 120);
  doc.text(`${formData.family_history_with_overweight}`, 160, 138);
  doc.text(`${formData.FAVC}`, 160, 156);
  doc.text(`${formData.FAF}`, 160, 174);

  // --------------------------------
  // Nutrition information
  // --------------------------------

  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(209, 213, 219);

  doc.roundedRect(15, 203, 180, 50, 5, 5, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(31, 41, 55);

  doc.text("Lifestyle Information", 25, 217);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(75, 85, 99);

  doc.text(`Vegetable Intake: ${formData.FCVC}`, 25, 230);
  doc.text(`Meals Per Day: ${formData.NCP}`, 25, 240);

  doc.text(`Water Intake: ${formData.CH2O}`, 110, 230);
  doc.text(`Alcohol: ${formData.CALC}`, 110, 240);

  // --------------------------------
  // Prediction result
  // --------------------------------

  doc.setFillColor(240, 253, 244);
  doc.setDrawColor(134, 239, 172);

  doc.roundedRect(15, 263, 180, 30, 5, 5, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(22, 101, 52);

  doc.text("PREDICTION RESULT", 25, 275);

  doc.setFontSize(13);
  doc.setTextColor(20, 83, 45);

  doc.text(`${result}`, 25, 286);

  // --------------------------------
  // Footer
  // --------------------------------

  doc.setDrawColor(229, 231, 235);
  doc.line(20, 300, 190, 300);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(107, 114, 128);

  doc.text(
    "NutriGuardian AI • Health & Nutrition Intelligence",
    20,
    308
  );

  doc.text(
    "Generated Report",
    165,
    308
  );

  // --------------------------------
  // Download
  // --------------------------------

  doc.save("NutriGuardian_AI_Obesity_Report.pdf");
};


  return (

    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white rounded-3xl shadow-2xl p-8 w-[600px] relative">


        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-2xl"
        >
          ✕
        </button>


        <h2 className="text-3xl font-bold text-pink-600 mb-6">
          ⚖️ Obesity Prediction
        </h2>


        <div className="grid grid-cols-2 gap-4">


          <select
            className="border rounded-xl p-3"
            value={formData.Gender}
            onChange={(e)=>setFormData({...formData,Gender:e.target.value})}
          >

            <option value="">Gender</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>

          </select>


          <input
            type="number"
            placeholder="Age"
            className="border rounded-xl p-3"
            value={formData.Age}
            onChange={(e)=>setFormData({...formData,Age:e.target.value})}
          />


          <input
            type="number"
            step="0.01"
            placeholder="Height (meters)"
            className="border rounded-xl p-3"
            value={formData.Height}
            onChange={(e)=>setFormData({...formData,Height:e.target.value})}
          />


          <input
            type="number"
            placeholder="Weight (kg)"
            className="border rounded-xl p-3"
            value={formData.Weight}
            onChange={(e)=>setFormData({...formData,Weight:e.target.value})}
          />


          <select
            className="border rounded-xl p-3"
            value={formData.family_history_with_overweight}
            onChange={(e)=>setFormData({...formData,family_history_with_overweight:e.target.value})}
          >

            <option value="">Family History</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>

          </select>


          <select
            className="border rounded-xl p-3"
            value={formData.FAVC}
            onChange={(e)=>setFormData({...formData,FAVC:e.target.value})}
          >

            <option value="">High Calorie Food</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>

          </select>


          <input
  type="number"
  min="1"
  max="3"
  step="1"
  placeholder="Vegetable Intake (1-3)"
  className="border rounded-xl p-3"
  value={formData.FCVC}
  onChange={(e)=>setFormData({...formData,FCVC:e.target.value})}
/>


          <input
            type="number"
            placeholder="Meals Per Day"
            className="border rounded-xl p-3"
            value={formData.NCP}
            onChange={(e)=>setFormData({...formData,NCP:e.target.value})}
          />


          <input
  type="number"
  min="1"
  max="3"
  step="1"
  placeholder="Water Intake (1-3)"
  className="border rounded-xl p-3"
  value={formData.CH2O}
  onChange={(e)=>setFormData({...formData,CH2O:e.target.value})}
/>


          <input
  type="number"
  min="0"
  max="3"
  step="1"
  placeholder="Physical Activity (0-3)"
  className="border rounded-xl p-3"
  value={formData.FAF}
  onChange={(e)=>setFormData({...formData,FAF:e.target.value})}
/>

          <select
            className="border rounded-xl p-3 col-span-2"
            value={formData.CALC}
            onChange={(e)=>setFormData({...formData,CALC:e.target.value})}
          >

            <option value="">Alcohol Consumption</option>
            <option value="no">No</option>
            <option value="Sometimes">Sometimes</option>
            <option value="Frequently">Frequently</option>
            <option value="Always">Always</option>

          </select>


        </div>


        <button
          onClick={handlePredict}
          className="mt-8 w-full bg-pink-600 text-white py-3 rounded-xl"
        >
          Predict Obesity
        </button>


        {result && (

          <>

            <div className="mt-6 bg-pink-100 p-4 rounded-xl text-center font-bold">
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

export default ObesityForm;