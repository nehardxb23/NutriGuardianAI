import { useState } from "react";
import API from "../services/api";

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
            onChange={(e)=>setFormData({...formData,Age:e.target.value})}
          />


          <input
            type="number"
            placeholder="Height (cm)"
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


          <input
            type="number"
            placeholder="Salt Intake (0-10)"
            className="border rounded-xl p-3"
            value={formData.Salt_Intake}
            onChange={(e)=>setFormData({...formData,Salt_Intake:e.target.value})}
          />


          <input
            type="number"
            placeholder="Stress Score (1-10)"
            className="border rounded-xl p-3"
            value={formData.Stress_Score}
            onChange={(e)=>setFormData({...formData,Stress_Score:e.target.value})}
          />


          <input
            type="number"
            placeholder="Sleep Duration (hours)"
            className="border rounded-xl p-3"
            value={formData.Sleep_Duration}
            onChange={(e)=>setFormData({...formData,Sleep_Duration:e.target.value})}
          />


          <select
            className="border rounded-xl p-3"
            value={formData.BP_History}
            onChange={(e)=>setFormData({...formData,BP_History:e.target.value})}
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
            onChange={(e)=>setFormData({...formData,Family_History:e.target.value})}
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
            onChange={(e)=>setFormData({...formData,Smoking_Status:e.target.value})}
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
            onChange={(e)=>setFormData({...formData,Exercise_Level:e.target.value})}
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
            onChange={(e)=>setFormData({...formData,Medication:e.target.value})}
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

          <div className="mt-6 bg-pink-100 text-pink-700 p-4 rounded-xl text-center font-bold">

            {result}

          </div>

        )}


      </div>

    </div>

  );

}

export default HypertensionForm;