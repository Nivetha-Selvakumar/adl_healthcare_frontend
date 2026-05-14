import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Dashboard from './pages/Dashboard';
import SymptomChecker from './pages/SymptomChecker';
import MedicineReminder from './pages/MedicineReminder';
import EmergencyAssist from './pages/EmergencyAssist';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="symptom-checker" element={<SymptomChecker />} />
          <Route path="medicine-reminder" element={<MedicineReminder />} />
          <Route path="emergency-assist" element={<EmergencyAssist />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
