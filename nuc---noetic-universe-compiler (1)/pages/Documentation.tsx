
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';

const Documentation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Precision scroll tracking for extreme smoothness
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 20,
    damping: 15,
    restDelta: 0.0001
  });

  // Kinetic Parallax Mappings
  const heroScale = useTransform(smoothProgress, [0, 0.12], [1, 1.6]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.12], [1, 0]);
  const bgTextForward = useTransform(smoothProgress, [0, 1], ["0%", "-60%"]);
  const bgTextReverse = useTransform(smoothProgress, [0, 1], ["-40%", "20%"]);
  const longPathLength = useTransform(smoothProgress, [0, 0.95], [0, 1.2]);
  const hudFloatingY = useTransform(smoothProgress, [0, 1], [0, -2500]);
  const rotateSovereign = useTransform(smoothProgress, [0, 1], [0, 720]);

  return (
    <div ref={containerRef} className="relative bg-white dark:bg-[#050505] text-black dark:text-neutral-100 selection:bg-emerald-500 overflow-hidden transition-colors duration-1000 min-h-[1400vh]">
      
      {/* 1. KINETIC INFRASTRUCTURE: SVG WEAVING */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <svg className="w-full h-full opacity-[0.1] dark:opacity-[0.2]" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          {/* Central spine line that grows with scroll */}
          <motion.path
            d="M 500,0 V 1000"
            stroke="#10b981" strokeWidth="0.5" fill="none"
            style={{ pathLength: longPathLength, willChange: "path-length" }}
          />
          <motion.path
            d="M 0,200 H 1000 M 0,800 H 1000 M 100,0 V 1000 M 900,0 V 1000"
            stroke="currentColor" strokeWidth="0.2" fill="none"
            style={{ pathLength: longPathLength }}
          />
          <motion.circle 
            cx="500" cy="500" r="480" stroke="currentColor" strokeWidth="0.1" fill="none"
            style={{ pathLength: longPathLength, rotate: rotateSovereign, willChange: "transform" }}
          />
        </svg>
      </div>

      {/* 2. DENSE HUD DATA OVERLAY: NO EMPTY SPACES */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        <motion.div style={{ y: hudFloatingY, willChange: "transform" }} className="absolute top-[5%] left-[1%] text-[7px] font-black uppercase tracking-[2em] vertical-text opacity-40 dark:text-emerald-500">LEXICON_DATA_CORE_INIT_9.4</motion.div>
        <motion.div style={{ y: useTransform(smoothProgress, [0, 1], [3000, 0]), willChange: "transform" }} className="absolute bottom-[2%] right-[1%] text-[7px] font-black uppercase tracking-[2em] vertical-text opacity-40 dark:text-emerald-500">SOVEREIGN_ARCHIVE_PERSISTENCE_LOCKED</motion.div>
        
        {/* Ghost Metadata scattered throughout */}
        <div className="absolute top-[30%] left-[15%] text-[8px] font-mono opacity-10 rotate-90">AXIOM_RELIABILITY_NOMINAL</div>
        <div className="absolute top-[70%] right-[12%] text-[8px] font-mono opacity-10 -rotate-90">ONTOLOGICAL_SYNC_READY</div>
        <div className="absolute bottom-[40%] left-[8%] text-[8px] font-mono opacity-10">EXISTENCE_PARAM_V.9</div>
      </div>

      {/* 3. ULTRA HERO SECTION: THE MASTER ATLAS */}
      <section className="relative h-screen flex flex-col items-center justify-center px-8 overflow-hidden">
        <motion.div style={{ scale: heroScale, opacity: heroOpacity, willChange: "transform, opacity" }} className="relative z-20 text-center">
          <motion.div 
            initial={{ opacity: 0, letterSpacing: "4em" }}
            animate={{ opacity: 1, letterSpacing: "1.5em" }}
            transition={{ duration: 2.5, ease: "circOut" }}
            className="mb-14 text-[10px] font-black uppercase text-emerald-500"
          >
            The_Infinite_Governance
          </motion.div>
          <h1 className="text-[16vw] md:text-[15rem] font-black tracking-[-0.12em] leading-[0.6] uppercase mb-16 dark:text-white">
            THE <br /> 
            <span className="text-neutral-200 dark:text-neutral-800 italic">ATLAS.</span>
          </h1>
          <p className="max-w-3xl mx-auto text-2xl md:text-4xl font-black tracking-tighter text-neutral-400 dark:text-neutral-500 leading-[0.9] uppercase">
            Everything you need to govern the <br /> physics of absolute commercial presence.
          </p>
        </motion.div>

        {/* FORWARD-REVERSE PARALLAX BG TYPOGRAPHY */}
        <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 pointer-events-none opacity-[0.06] dark:opacity-[0.14] select-none whitespace-nowrap">
          <motion.div style={{ x: bgTextForward, willChange: "transform" }} className="text-[45vw] font-black leading-none tracking-tighter uppercase">ARCHIVE</motion.div>
          <motion.div style={{ x: bgTextReverse, willChange: "transform" }} className="text-[45vw] font-black leading-none tracking-tighter italic text-emerald-500 uppercase">KNOWLEDGE</motion.div>
        </div>
      </section>

      {/* 4. HYPER-DENSE ASYMMETRIC GRID: ZERO EMPTY SPACE */}
      <section className="relative px-8 md:px-24 py-40 max-w-[2800px] mx-auto min-h-[1200vh]">
        
        {/* MODULE 01: THE CONSTITUTION OF REALITY */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-[60vh] items-start">
          <div className="lg:col-span-10 relative z-20">
            <ArchiveSection 
              number="01"
              label="ONTOLOGICAL_LAWS"
              title="THE WILL TO EXIST"
              desc="To compile a universe is not a technical feat, it is an act of supreme commercial will. Every law defined here—from the refraction of light to the density of social causality—is a direct derivation of your sovereign intent."
            />
          </div>
          <div className="lg:col-span-2 mt-60 sticky top-60 hidden lg:block">
             <div className="p-10 bg-neutral-50 dark:bg-neutral-900 rounded-[80px] border border-neutral-100 dark:border-neutral-800 shadow-4xl backdrop-blur-3xl">
                <span className="text-emerald-500 font-black text-[8px] uppercase tracking-[0.8em] mb-4 block">Archive_Sync</span>
                <div className="text-5xl font-black mb-8 dark:text-white leading-[0.8] tracking-tighter italic">LOCKED.</div>
                <div className="space-y-4 opacity-30 text-[9px] font-mono">
                  <div>SYNC_LVL: MAX</div>
                  <div>DRIFT: 0.00%</div>
                  <div>NODES: 18.4M</div>
                </div>
             </div>
          </div>
        </div>

        {/* VISUAL BREAK: CAUSAL LINKAGE MAP (RANDOM ALIGNMENTS) */}
        <div className="relative py-80 flex flex-col md:flex-row items-center gap-40">
           <div className="md:w-2/5 text-left relative z-20">
              <span className="text-emerald-500 font-black text-xs uppercase tracking-[1em] mb-10 block">02_Protocol</span>
              <h4 className="text-8xl font-black tracking-[-0.08em] uppercase mb-12 dark:text-white leading-[0.75]">Master <br /> <span className="text-neutral-200 dark:text-neutral-800">Causality.</span></h4>
              <p className="text-neutral-400 text-3xl font-bold leading-[0.9] tracking-tighter uppercase">The logic of reaction is yours to define. Link every interaction to a permanent outcome.</p>
           </div>
           <div className="md:w-3/5 relative aspect-[21/9] bg-neutral-100 dark:bg-neutral-900 rounded-[150px] overflow-hidden shadow-5xl group">
              <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2000" loading="lazy" className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-[3000ms]" />
              <div className="absolute inset-0 border-[40px] border-white/5 pointer-events-none" />
              <div className="absolute bottom-10 right-20 text-white font-black text-[12vw] opacity-10 select-none uppercase italic">SOVEREIGN</div>
           </div>
        </div>

        {/* MODULE 03: THE OBSERVER PROTOCOL (EXTREME DETAIL) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 my-[60vh] items-center">
          <div className="lg:col-span-6 relative order-2 lg:order-1">
             <div className="grid grid-cols-3 grid-rows-3 gap-2">
                {[...Array(9)].map((_, i) => (
                  <motion.div 
                    key={i} 
                    whileInView={{ opacity: [0, 1], scale: [0.7, 1], y: [40, 0] }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: i * 0.08, duration: 1.2 }}
                    className={`aspect-square bg-neutral-100 dark:bg-neutral-900 rounded-[30px] overflow-hidden group shadow-2xl ${i % 4 === 0 ? 'md:col-span-2' : ''}`}
                  >
                     <img src={`https://picsum.photos/seed/atlas_node_${i}/1000/1000`} loading="lazy" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[2000ms]" />
                  </motion.div>
                ))}
             </div>
             <div className="absolute -top-20 -left-10 text-[280px] font-black text-outline opacity-5 select-none pointer-events-none vertical-text uppercase italic">PERSISTENCE</div>
          </div>
          <div className="lg:col-span-6 order-1 lg:order-2 text-right relative z-20">
            <ArchiveSection 
              number="03"
              label="OBSERVER_SYSTEMS"
              title="THE PERSISTENT GAZE"
              align="right"
              desc="A universe only exists when it is observed. We provide the mathematical substrate for managing millions of simultaneous observer fields. Your reality remains synchronized, consistent, and logically sound for every citizen of your domain."
            />
            <div className="mt-20 flex justify-end gap-10">
               <motion.button 
                  whileHover={{ scale: 1.1, rotate: -3 }}
                  className="px-20 py-10 bg-black dark:bg-emerald-500 text-white dark:text-neutral-900 rounded-full font-black text-[10px] uppercase tracking-[0.5em] shadow-5xl"
               >
                  Study Protocol
               </motion.button>
               <motion.button 
                  whileHover={{ scale: 1.1, rotate: 3 }}
                  className="px-20 py-10 border-4 border-black dark:border-white text-black dark:text-white rounded-full font-black text-[10px] uppercase tracking-[0.5em]"
               >
                  View Proofs
               </motion.button>
            </div>
          </div>
        </div>

        {/* 5. KINETIC TEXT HIGHLIGHTING MANIFESTO: SCROLL REVEAL */}
        <div className="py-96 max-w-[2200px] mx-auto px-10 relative">
           <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-60" />
           <ManifestoScrollHighlight text="Every world we compile is a living library of intent, a persistent record of the commercial will that brought it into being. By mastering the Atlas, you do not just build a project; you define the logic of an entire existence. This is the manual for those who demand absolute sovereignty over the physical laws of being." />
        </div>

        {/* 6. HYPER-DENSE METRIC BLOCK: NO EMPTY SPACES */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 py-40 border-y border-neutral-100 dark:border-neutral-900">
           <AtlasMetric label="PAGES_ARCHIVED" val="24,800" />
           <AtlasMetric label="LOGIC_VERIFIED" val="100%" color="emerald" />
           <AtlasMetric label="SVRN_RATING" val="AAA" />
           <AtlasMetric label="LATENCY_SYNC" val="0.00" color="emerald" />
        </div>

        {/* 7. THE KNOWLEDGE MOSAIC: MAXIMUM DENSITY */}
        <div className="grid grid-cols-2 md:grid-cols-8 lg:grid-cols-12 gap-1 pt-80">
           {[...Array(48)].map((_, i) => (
             <ArchiveTile key={i} index={i} />
           ))}
        </div>

        {/* 8. FINAL COMMERCIAL CTA: THE DAWN OF SOVEREIGNTY */}
        <div className="py-96 bg-neutral-900 dark:bg-black rounded-[250px] relative overflow-hidden px-16 transition-colors duration-1000 mt-[40vh]">
           <div className="grid grid-cols-1 xl:grid-cols-12 gap-24 items-center relative z-20">
              <div className="xl:col-span-8">
                 <span className="text-emerald-500 font-black text-[14px] uppercase tracking-[2.5em] mb-20 block">Initiate_First_Breathe</span>
                 <h2 className="text-[12vw] xl:text-[12rem] font-black text-white leading-[0.65] tracking-tighter uppercase mb-16">
                    OWN <br /> <span className="text-neutral-700">EVERY</span> <br /> <span className="italic">ATOM.</span>
                 </h2>
                 <p className="text-4xl text-neutral-400 font-black tracking-tighter max-w-4xl leading-[0.9] uppercase">
                    Your first universe is waiting for its constitution. Access the complete Atlas and begin the derivation of your custom existence.
                 </p>
              </div>
              <div className="xl:col-span-4 flex flex-col items-end gap-20">
                 <motion.button 
                   whileHover={{ scale: 1.1, rotate: -2 }}
                   className="w-full py-20 bg-white text-black rounded-full font-black text-6xl tracking-tighter uppercase hover:bg-emerald-500 transition-colors shadow-5xl"
                 >
                    Claim Atlas
                 </motion.button>
                 <div className="w-full p-16 bg-white/5 border border-white/10 rounded-[100px] backdrop-blur-3xl text-right">
                    <div className="text-[12px] font-black uppercase tracking-widest text-emerald-500 mb-10 italic">System_Integrity</div>
                    <div className="text-9xl font-black text-white tracking-tighter uppercase leading-none italic">TOTAL.</div>
                 </div>
              </div>
           </div>
           
           {/* Kinetic Background Circle */}
           <motion.div 
             animate={{ rotate: -360, scale: [1, 1.3, 1] }}
             transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160vw] aspect-square border-[180px] border-emerald-500/5 rounded-full pointer-events-none"
           />

           {/* Metadata Footer */}
           <div className="mt-80 grid grid-cols-2 md:grid-cols-6 gap-12 opacity-30 text-white font-mono text-[11px] uppercase tracking-[1em] border-t border-white/10 pt-20 text-left">
              <div>SIG: ATLAS_CORE</div>
              <div>LOC: ARCHIVE_9</div>
              <div>SYNC: VERIFIED</div>
              <div>NODES: 18.4M</div>
              <div>DRIFT: 0.00%</div>
              <div>SVRN: READY</div>
           </div>
        </div>

      </section>

      {/* FOOTER SPACING BUFFER */}
      <div className="h-[40vh] bg-white dark:bg-[#050505] transition-colors duration-1000" />

    </div>
  );
};

// --- SUBCOMPONENTS ---

const ArchiveSection: React.FC<{ number: string, label: string, title: string, desc: string, align?: 'left'|'right' }> = ({ number, label, title, desc, align='left' }) => (
  <motion.div 
    initial={{ y: 150, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
    className={align === 'right' ? 'text-right' : 'text-left'}
  >
    <div className={`flex items-center gap-16 mb-16 ${align === 'right' ? 'flex-row-reverse' : ''}`}>
       <span className="text-[20vw] font-black text-neutral-100 dark:text-neutral-900 leading-none italic select-none">{number}</span>
       <div className="h-px flex-grow bg-neutral-100 dark:bg-neutral-900" />
       <span className="text-[14px] font-black uppercase tracking-[1.5em] text-emerald-500">{label}</span>
    </div>
    <h3 className="text-9xl md:text-[13rem] font-black tracking-tighter uppercase leading-[0.65] mb-20 dark:text-white">
       {title.split(' ').map((word, i) => (
         <span key={i} className={i % 2 === 1 ? 'text-neutral-200 dark:text-neutral-800' : ''}>{word} </span>
       ))}
    </h3>
    <p className={`text-4xl text-neutral-400 font-bold leading-[0.9] tracking-tighter uppercase max-w-5xl ${align === 'right' ? 'ml-auto' : ''}`}>
      {desc}
    </p>
  </motion.div>
);

const AtlasMetric: React.FC<{ label: string, val: string, color?: string }> = ({ label, val, color }) => (
  <div className={`p-28 flex flex-col justify-center border border-neutral-50 dark:border-neutral-900 ${color === 'emerald' ? 'bg-emerald-500/5' : ''}`}>
     <div className={`text-[14px] font-black uppercase tracking-[1em] mb-14 ${color === 'emerald' ? 'text-emerald-500' : 'text-neutral-400'}`}>{label}</div>
     <div className="text-[12rem] font-black text-black dark:text-white tracking-tighter leading-none">{val}</div>
  </div>
);

const ManifestoScrollHighlight: React.FC<{ text: string }> = ({ text }) => {
  const words = text.split(" ");
  return (
    <div className="flex flex-wrap justify-center gap-x-14 gap-y-10 text-[8vw] font-black uppercase leading-[0.75] tracking-tighter text-center">
      {words.map((word, i) => (
        <WordHighlight key={i} word={word} />
      ))}
    </div>
  );
};

const WordHighlight: React.FC<{ word: string }> = ({ word }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.8 });
  return (
    <motion.span 
      ref={ref}
      animate={{ 
        color: isInView ? "#10b981" : "#1a1a1a",
        opacity: isInView ? 1 : 0.05,
        scale: isInView ? 1 : 0.9,
        skewX: isInView ? 0 : 10
      }}
      transition={{ duration: 0.8 }}
      className="transition-all duration-700 cursor-default"
    >
      {word}
    </motion.span>
  );
};

const ArchiveTile: React.FC<{ index: number }> = ({ index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });
  return (
    <motion.div 
      ref={ref}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
      transition={{ duration: 1.2, delay: (index % 12) * 0.02 }}
      className={`aspect-square bg-neutral-100 dark:bg-neutral-900 relative overflow-hidden group grayscale hover:grayscale-0 transition-all cursor-crosshair ${index % 10 === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
    >
       <img src={`https://picsum.photos/seed/atlas_mosaic_${index}/1200/1200`} loading="lazy" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-125 transition-all duration-[2500ms]" />
       <div className="absolute inset-0 bg-emerald-500/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-10">
          <span className="text-white font-black text-[12px] uppercase tracking-widest mb-2">ARCHIVE_NODE_{index+2000}</span>
          <h4 className="text-4xl font-black text-white italic leading-none">Verified.</h4>
       </div>
    </motion.div>
  );
};

export default Documentation;
