
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 30,
    damping: 20
  });

  const infraPath = useTransform(smoothProgress, [0, 1], [0, 1.5]);
  const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 1.2]);
  const bgTextMove = useTransform(smoothProgress, [0, 1], ["0%", "-30%"]);

  return (
    <div ref={containerRef} className="relative bg-white dark:bg-[#050505] text-black dark:text-neutral-100 selection:bg-emerald-500 overflow-hidden transition-colors duration-1000 min-h-[150vh]">
      
      {/* BACKGROUND KINETIC SVG */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <svg className="w-full h-full opacity-[0.05] dark:opacity-[0.1]" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <motion.path
            d="M 100,0 V 1000 M 900,0 V 1000 M 0,300 H 1000 M 0,700 H 1000"
            stroke="currentColor" strokeWidth="0.5" fill="none"
            style={{ pathLength: infraPath }}
          />
          <motion.circle cx="500" cy="500" r="450" stroke="#10b981" strokeWidth="0.5" fill="none" style={{ pathLength: infraPath }} />
        </svg>
      </div>

      {/* HUD OVERLAYS */}
      <div className="fixed inset-0 pointer-events-none z-10">
        <div className="absolute top-[15%] left-[5%] text-[8px] font-black uppercase tracking-[1em] vertical-text opacity-30 dark:text-emerald-500">AUTH_PROTOCOL_V.9</div>
        <div className="absolute bottom-[10%] right-[5%] text-[8px] font-black uppercase tracking-[1em] vertical-text opacity-30 dark:text-emerald-500">ONTOLOGICAL_VERIFICATION_ACTIVE</div>
      </div>

      <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 px-10">
        <motion.div style={{ scale: heroScale }} className="relative z-20 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          
          {/* LEFT CONTENT: PERSISTENCE NARRATIVE */}
          <div className="lg:col-span-6">
            <motion.span 
              initial={{ opacity: 0, letterSpacing: "2em" }}
              animate={{ opacity: 1, letterSpacing: "1em" }}
              transition={{ duration: 1.5 }}
              className="text-[10px] font-black uppercase text-emerald-500 mb-8 block"
            >
              Identity_Validation
            </motion.span>
            <h1 className="text-[10vw] md:text-[8rem] font-black tracking-tighter uppercase leading-[0.7] mb-12 dark:text-white">
              VERIFY <br /> <span className="text-neutral-200 dark:text-neutral-800 italic">PRESENCE.</span>
            </h1>
            <p className="text-2xl text-neutral-400 font-medium leading-tight max-w-md">
              Your access key is more than a credential. It is the logical anchor for your entire compiled sovereignty.
            </p>
            
            <div className="mt-20 grid grid-cols-2 gap-10 opacity-30">
               <div>
                  <div className="text-[9px] font-black uppercase tracking-widest mb-2">Auth_Status</div>
                  <div className="text-2xl font-black italic">Awaiting.</div>
               </div>
               <div>
                  <div className="text-[9px] font-black uppercase tracking-widest mb-2">Sync_Level</div>
                  <div className="text-2xl font-black italic">Lvl_9</div>
               </div>
            </div>
          </div>

          {/* RIGHT CONTENT: LOGIN FORM */}
          <div className="lg:col-span-6 relative">
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="bg-neutral-50 dark:bg-neutral-900/50 backdrop-blur-3xl border border-neutral-100 dark:border-neutral-800 p-16 rounded-[60px] shadow-5xl"
            >
              <div className="mb-12">
                 <h2 className="text-4xl font-black uppercase tracking-tighter mb-4 dark:text-white">Sovereign Entry</h2>
                 <p className="text-neutral-500 text-sm font-bold">Input your derived ontological ID to claim your workspace.</p>
              </div>

              <form className="space-y-10">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500">Derived_ID</label>
                  <input 
                    type="text" 
                    placeholder="Enter Identity Key"
                    className="w-full bg-transparent border-b-2 border-neutral-200 dark:border-neutral-800 py-4 focus:border-emerald-500 outline-none text-2xl font-black tracking-tighter transition-colors"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-400">Secure_Path</label>
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    className="w-full bg-transparent border-b-2 border-neutral-200 dark:border-neutral-800 py-4 focus:border-emerald-500 outline-none text-2xl font-black tracking-tighter transition-colors"
                  />
                </div>

                <div className="flex items-center justify-between pt-10">
                   <Link to="/signup" className="text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:text-emerald-500 transition-colors underline underline-offset-8">Create_Presence</Link>
                   <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-12 py-6 bg-black dark:bg-emerald-500 text-white dark:text-neutral-900 rounded-full font-black text-xl tracking-tighter uppercase shadow-4xl"
                   >
                     Derive Access
                   </motion.button>
                </div>
              </form>
            </motion.div>
            
            {/* Metadata Float */}
            <div className="absolute -bottom-10 -right-10 p-8 bg-neutral-900 text-white rounded-[40px] shadow-3xl rotate-6 pointer-events-none">
               <div className="text-[9px] font-black uppercase tracking-[0.5em] mb-1 text-emerald-500">System_Check</div>
               <div className="text-3xl font-black">STABLE</div>
            </div>
          </div>
        </motion.div>

        {/* PARALLAX BG TYPOGRAPHY */}
        <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 pointer-events-none opacity-[0.03] dark:opacity-[0.07] select-none whitespace-nowrap overflow-hidden">
          <motion.div style={{ x: bgTextMove }} className="text-[40vw] font-black leading-none tracking-tighter italic">IDENTITY</motion.div>
        </div>
      </section>

      {/* BOTTOM SPACING BUFFER */}
      <div className="h-[20vh]" />
    </div>
  );
};

export default Login;
