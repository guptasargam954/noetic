
import React from 'react';
import { motion } from 'framer-motion';

const Vision: React.FC = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-40 pb-40 bg-neutral-900 text-white">
      <div className="max-w-5xl mx-auto px-8">
        <div className="text-center mb-40">
          <h1 className="text-8xl font-black tracking-tighter mb-20 leading-[0.85]">OUR <br /> <span className="text-emerald-500 italic">MANIFESTO.</span></h1>
          <div className="w-32 h-1 bg-emerald-500 mx-auto rounded-full" />
        </div>

        <div className="space-y-32 text-4xl text-neutral-400 font-medium leading-tight">
          <p className="text-white">We believe the digital age has been too shallow. Flat screens and fleeting clicks are not enough.</p>
          <p>The next era of human civilization will be built in the <span className="text-emerald-400 italic underline underline-offset-8 decoration-white/20">Noetic Space</span>—a collaborative, persistent layer where imagination is physical law.</p>
          <p>NUC is the foundation of that era. We provide the stability, the persistence, and the causal integrity required for humans to live, work, and dream in worlds of their own making.</p>
        </div>

        <div className="mt-60 grid grid-cols-1 md:grid-cols-2 gap-20">
           <div className="p-16 rounded-[60px] bg-white/5 border border-white/10">
              <h4 className="text-2xl font-black mb-8">Absolute Persistence.</h4>
              <p className="text-lg text-neutral-500">Your compiled reality does not reset. It evolves. Even in your absence, the clock ticks and the laws you defined continue to govern.</p>
           </div>
           <div className="p-16 rounded-[60px] bg-white/5 border border-white/10">
              <h4 className="text-2xl font-black mb-8">Unified Access.</h4>
              <p className="text-lg text-neutral-500">A universal protocol for reality entry. Any device, any time, any portal. The entrance to your world is everywhere.</p>
           </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Vision;
