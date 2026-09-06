import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import AddTracking from "./pages/AddTracking";
import WeightHistory from "./pages/WeightHistory";
import CaloriesHistory from "./pages/CaloriesHistory";
import Sustainability from "./pages/Sustainability";
import AIChat from "./pages/AIChat";
import DietPlanner from "./pages/DietPlanner";
import Translation from "./pages/Translation";
import Agent from "./pages/Agent";
import ChatHistory from "./pages/ChatHistory";
import DiseasePrediction from "./pages/DiseasePrediction";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =========================
            Public Routes
        ========================= */}

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />


        {/* =========================
            Protected Routes
        ========================= */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tracking"
          element={
            <ProtectedRoute>
              <AddTracking />
            </ProtectedRoute>
          }
        />

        <Route
          path="/weight-history"
          element={
            <ProtectedRoute>
              <WeightHistory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/calories-history"
          element={
            <ProtectedRoute>
              <CaloriesHistory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/sustainability"
          element={
            <ProtectedRoute>
              <Sustainability />
            </ProtectedRoute>
          }
        />

        {/* AI Chat */}
        <Route
          path="/ai-chat"
          element={
            <ProtectedRoute>
              <AIChat />
            </ProtectedRoute>
          }
        />

        {/* AI Diet Planner */}
        <Route
          path="/diet-planner"
          element={
            <ProtectedRoute>
              <DietPlanner />
            </ProtectedRoute>
          }
        />

        {/* AI Translation */}
        <Route
          path="/translation"
          element={
            <ProtectedRoute>
              <Translation />
            </ProtectedRoute>
          }
        />
        <Route
  path="/agent"
  element={
    <ProtectedRoute>
      <Agent />
    </ProtectedRoute>
  }
/>
<Route
  path="/chat-history"
  element={
    <ProtectedRoute>
      <ChatHistory />
    </ProtectedRoute>
  }
/>

<Route
  path="/disease-prediction"
  element={
    <ProtectedRoute>
      <DiseasePrediction />
    </ProtectedRoute>
  }
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;