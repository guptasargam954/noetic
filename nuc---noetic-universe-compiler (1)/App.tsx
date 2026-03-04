import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Home from './pages/Home';
import Solutions from './pages/Solutions';
import Axioms from './pages/Axioms';
import Research from './pages/Research';
import Documentation from './pages/Documentation';
import Pricing from './pages/Pricing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Realms from './pages/Realms';
import Compiler from './pages/Compiler';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useNUCStore } from './stores/useNUCStore';
import { nucApi } from './services/api';

const App: React.FC = () => {
  const { experiments, updateExperiment } = useNUCStore();
  const [notification, setNotification] = React.useState<string | null>(null);

  useEffect(() => {
    const pollInterval = setInterval(async () => {
      const pendingJobs = experiments.filter(e => e.status === 'QUEUED' || e.status === 'PROCESSING');
      for (const job of pendingJobs) {
        try {
          const statusUpdate = await nucApi.getExperimentStatus(job.job_id);
          if (statusUpdate.status !== job.status) {
            updateExperiment(job.job_id, {
              status: statusUpdate.status,
              result: statusUpdate.result
            });
            if (statusUpdate.status === 'COMPLETED') {
              setNotification(`Universe Compiled: ${job.name}`);
              setTimeout(() => setNotification(null), 5000);
            }
          }
        } catch (error) {
          console.error(`Polling failed for ${job.job_id}`, error);
        }
      }
    }, 3000);
    return () => clearInterval(pollInterval);
  }, [experiments, updateExperiment]);

  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-white dark:bg-[#050505]">
        <Navbar />
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/platform" element={<Axioms />} />
              <Route path="/compiler" element={<Compiler />} />
              <Route path="/realms" element={<Realms />} />
              <Route path="/solutions" element={<Solutions />} />
              <Route path="/research" element={<Research />} />
              <Route path="/docs" element={<Documentation />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </AnimatePresence>
        </main>

        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="fixed bottom-10 right-10 z-[1000] px-8 py-4 bg-emerald-500 text-white font-black uppercase text-[10px] tracking-widest rounded-full shadow-2xl flex items-center gap-4"
            >
              <div className="w-2 h-2 bg-white rounded-full animate-ping" />
              {notification}
            </motion.div>
          )}
        </AnimatePresence>

        <Footer />
      </div>
    </Router>
  );
};

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default App;
