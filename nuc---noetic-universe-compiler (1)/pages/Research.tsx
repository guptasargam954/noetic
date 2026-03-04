
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';

const Research: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // High-precision scroll tracking for fluid animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 35,
    damping: 20,
    restDelta: 0.001
  });

  // Parallax and transformation mappings
  const bgTextMove = useTransform(smoothProgress, [0, 1], ["0%", "-40%"]);
  const revTextMove = useTransform(smoothProgress, [0, 1], ["-20%", "20%"]);
  const infraPath = useTransform(smoothProgress, [0, 1], [0, 2]);
  const heroScale = useTransform(smoothProgress, [0, 0.15], [1, 1.15]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);
  const floatingY = useTransform(smoothProgress, [0, 1], [0, -1200]);

  return (
    <div ref={containerRef} className="relative bg-white dark:bg-[#050505] text-black dark:text-neutral-100 selection:bg-emerald-500 overflow-hidden transition-colors duration-1000 min-h-[1000vh]">
      
      {/* 1. ARCHIVAL INFRASTRUCTURE LAYER (SVG BACKGROUND) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <svg className="w-full h-full opacity-[0.05] dark:opacity-[0.12]" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <motion.path
            d="M 50,0 V 1000 M 950,0 V 1000 M 0,200 H 1000 M 0,800 H 1000"
            stroke="currentColor" strokeWidth="0.5" fill="none"
            style={{ pathLength: infraPath, willChange: "path-length" }}
          />
          <motion.circle 
            cx="500" cy="500" r="480" 
            stroke="#10b981" strokeWidth="0.5" fill="none"
            style={{ pathLength: infraPath, willChange: "path-length" }}
          />
          <motion.path
            d="M 0,500 Q 500,0 1000,500 T 0,500"
            stroke="#10b981" strokeWidth="1" fill="none" opacity="0.4"
            style={{ pathLength: infraPath, willChange: "path-length" }}
          />
        </svg>
      </div>

      {/* 2. HUD DATA OVERLAY */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        <motion.div 
          style={{ y: floatingY, willChange: "transform" }}
          className="absolute top-[12%] left-[4%] text-[9px] font-black uppercase tracking-[1.5em] vertical-text opacity-30 dark:text-emerald-500"
        >
          INTEL_NODE_ARCHIVE_9
        </motion.div>
        <motion.div 
          style={{ y: useTransform(smoothProgress, [0, 1], [1500, 0]), willChange: "transform" }}
          className="absolute bottom-[8%] right-[4%] text-[9px] font-black uppercase tracking-[1.5em] vertical-text opacity-30 dark:text-emerald-500"
        >
          TRUTH_DERIVATION_ACTIVE
        </motion.div>
        <div className="absolute top-[25%] left-[18%] w-px h-[70vh] bg-neutral-100 dark:bg-neutral-900 opacity-50" />
      </div>

      {/* 3. HERO SECTION: THE RESEARCH CORE */}
      <section className="relative h-screen flex flex-col items-center justify-center px-10 overflow-hidden">
        <motion.div style={{ scale: heroScale, opacity: heroOpacity, willChange: "transform, opacity" }} className="relative z-20 text-center">
          <motion.span 
            initial={{ opacity: 0, letterSpacing: "3em" }}
            animate={{ opacity: 1, letterSpacing: "1em" }}
            transition={{ duration: 2, ease: "circOut" }}
            className="text-[11px] font-black uppercase text-emerald-500 mb-14 block"
          >
            Axiomatic_Investigation
          </motion.span>
          <h1 className="text-[14vw] md:text-[12rem] font-black tracking-[-0.1em] leading-[0.65] uppercase mb-16 dark:text-white">
            DEEP <br /> 
            <span className="text-neutral-200 dark:text-neutral-800">TRUTH.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl md:text-2xl font-bold tracking-tight text-neutral-500 dark:text-neutral-400 leading-tight">
            Our researchers don't study worlds. They build the equations that allow worlds to exist with absolute consistency.
          </p>
        </motion.div>

        {/* PARALLAX BG TYPOGRAPHY */}
        <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 pointer-events-none opacity-[0.04] dark:opacity-[0.1] select-none whitespace-nowrap">
          <motion.div style={{ x: bgTextMove, willChange: "transform" }} className="text-[38vw] font-black leading-none tracking-tighter">ARCHIVE</motion.div>
          <motion.div style={{ x: revTextMove, willChange: "transform" }} className="text-[38vw] font-black leading-none tracking-tighter italic text-emerald-500">KNOWLEDGE</motion.div>
        </div>
      </section>

      {/* 4. ASYMMETRIC RESEARCH GRID */}
      <section className="relative px-8 md:px-24 py-40 max-w-[2400px] mx-auto">
        
        {/* ROW 1: THE FOUNDATIONAL INQUIRY */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-96 items-start">
          <div className="md:col-span-8 relative z-20">
            <ResearchInsight 
              number="01"
              label="CORE_STUDY"
              title="THE PERSISTENCE CONSTANT"
              desc="We have identified the exact threshold where an idea becomes a persistent reality. Our research into 'Causal Rigidity' ensures that your compiled universe remains stable regardless of observer fluctuations."
            />
          </div>
          <div className="md:col-span-4 mt-20 relative">
             <motion.div 
               initial={{ x: 80, opacity: 0 }}
               whileInView={{ x: 0, opacity: 1 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
               className="aspect-[3/4] bg-neutral-100 dark:bg-neutral-900 rounded-[100px] overflow-hidden shadow-4xl group"
             >
                <img src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1200" loading="lazy" className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[3000ms]" />
             </motion.div>
             <div className="absolute -top-10 -right-10 p-12 bg-emerald-500 text-white rounded-[60px] shadow-3xl rotate-12 z-30">
                <span className="text-[10px] font-black uppercase tracking-widest mb-2 block">Stability_Rating</span>
                <div className="text-5xl font-black">99.9%</div>
             </div>
          </div>
        </div>

        {/* NEW SECTION: OBSERVER THEORY VISUALIZATION */}
        <div className="my-96 relative min-h-screen">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
            <div className="lg:col-span-5 z-20">
               <span className="text-emerald-500 font-black text-[10px] uppercase tracking-[1em] mb-12 block">Theory_In_Action</span>
               <h2 className="text-7xl md:text-8xl font-black tracking-tighter uppercase leading-[0.8] mb-12 dark:text-white">THE <br /> <span className="text-neutral-200 dark:text-neutral-800">OBSERVER</span> <br /> COLLAPSE.</h2>
               <p className="text-2xl text-neutral-400 font-medium leading-tight mb-16 max-w-lg">
                 Observation is not a passive act. It is the catalyst that forces a probability field into a definitive commercial state. Our engines track trillions of observer points to maintain the integrity of your domain.
               </p>
               <div className="space-y-8">
                 <div className="flex items-center gap-6">
                    <div className="w-4 h-4 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-sm font-black uppercase tracking-widest">Active_Trigger_Sync</span>
                 </div>
                 <div className="p-8 border-l-4 border-emerald-500 bg-neutral-50 dark:bg-neutral-900/40 rounded-r-3xl">
                    <p className="text-sm font-bold text-neutral-500 italic">"The universe exists because we have decided it should. We provide the mathematical proof for that decision."</p>
                 </div>
               </div>
            </div>
            
            <div className="lg:col-span-7 h-[700px] relative">
               <ObserverConstellation />
               
               {/* Metadata floating badges around the constellation */}
               <motion.div 
                 animate={{ y: [0, -20, 0] }}
                 transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                 className="absolute top-20 right-20 p-6 bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl shadow-xl z-20"
               >
                  <div className="text-[8px] font-black uppercase text-emerald-500 mb-1">NODE_HEALTH</div>
                  <div className="text-xl font-black">STABLE</div>
               </motion.div>

               <motion.div 
                 animate={{ y: [0, 20, 0] }}
                 transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                 className="absolute bottom-40 left-10 p-6 bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl shadow-xl z-20"
               >
                  <div className="text-[8px] font-black uppercase text-neutral-400 mb-1">CAUSAL_LINKS</div>
                  <div className="text-xl font-black">1.8M/sec</div>
               </motion.div>
            </div>
          </div>
        </div>

        {/* DATA BLOCK: REAL-TIME VERIFICATION */}
        <div className="max-w-7xl mx-auto py-80 text-center relative border-y border-neutral-100 dark:border-neutral-900">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-neutral-100 dark:bg-neutral-900 opacity-30" />
           <span className="text-emerald-500 font-black text-[11px] uppercase tracking-[1.5em] mb-16 block relative z-10">Verification_Mesh</span>
           <h2 className="text-8xl md:text-[10rem] font-black tracking-tighter uppercase leading-[0.7] mb-20 relative z-10">
              TRUTH IS <br /> 
              <span className="text-neutral-200 dark:text-neutral-800">NOT A</span> <br /> 
              VARIABLE.
           </h2>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-left pt-20 relative z-10">
              <StatPoint label="OBSERVATIONS" val="1.42B" />
              <StatPoint label="AXIOM_NODES" val="8.4M" color="emerald" />
              <StatPoint label="SYNC_LATENCY" val="0.00MS" />
              <StatPoint label="RELIABILITY" val="MAX" color="emerald" />
           </div>
        </div>

        {/* ROW 2: OBSERVER THEORY (MOSAIC) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 my-96 items-center">
          <div className="md:col-span-6 relative order-2 md:order-1">
             <div className="grid grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <motion.div 
                    key={i} 
                    whileInView={{ opacity: [0, 1], scale: [0.9, 1] }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: i * 0.1, duration: 1 }}
                    className="aspect-square bg-neutral-100 dark:bg-neutral-900 rounded-[50px] overflow-hidden grayscale hover:grayscale-0 transition-all shadow-2xl"
                  >
                     <img src={`https://picsum.photos/seed/res_mos_${i}/800/800`} loading="lazy" className="w-full h-full object-cover" />
                  </motion.div>
                ))}
             </div>
             <div className="absolute -bottom-20 -left-20 text-[240px] font-black text-outline opacity-5 select-none pointer-events-none vertical-text">EVIDENCE</div>
          </div>
          <div className="md:col-span-6 order-1 md:order-2 text-right relative z-20">
            <ResearchInsight 
              number="02"
              label="OBSERVER_LAB"
              title="THE PERSISTENT GAZE"
              align="right"
              desc="How does an empty void become a world? Our team has mastered the 'Observer Bridge'—the logical conduit that transforms your brand intent into physical laws that govern gravity, light, and interaction within your domain."
            />
            <div className="mt-20 flex justify-end gap-10">
               <motion.button 
                  whileHover={{ scale: 1.05 }}
                  className="px-16 py-7 bg-black dark:bg-emerald-500 text-white dark:text-neutral-900 rounded-full font-black text-xs uppercase tracking-[0.3em] transition-all shadow-4xl"
               >
                  Access Paper
               </motion.button>
               <motion.button 
                  whileHover={{ scale: 1.05 }}
                  className="px-16 py-7 border-4 border-black dark:border-white text-black dark:text-white rounded-full font-black text-xs uppercase tracking-[0.3em] transition-all"
               >
                  Methodology
               </motion.button>
            </div>
          </div>
        </div>

        {/* SCROLL MANIFESTO: DENSE TYPOGRAPHY */}
        <div className="py-96 max-w-7xl mx-auto px-10 relative">
           <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
           <ManifestoHighlight text="Our research Council operates at the intersection of deep mathematics and aesthetic sovereignty. We believe that a world without rigor is a world without soul. Every pixel in your universe is anchored by a logical proof, ensuring that your vision is not just a dream, but a definitive, unbreakable fact of existence." />
        </div>

        {/* STATISTICS LANDSCAPE */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-1 py-40 border-y border-neutral-100 dark:border-neutral-900">
           <MetricTile label="FIELD_HOURS" val="2.4M" />
           <MetricTile label="PEER_NODES" val="12,000" color="emerald" />
           <MetricTile label="LOGIC_DEPTH" val="INF" />
           <MetricTile label="TRUTH_SYNC" val="0.00" color="emerald" />
        </div>

        {/* GALLERY OF INTELLIGENCE: NO EMPTY SPACE */}
        <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-8 gap-1 pt-60">
           {[...Array(24)].map((_, i) => (
             <GalleryNode key={i} index={i} />
           ))}
        </div>

        {/* CALL TO INVESTIGATION */}
        <div className="py-96 bg-neutral-900 dark:bg-black rounded-[160px] relative overflow-hidden px-12 transition-colors duration-1000 mt-96">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
              <div className="lg:col-span-8">
                 <span className="text-emerald-500 font-black text-[11px] uppercase tracking-[1.8em] mb-16 block">Archives_Now_Open</span>
                 <h2 className="text-[10vw] md:text-[9rem] font-black text-white leading-[0.75] tracking-tighter uppercase mb-16">
                    PROVE <br /> <span className="text-neutral-600">THE</span> <br /> <span className="italic">UNTHINKABLE.</span>
                 </h2>
                 <p className="text-2xl text-neutral-400 font-medium max-w-2xl leading-relaxed">
                    Join the ranks of architects who demand more than just visual fidelity. Access the full archive of Axiomatic Proofs and begin your transition into a definitive reality today.
                 </p>
              </div>
              <div className="lg:col-span-4 flex flex-col items-end gap-12">
                 <motion.button 
                   whileHover={{ scale: 1.05, rotate: -1 }}
                   className="w-full py-14 bg-white text-black rounded-full font-black text-4xl tracking-tighter uppercase hover:bg-emerald-500 transition-colors shadow-5xl"
                 >
                    Get Access
                 </motion.button>
                 <div className="w-full p-12 bg-white/5 border border-white/10 rounded-[70px] backdrop-blur-3xl text-right">
                    <div className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-8">System Integrity</div>
                    <div className="text-7xl font-black text-white tracking-tighter uppercase italic leading-none">Vigilant.</div>
                 </div>
              </div>
           </div>
           
           {/* Metadata Footer */}
           <div className="mt-80 grid grid-cols-2 md:grid-cols-6 gap-10 opacity-20 text-white font-mono text-[9px] uppercase tracking-[0.7em] border-t border-white/10 pt-12">
              <div>SIG: RESEARCH_V9</div>
              <div>LOC: CORE_MESH</div>
              <div>SYNC: VERIFIED</div>
              <div>AUTH: SOVEREIGN</div>
              <div>ENTROPY: 0.00%</div>
              <div>REALITY: ON</div>
           </div>
        </div>

      </section>

      {/* FOOTER SPACING BUFFER */}
      <div className="h-[25vh] bg-white dark:bg-[#050505] transition-colors duration-1000" />

    </div>
  );
};

// --- SUBCOMPONENTS ---

/**
 * Animated data points and connecting lines for Observer Theory
 */
const ObserverConstellation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const pathLength = useSpring(useTransform(scrollYProgress, [0.2, 0.8], [0, 1]), {
    stiffness: 40,
    damping: 20
  });

  const nodes = [
    { x: 100, y: 150, id: 'A', label: 'NODE_ALPHA' },
    { x: 300, y: 400, id: 'B', label: 'NODE_BETA' },
    { x: 550, y: 100, id: 'C', label: 'NODE_GAMMA' },
    { x: 700, y: 450, id: 'D', label: 'NODE_DELTA' },
    { x: 200, y: 600, id: 'E', label: 'NODE_EPSILON' },
    { x: 800, y: 200, id: 'F', label: 'NODE_ZETA' },
  ];

  const connections = [
    { from: 0, to: 1 },
    { from: 1, to: 2 },
    { from: 2, to: 5 },
    { from: 1, to: 4 },
    { from: 3, to: 5 },
    { from: 0, to: 2 },
    { from: 4, to: 3 },
  ];

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-visible">
      <svg className="w-full h-full" viewBox="0 0 900 700">
        {/* Connection Lines */}
        {connections.map((conn, i) => (
          <motion.line
            key={i}
            x1={nodes[conn.from].x}
            y1={nodes[conn.from].y}
            x2={nodes[conn.to].x}
            y2={nodes[conn.to].y}
            stroke="#10b981"
            strokeWidth="0.5"
            strokeDasharray="4 4"
            style={{ pathLength, opacity: 0.3 }}
          />
        ))}

        {/* Solid Pulsing Lines */}
        {connections.slice(0, 4).map((conn, i) => (
          <motion.line
            key={`solid-${i}`}
            x1={nodes[conn.from].x}
            y1={nodes[conn.from].y}
            x2={nodes[conn.to].x}
            y2={nodes[conn.to].y}
            stroke="#10b981"
            strokeWidth="1.5"
            style={{ pathLength, opacity: 0.6 }}
          />
        ))}

        {/* Nodes */}
        {nodes.map((node, i) => (
          <g key={node.id}>
             <motion.circle
               cx={node.x}
               cy={node.y}
               r="4"
               fill="#10b981"
               initial={{ scale: 0 }}
               whileInView={{ scale: 1 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1, duration: 0.5 }}
             />
             <motion.circle
               cx={node.x}
               cy={node.y}
               r="12"
               stroke="#10b981"
               strokeWidth="0.5"
               fill="none"
               animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0.1, 0.3] }}
               transition={{ repeat: Infinity, duration: 3 + i, ease: "easeInOut" }}
             />
             <text 
               x={node.x + 15} 
               y={node.y + 5} 
               className="text-[8px] font-black fill-neutral-400 dark:fill-neutral-600 uppercase tracking-widest pointer-events-none select-none"
             >
               {node.label}
             </text>
          </g>
        ))}
      </svg>
      
      {/* Background grid lines for archival feel */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] dark:opacity-[0.1] border border-neutral-200 dark:border-neutral-800" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
    </div>
  );
};

