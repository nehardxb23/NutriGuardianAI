import { useState } from "react";
import API from "../services/api";

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

        // hidden values for model
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


    } catch(error) {

      console.log(error);
      setResult("Prediction Failed");

    }

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
          placeholder="Water Intake (1-3)"
          className="border rounded-xl p-3"
          value={formData.CH2O}
          onChange={(e)=>setFormData({...formData,CH2O:e.target.value})}
          />


          <input
          type="number"
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

          <div className="mt-6 bg-pink-100 p-4 rounded-xl text-center font-bold">

            {result}

          </div>

        )}


      </div>

    </div>

  );

}

export default ObesityForm;