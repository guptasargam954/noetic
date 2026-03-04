
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';

const Signup: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 30,
    damping: 20
  });

  const infraPath = useTransform(smoothProgress, [0, 1], [0, 2]);
  const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 1.15]);
  const bgTextMove = useTransform(smoothProgress, [0, 1], ["0%", "-40%"]);

  return (
    <div ref={containerRef} className="relative bg-white dark:bg-[#050505] text-black dark:text-neutral-100 selection:bg-emerald-500 overflow-hidden transition-colors duration-1000 min-h-[160vh]">
      
      {/* BACKGROUND KINETIC SVG */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <svg className="w-full h-full opacity-[0.05] dark:opacity-[0.1]" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <motion.path
            d="M 50,0 V 1000 M 950,0 V 1000 M 0,200 H 1000 M 0,800 H 1000"
            stroke="currentColor" strokeWidth="0.5" fill="none"
            style={{ pathLength: infraPath }}
          />
          <motion.circle cx="500" cy="500" r="480" stroke="#10b981" strokeWidth="0.5" fill="none" style={{ pathLength: infraPath }} />
          <motion.path d="M 0,500 Q 500,0 1000,500" stroke="#10b981" strokeWidth="1" fill="none" opacity="0.3" style={{ pathLength: infraPath }} />
        </svg>
      </div>

      {/* HUD OVERLAYS */}
      <div className="fixed inset-0 pointer-events-none z-10">
        <div className="absolute top-[12%] left-[4%] text-[9px] font-black uppercase tracking-[1.5em] vertical-text opacity-30 dark:text-emerald-500">INSTANTIATION_PROTOCOL</div>
        <div className="absolute bottom-[8%] right-[4%] text-[9px] font-black uppercase tracking-[1.5em] vertical-text opacity-30 dark:text-emerald-500">DERIVE_EXISTENCE_INIT</div>
      </div>

      <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 px-10">
        <motion.div style={{ scale: heroScale }} className="relative z-20 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          
          {/* LEFT CONTENT: INSTANTIATION NARRATIVE */}
          <div className="lg:col-span-5">
            <motion.span 
              initial={{ opacity: 0, letterSpacing: "2em" }}
              animate={{ opacity: 1, letterSpacing: "1em" }}
              transition={{ duration: 1.5 }}
              className="text-[10px] font-black uppercase text-emerald-500 mb-8 block"
            >
              Presence_Derivation
            </motion.span>
            <h1 className="text-[10vw] md:text-[8rem] font-black tracking-tighter uppercase leading-[0.7] mb-12 dark:text-white">
              INSTAN- <br /> TIATE <br /> <span className="text-neutral-200 dark:text-neutral-800 italic">BEING.</span>
            </h1>
            <p className="text-2xl text-neutral-400 font-medium leading-tight max-w-md">
              The first axiom of your universe is yourself. Instantiate your profile to begin the derivation of your domain.
            </p>
            
            <div className="mt-20 flex flex-col gap-8 opacity-40">
               <div className="flex items-center gap-6">
                  <div className="w-10 h-10 rounded-full border border-emerald-500 flex items-center justify-center text-[10px] font-black">01</div>
                  <span className="text-sm font-bold uppercase tracking-widest">Define Ontological Identity</span>
               </div>
               <div className="flex items-center gap-6">
                  <div className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center text-[10px] font-black">02</div>
                  <span className="text-sm font-bold uppercase tracking-widest">Derive Sovereign Axes</span>
               </div>
            </div>
          </div>

          {/* RIGHT CONTENT: SIGNUP FORM */}
          <div className="lg:col-span-7 relative">
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="bg-neutral-50 dark:bg-neutral-900/50 backdrop-blur-3xl border border-neutral-100 dark:border-neutral-800 p-16 rounded-[80px] shadow-5xl"
            >
              <div className="mb-12">
                 <h2 className="text-4xl font-black uppercase tracking-tighter mb-4 dark:text-white">New Instantiation</h2>
                 <p className="text-neutral-500 text-sm font-bold">Secure your place in the Council. Complete your initial derivation.</p>
              </div>

              <form className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500">FullName_Axis</label>
                  <input 
                    type="text" 
                    placeholder="Identify Yourself"
                    className="w-full bg-transparent border-b-2 border-neutral-200 dark:border-neutral-800 py-4 focus:border-emerald-500 outline-none text-xl font-black tracking-tighter transition-colors"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-400">Communication_Sync</label>
                  <input 
                    type="email" 
                    placeholder="Email Protocol"
                    className="w-full bg-transparent border-b-2 border-neutral-200 dark:border-neutral-800 py-4 focus:border-emerald-500 outline-none text-xl font-black tracking-tighter transition-colors"
                  />
                </div>
                <div className="space-y-4 md:col-span-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-400">Secure_Path_Derivation</label>
                  <input 
                    type="password" 
                    placeholder="Enter Secret Key"
                    className="w-full bg-transparent border-b-2 border-neutral-200 dark:border-neutral-800 py-4 focus:border-emerald-500 outline-none text-xl font-black tracking-tighter transition-colors"
                  />
                </div>

                <div className="md:col-span-2 flex items-center justify-between pt-10">
                   <Link to="/login" className="text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:text-emerald-500 transition-colors underline underline-offset-8">Already_Instantiated?</Link>
                   <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-16 py-8 bg-black dark:bg-emerald-500 text-white dark:text-neutral-900 rounded-full font-black text-2xl tracking-tighter uppercase shadow-5xl"
                   >
                     Instantiate Presence
                   </motion.button>
                </div>
              </form>
            </motion.div>
            
            {/* Background HUD Detail */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-neutral-100 dark:border-neutral-900 rounded-full pointer-events-none opacity-5 animate-pulse" />
          </div>
        </motion.div>

        {/* PARALLAX BG TYPOGRAPHY */}
        <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 pointer-events-none opacity-[0.03] dark:opacity-[0.07] select-none whitespace-nowrap overflow-hidden">
          <motion.div style={{ x: bgTextMove }} className="text-[40vw] font-black leading-none tracking-tighter italic">SOVEREIGN</motion.div>
        </div>
      </section>

      {/* BOTTOM SPACING BUFFER */}
      <div className="h-[20vh]" />
    </div>
  );
};

export default Signup;
