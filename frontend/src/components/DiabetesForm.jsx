import { useState } from "react";
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
      setFormData({ ...formData, Age: e.target.value })
    }
  />

  <input
    type="number"
    placeholder="Height (cm)"
    className="border rounded-xl p-3"
    value={formData.Height}
    onChange={(e) =>
      setFormData({ ...formData, Height: e.target.value })
    }
  />

  <input
    type="number"
    placeholder="Weight (kg)"
    className="border rounded-xl p-3"
    value={formData.Weight}
    onChange={(e) =>
      setFormData({ ...formData, Weight: e.target.value })
    }
  />

  <input
    type="number"
    placeholder="Glucose"
    className="border rounded-xl p-3"
    value={formData.Glucose}
    onChange={(e) =>
      setFormData({ ...formData, Glucose: e.target.value })
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
        BloodPressure: e.target.value,
      })
    }
  />

  <select
    className="border rounded-xl p-3"
    value={formData.FamilyHistory}
    onChange={(e) =>
      setFormData({
        ...formData,
        FamilyHistory: e.target.value,
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
          <div className="mt-6 bg-green-100 text-green-700 p-4 rounded-xl text-center font-bold">
            {result}
          </div>
        )}

      </div>

    </div>
  );
}

export default DiabetesForm;