import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { SchedulerProvider } from './context/SchedulerContext';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ResultsPage from './pages/ResultsPage';
import GanttPage from './pages/GanttPage';
import ComplexityPage from './pages/ComplexityPage';
import ComparisonPage from './pages/ComparisonPage';
import ExtrasPage from './pages/ExtrasPage';
import TracePage from './pages/TracePage';
import SettingsPage from './pages/SettingsPage';

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-bg-light text-ink flex">
      <Navigation />
      <main className="flex-1 ml-0 md:ml-64 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/gantt" element={<GanttPage />} />
            <Route path="/complexity" element={<ComplexityPage />} />
            <Route path="/comparison" element={<ComparisonPage />} />
            <Route path="/extras" element={<ExtrasPage />} />
            <Route path="/trace" element={<TracePage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <SchedulerProvider>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/*"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </SchedulerProvider>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
