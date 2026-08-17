import { useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";
import "./Translation.css";

function Translation() {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("Hindi");
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);

  const translateText = async (e) => {
    e.preventDefault();

    if (!text.trim()) {
      return;
    }

    setLoading(true);
    setTranslatedText("");

    try {
      const response = await API.post("/translation/", {
        text: text,
        target_language: language,
      });

      setTranslatedText(response.data.translated_text);
    } catch (error) {
      console.error("Translation Error:", error);

      setTranslatedText(
        "❌ Unable to translate the text. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="translation-layout">

      <Sidebar />

      <div className="translation-container">

        <div className="translation-header">
          <h1>🌐 AI Translation</h1>
          <p>
            Translate nutrition and health information into your preferred
            language.
          </p>
        </div>

        <form
          className="translation-form"
          onSubmit={translateText}
        >

          <label>
            Enter Text
          </label>

          <textarea
            placeholder="Enter nutrition or health text..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows="7"
            required
          />

          <label>
            Select Language
          </label>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="Hindi">Hindi</option>
            <option value="Tamil">Tamil</option>
            <option value="Telugu">Telugu</option>
            <option value="Kannada">Kannada</option>
            <option value="Malayalam">Malayalam</option>
            <option value="Bengali">Bengali</option>
            <option value="Marathi">Marathi</option>
            <option value="Gujarati">Gujarati</option>
            <option value="Punjabi">Punjabi</option>
            <option value="English">English</option>
          </select>

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Translating..." : "Translate"}
          </button>

        </form>

        {translatedText && (
          <div className="translation-result">

            <h2>Translated Text</h2>

            <div className="translated-box">
              {translatedText}
            </div>

          </div>
        )}

      </div>

    </div>
  );
}

export default Translation;