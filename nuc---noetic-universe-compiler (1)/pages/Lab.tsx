
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Lab: React.FC = () => {
  const [stage, setStage] = useState(0);

  const stages = [
    { name: "Inception", d: "The seed of thought. Define the core intent of your existence sphere.", img: "https://picsum.photos/seed/inc1/1200/1200" },
    { name: "Framework", d: "Stabilize the environment. The causal glue that ensures permanence.", img: "https://picsum.photos/seed/inc2/1200/1200" },
    { name: "Instantiation", d: "Final reality collapse. The world becomes persistent and habitable.", img: "https://picsum.photos/seed/inc3/1200/1200" }
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-40 pb-40 px-8 bg-white min-h-screen">
      <div className="max-w-[1800px] mx-auto flex flex-col lg:flex-row gap-40 items-center">
        <div className="flex-1">
          <span className="text-emerald-500 font-black text-xs uppercase tracking-[0.4em] mb-12 block">Creation Process</span>
          <h1 className="text-[8vw] font-black tracking-tighter leading-none mb-20">THREE <br /> STAGES OF <br /> <span className="text-neutral-200">EXISTENCE.</span></h1>
          
          <div className="space-y-6">
            {stages.map((s, i) => (
              <div 
                key={i} onClick={() => setStage(i)}
                className={`p-10 rounded-[50px] cursor-pointer transition-all duration-500 ${stage === i ? 'bg-neutral-900 text-white shadow-3xl' : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-400'}`}
              >
                <div className="flex items-center gap-8">
                  <span className="text-3xl font-black">0{i+1}.</span>
                  <h3 className="text-4xl font-black tracking-tight">{s.name}</h3>
                </div>
                {stage === i && (
                  <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="mt-8 text-neutral-400 text-lg font-medium leading-relaxed">
                    {s.d}
                  </motion.p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 aspect-square rounded-[100px] overflow-hidden bg-neutral-900 shadow-3xl relative">
           <AnimatePresence mode="wait">
             <motion.img 
               key={stage}
               initial={{ opacity: 0, scale: 1.1, rotate: 2 }}
               animate={{ opacity: 0.7, scale: 1, rotate: 0 }}
               exit={{ opacity: 0, scale: 0.9 }}
               transition={{ duration: 1.5, ease: "anticipate" }}
               src={stages[stage].img}
               className="w-full h-full object-cover grayscale"
             />
           </AnimatePresence>
           <div className="absolute inset-0 flex items-center justify-center p-20 pointer-events-none">
              <div className="w-full h-full border border-white/10 rounded-[60px] flex items-center justify-center">
                 <div className="text-white text-[12px] font-black uppercase tracking-[1.5em] animate-pulse">Synthesizing_Reality</div>
              </div>
           </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Lab;
