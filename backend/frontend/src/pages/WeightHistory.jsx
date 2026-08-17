import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import WeightChart from "../components/WeightChart";
import "./WeightHistory.css";

function WeightHistory() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [tracking, setTracking] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) {
      navigate("/login");
      return;
    }

    fetchTracking();
  }, []);

  const fetchTracking = async () => {
    try {
      setLoading(true);

      // Use the dedicated weight-history endpoint
      const response = await API.get(
        `/weight-history/${user.id}`
      );

      const records = Array.isArray(response.data)
        ? response.data
        : [];

      // Sort oldest -> newest
      const sortedRecords = [...records].sort(
        (a, b) => {
          return (
            new Date(a.record_date) -
            new Date(b.record_date)
          );
        }
      );

      setTracking(sortedRecords);

    } catch (error) {
      console.error(
        "Weight History Error:",
        error
      );

      alert("Unable to load weight history");

    } finally {
      setLoading(false);
    }
  };

  // Format YYYY-MM-DD without timezone problems
  const formatDate = (dateString) => {
    if (!dateString) {
      return "N/A";
    }

    const parts = String(dateString).split("-");

    if (parts.length !== 3) {
      return dateString;
    }

    const year = parts[0];
    const month = parts[1];
    const day = parts[2];

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const monthIndex = parseInt(month, 10) - 1;

    if (
      monthIndex < 0 ||
      monthIndex > 11
    ) {
      return dateString;
    }

    return `${day} ${months[monthIndex]} ${year}`;
  };

  return (
    <div className="history-page">

      <div className="history-overlay">

        <div className="history-card">

          <h1>
            🥗 NutriGuardian AI
          </h1>

          <h2>
            📈 Weight History
          </h2>

          {loading ? (

            <div className="history-message">
              Loading weight history...
            </div>

          ) : tracking.length === 0 ? (

            <div className="history-message">

              <p>
                📊 No weight records found.
              </p>

              <button
                className="add-tracking-btn"
                onClick={() =>
                  navigate("/tracking")
                }
              >
                ➕ Add Tracking
              </button>

            </div>

          ) : (

            <>

              {/* ==========================
                  Weight Chart
              ========================== */}

              <div className="chart-box">

                <WeightChart
                  tracking={tracking}
                />

              </div>


              {/* ==========================
                  Weight History Table
              ========================== */}

              <div className="table-container">

                <table>

                  <thead>

                    <tr>
                      <th>Date</th>
                      <th>Weight (kg)</th>
                    </tr>

                  </thead>

                  <tbody>

                    {tracking.map(
                      (item, index) => (

                        <tr
                          key={`${item.record_date}-${index}`}
                        >

                          <td>
                            {formatDate(
                              item.record_date
                            )}
                          </td>

                          <td>
                            {Number(
                              item.weight
                            ).toFixed(1)} kg
                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>

              </div>

            </>

          )}


          {/* ==========================
              Back Button
          ========================== */}

          <button
            className="back-btn"
            onClick={() =>
              navigate("/dashboard")
            }
          >
            ← Back to Dashboard
          </button>

        </div>

      </div>

    </div>
  );
}

export default WeightHistory;