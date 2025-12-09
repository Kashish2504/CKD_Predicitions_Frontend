import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Home/Home";
import Dashboard from "./Dashboard/Dashboard";
import InputForm from "./InputForm/InputForm";
import PredictionResultPage from "./ResultPage/ResultPage";
import UserProfilePage from "./SettingsPage/UserProfilePage";
import AuthPage from "./LoginSignUp/AuthPage";
import HistoryPage from "./History/HistoryPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/inputform" element={<InputForm />} />
        <Route path="/result" element={<PredictionResultPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;