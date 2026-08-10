import { useState } from "react";
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
  <option value="TA">Chest pain during physical activity</option>

  <option value="ATA">Mild or unusual chest pain</option>

  <option value="NAP">Chest pain not related to the heart</option>

  <option value="ASY">No chest pain symptoms</option>
</select>

        </div>

        <button
          onClick={handlePredict}
          className="mt-8 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl text-lg font-semibold"
        >
          Predict Heart Disease
        </button>

        {result && (
          <div className="mt-6 bg-red-100 text-red-700 p-4 rounded-xl text-center font-bold">
            {result}
          </div>
        )}

      </div>

    </div>

  );
}

export default HeartForm;