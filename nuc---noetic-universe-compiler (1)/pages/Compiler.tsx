import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useNUCStore } from '../stores/useNUCStore';
import { nucApi } from '../services/api';

const Compiler: React.FC = () => {
  const navigate = useNavigate();
  const { addExperiment } = useNUCStore();
  const [axioms, setAxioms] = useState({
    gravity: 50,
    entropy: 50,
    causalSpeed: 50
  });
  const [logs, setLogs] = useState<string[]>([]);
  const [compiling, setCompiling] = useState(false);

  const startCompile = async () => {
    setCompiling(true);
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Initializing ontological stack...`]);

    try {
      const response = await nucApi.createExperiment({
        name: `LAB_EXP_${Math.floor(Math.random() * 1000)}`,
        axioms: { ...axioms, type: 'LAB_EXPERIMENT' },
        metric_symbolic: [
          [`-(1 + ${axioms.gravity / 100})`, "0", "0", "0"],
          ["0", "1", "0", "0"],
          ["0", "0", "1", "0"],
          ["0", "0", "0", "1"]
        ],
        coordinates: "t x y z"
      });

      addExperiment({
        job_id: response.job_id,
        name: `LAB_${response.job_id.slice(0, 4)}`,
        status: 'QUEUED',
        axioms: axioms
      });

      const steps = [
        "Verifying epistemic consistency...",
        "Binding Axiom A-1: Identity constant active",
        "Building causality graph...",
        `Job dispatched: ${response.job_id}`,
        "Monitoring background computation...",
        "Universe metadata registered in Realms."
      ];

      steps.forEach((step, i) => {
        setTimeout(() => {
          setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${step}`]);
          if (i === steps.length - 1) {
            setCompiling(false);
            // Redirect to Realms after a short delay
            setTimeout(() => navigate('/realms'), 1500);
          }
        }, (i + 1) * 600);
      });
    } catch (error) {
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] CRITICAL ERROR: API connection failed.`]);
      setCompiling(false);
    }
  };

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div>
          <h1 className="text-5xl font-extrabold mb-8">Compiler <span className="text-emerald-500 italic">Lab</span></h1>
          <p className="text-lg text-neutral-500 mb-12 leading-relaxed">
            Upload your first principles here. The NUC engine will simulate the interactions of your axioms to see if a stable reality can emerge.
          </p>

          <div className="space-y-6 mb-12">
            <div className="p-8 bg-white border border-neutral-100 rounded-3xl shadow-sm">
              <h3 className="font-bold text-lg mb-4">Axiomatic Configuration</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-50">
                  <span className="text-neutral-500 text-sm font-medium">Gravity Constant</span>
                  <input
                    type="range"
                    className="accent-emerald-500"
                    value={axioms.gravity}
                    onChange={(e) => setAxioms(prev => ({ ...prev, gravity: parseInt(e.target.value) }))}
                  />
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-50">
                  <span className="text-neutral-500 text-sm font-medium">Entropy Slope</span>
                  <input
                    type="range"
                    className="accent-emerald-500"
                    value={axioms.entropy}
                    onChange={(e) => setAxioms(prev => ({ ...prev, entropy: parseInt(e.target.value) }))}
                  />
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-50">
                  <span className="text-neutral-500 text-sm font-medium">Causal Speed</span>
                  <input
                    type="range"
                    className="accent-emerald-500"
                    value={axioms.causalSpeed}
                    onChange={(e) => setAxioms(prev => ({ ...prev, causalSpeed: parseInt(e.target.value) }))}
                  />
                </div>
              </div>
            </div>
            <button
              onClick={startCompile}
              disabled={compiling}
              className={`w-full py-5 rounded-full font-black text-xl transition-all ${compiling ? 'bg-neutral-200 cursor-not-allowed' : 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-xl shadow-emerald-200'}`}
            >
              {compiling ? 'Compiling Reality...' : 'COMPILE UNIVERSE'}
            </button>
          </div>
        </div>

        <div className="bg-neutral-900 rounded-[40px] p-10 font-mono text-sm shadow-2xl overflow-hidden relative min-h-[500px]">
          <div className="flex gap-2 mb-6">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="text-emerald-400 opacity-80 h-[400px] overflow-y-auto space-y-2 custom-scrollbar">
            {logs.length === 0 && <span className="text-neutral-700 animate-pulse">Waiting for input stream...</span>}
            {logs.map((log, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="leading-relaxed"
              >
                {log}
              </motion.div>
            ))}
          </div>
          {compiling && (
            <div className="absolute bottom-10 right-10 flex gap-1">
              {[0, 1, 2].map(i => (
                <div key={i} className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: `${i * 0.1}s` }} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Compiler;
