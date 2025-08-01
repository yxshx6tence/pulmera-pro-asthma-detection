import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import TestResults from './components/TestResults';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import LearnPage from './components/LearnPage';
import TeamPage from './components/TeamPage';
import FeedbackPage from './components/FeedbackPage';

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/result" element={<TestResults />} /> {/* <-- fixed route */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
