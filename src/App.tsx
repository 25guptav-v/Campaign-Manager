import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { DashboardLayout } from './components/layout/DashboardLayout';

import { LandingPage } from './pages/LandingPage';
import { RegisterPage } from './pages/RegisterPage';
import { SuccessPage } from './pages/SuccessPage';
import { DashboardOverview } from './pages/DashboardOverview';
import { DashboardRegistrations } from './pages/DashboardRegistrations';
import { DashboardChannels } from './pages/DashboardChannels';
import { DashboardPlanner } from './pages/DashboardPlanner';
import { DashboardBudget } from './pages/DashboardBudget';
import { DashboardAIDecisions } from './pages/DashboardAIDecisions';
import { DashboardCopilot } from './pages/DashboardCopilot';
import { PresentationPage } from './pages/PresentationPage';
import { GrowthPlanReportPage } from './pages/GrowthPlanReportPage';

export function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-navy-950 text-slate-100 transition-colors duration-200">
          <Navbar />
          <div className="flex-1">
            <Routes>
              {/* Public Student-Facing Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/success" element={<SuccessPage />} />

              {/* Campaign Manager Dashboard Sub-Routes */}
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<DashboardOverview />} />
                <Route path="registrations" element={<DashboardRegistrations />} />
                <Route path="channels" element={<DashboardChannels />} />
                <Route path="target-model" element={<DashboardChannels />} />
                <Route path="planner" element={<DashboardPlanner />} />
                <Route path="budget" element={<DashboardBudget />} />
                <Route path="copilot" element={<DashboardCopilot />} />
                <Route path="ai-decisions" element={<DashboardAIDecisions />} />
              </Route>

              {/* Interview & Presentation Deliverables */}
              <Route path="/presentation" element={<PresentationPage />} />
              <Route path="/growth-plan" element={<GrowthPlanReportPage />} />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
