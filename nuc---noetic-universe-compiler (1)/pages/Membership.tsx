
import React from 'react';
import { motion } from 'framer-motion';

const Membership: React.FC = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-40 pb-40 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-40">
          <h1 className="text-[10vw] font-black tracking-tighter leading-none mb-12">THE <br /> PRIVILEGE.</h1>
          <p className="text-2xl text-neutral-400 max-w-2xl mx-auto font-medium tracking-tight leading-tight">Access is granted only to those with the vision to wield true creative sovereignty.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {['Pioneer', 'Founder', 'Council'].map((tier, i) => (
            <div key={tier} className={`p-16 rounded-[80px] flex flex-col transition-all duration-700 ${i === 1 ? 'bg-neutral-900 text-white shadow-3xl scale-105 z-10' : 'bg-neutral-50 text-neutral-900 border border-neutral-100 hover:bg-white hover:shadow-2xl'}`}>
               <div className="mb-12">
                  <span className={`text-[10px] font-black uppercase tracking-widest mb-6 block ${i === 1 ? 'text-emerald-500' : 'text-neutral-300'}`}>Tier 0{i+1}</span>
                  <h3 className="text-6xl font-black tracking-tighter">{tier}.</h3>
               </div>
               <p className={`text-lg font-medium mb-12 flex-grow ${i === 1 ? 'text-neutral-400' : 'text-neutral-500'}`}>
                  {i === 0 && "Essential foundations for solo architects and visionaries beginning their first reality."}
                  {i === 1 && "Advanced infrastructure for studios and professional world-builders requiring high persistence."}
                  {i === 2 && "The ultimate echelon. Planetary scale, bespoke law derivation, and full institutional support."}
               </p>
               <div className="mb-12">
                  <div className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-40">Annual Access</div>
                  <div className="text-5xl font-black tracking-tighter">{i === 2 ? "Inquire" : `₹${((i+1)*400000).toLocaleString('en-IN')}`}</div>
               </div>
               <button className={`w-full py-6 rounded-full font-black text-xs uppercase tracking-[0.2em] transition-all ${i === 1 ? 'bg-emerald-500 text-white shadow-xl hover:bg-emerald-400' : 'bg-neutral-900 text-white hover:bg-neutral-800'}`}>
                  {i === 2 ? "Request Consultation" : "Select Invitation"}
               </button>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Membership;
