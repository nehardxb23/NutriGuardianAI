import { useState } from "react";
import DiabetesForm from "../components/DiabetesForm";
import HeartForm from "../components/HeartForm";
import ObesityForm from "../components/ObesityForm";
import HypertensionForm from "../components/HypertensionForm";
import DiseaseCard from "../components/DiseaseCard";

function DiseasePrediction() {

  const [showDiabetes, setShowDiabetes] = useState(false);
  const [showHeartForm, setShowHeartForm] = useState(false);
  
  const [showHypertensionForm, setShowHypertensionForm] = useState(false);
  const [showObesityForm, setShowObesityForm] = useState(false);
  return (

    <div className="px-8 py-10">

      <h1 className="text-4xl font-bold text-gray-800 text-center">
        Disease Risk Assessment
      </h1>

      <p className="text-center text-gray-500 mt-3">
        AI-powered disease prediction using machine learning
      </p>

      <div className="grid md:grid-cols-2 gap-8 mt-10">

        <DiseaseCard
          title="Diabetes Prediction"
          icon="🩸"
          description="Predict diabetes risk using health parameters."
          buttonText="Open Form"
          onClick={() => setShowDiabetes(true)}
        />

        <DiseaseCard
          title="Heart Disease Prediction"
          icon="❤️"
          description="Analyze heart health risk."
          buttonText="Open Form"
          onClick={() => setShowHeartForm(true)}
        />

        <DiseaseCard
          title="Hypertension Prediction"
          icon="💓"
          description="Check blood pressure related risk."
          buttonText="Open Form"
          onClick={() => setShowHypertensionForm(true)}
        />

        <DiseaseCard
  title="Obesity Prediction"
  icon="⚖️"
  description="Predict obesity level using lifestyle data."
  buttonText="Open Form"
  onClick={() => setShowObesityForm(true)}
/>

      </div>

      {showDiabetes && (
        <DiabetesForm
          onClose={() => setShowDiabetes(false)}
        />
      )}

      {showHeartForm && (
        <HeartForm
          onClose={() => setShowHeartForm(false)}
        />
      )}

      {showHypertensionForm && (
        <HypertensionForm
          onClose={() => setShowHypertensionForm(false)}
        />
      )}

      {showObesityForm && (
  <ObesityForm
    onClose={() => setShowObesityForm(false)}
  />
)}

    </div>

  );
}

export default DiseasePrediction;