const ResearchInsight: React.FC<{ number: string, label: string, title: string, desc: string, align?: 'left'|'right' }> = ({ number, label, title, desc, align='left' }) => (
  <motion.div 
    initial={{ y: 100, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    className={align === 'right' ? 'text-right' : 'text-left'}
  >
    <div className={`flex items-center gap-10 mb-14 ${align === 'right' ? 'flex-row-reverse' : ''}`}>
       <span className="text-[16vw] font-black text-neutral-100 dark:text-neutral-900 leading-none italic select-none">{number}</span>
       <div className="h-px flex-grow bg-neutral-100 dark:bg-neutral-900" />
       <span className="text-[11px] font-black uppercase tracking-[1em] text-emerald-500">{label}</span>
    </div>
    <h3 className="text-8xl md:text-[9rem] font-black tracking-tighter uppercase leading-[0.75] mb-14 dark:text-white">
       {title.split(' ').map((word, i) => (
         <span key={i} className={i % 2 === 1 ? 'text-neutral-200 dark:text-neutral-800' : ''}>{word} </span>
       ))}
    </h3>
    <p className={`text-3xl text-neutral-400 font-medium leading-tight tracking-tight max-w-2xl ${align === 'right' ? 'ml-auto' : ''}`}>
      {desc}
    </p>
  </motion.div>
);

const StatPoint: React.FC<{ label: string, val: string, color?: string }> = ({ label, val, color }) => (
  <div className="text-left border-l-2 border-emerald-500 pl-10 py-3">
    <div className={`text-[11px] font-black uppercase tracking-widest mb-3 ${color === 'emerald' ? 'text-emerald-500' : 'text-neutral-400'}`}>{label}</div>
    <div className="text-6xl font-black text-black dark:text-white tracking-tighter uppercase">{val}</div>
  </div>
);

const MetricTile: React.FC<{ label: string, val: string, color?: string }> = ({ label, val, color }) => (
  <div className={`p-20 flex flex-col justify-center border border-neutral-50 dark:border-neutral-900 ${color === 'emerald' ? 'bg-emerald-500/5' : ''}`}>
     <div className={`text-[11px] font-black uppercase tracking-[0.6em] mb-8 ${color === 'emerald' ? 'text-emerald-500' : 'text-neutral-400'}`}>{label}</div>
     <div className="text-8xl font-black text-black dark:text-white tracking-tighter leading-none">{val}</div>
  </div>
);

const ManifestoHighlight: React.FC<{ text: string }> = ({ text }) => {
  const words = text.split(" ");
  return (
    <div className="flex flex-wrap justify-center gap-x-8 gap-y-6 text-[6.5vw] font-black uppercase leading-[0.8] tracking-tighter text-center">
      {words.map((word, i) => (
        <HighlightWord key={i} word={word} />
      ))}
    </div>
  );
};

const HighlightWord: React.FC<{ word: string }> = ({ word }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.8 });
  return (
    <motion.span 
      ref={ref}
      animate={{ 
        color: isInView ? "#10b981" : "#1a1a1a",
        opacity: isInView ? 1 : 0.1,
        scale: isInView ? 1 : 0.98
      }}
      className="transition-all duration-700 cursor-default"
    >
      {word}
    </motion.span>
  );
};

const GalleryNode: React.FC<{ index: number }> = ({ index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });
  return (
    <motion.div 
      ref={ref}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{ duration: 1, delay: (index % 8) * 0.04 }}
      className={`aspect-square bg-neutral-100 dark:bg-neutral-900 relative overflow-hidden group grayscale hover:grayscale-0 transition-all cursor-crosshair ${index % 12 === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
    >
       <img src={`https://picsum.photos/seed/res_gal_${index}/900/900`} loading="lazy" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-[2500ms]" />
       <div className="absolute inset-0 bg-emerald-500/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-10">
          <span className="text-white font-black text-[10px] uppercase tracking-widest mb-2">ARCH_NODE_{index+500}</span>
          <h4 className="text-3xl font-black text-white italic leading-none">Verified_Data.</h4>
       </div>
    </motion.div>
  );
};

export default Research;
