
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';

const Solutions: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Tracking scroll for advanced parallax and path animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 20,
    restDelta: 0.001
  });

  // Background transformation values
  const bgTextMove = useTransform(smoothProgress, [0, 1], ["0%", "-40%"]);
  const revTextMove = useTransform(smoothProgress, [0, 1], ["-20%", "20%"]);
  const infraPathLength = useTransform(smoothProgress, [0, 0.8], [0, 1.5]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.1], [1, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.1], [1, 1.15]);
  const rotationRotate = useTransform(smoothProgress, [0, 1], [0, 180]);

  return (
    <div ref={containerRef} className="relative bg-white dark:bg-[#050505] text-black dark:text-neutral-100 selection:bg-emerald-500 overflow-hidden transition-colors duration-1000">
      
      {/* 1. KINETIC INFRASTRUCTURE LAYER (SVG Background) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <svg className="w-full h-full opacity-[0.04] dark:opacity-[0.1]" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <motion.path
            d="M 0,100 L 1000,100 M 0,900 L 1000,900 M 100,0 L 100,1000 M 900,0 L 900,1000"
            stroke="currentColor" strokeWidth="0.5" fill="none"
            style={{ pathLength: infraPathLength, willChange: "path-length" }}
          />
          <motion.circle 
            cx="500" cy="500" r="480" 
            stroke="#10b981" strokeWidth="0.5" fill="none"
            style={{ pathLength: infraPathLength, rotate: rotationRotate, willChange: "path-length, transform" }}
          />
          <motion.path
            d="M 0,500 C 250,250 750,750 1000,500"
            stroke="#10b981" strokeWidth="1" fill="none"
            style={{ pathLength: infraPathLength, willChange: "path-length" }}
          />
        </svg>
      </div>

      {/* 2. FLOATING HUD DECORATION */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        <motion.div 
          style={{ y: useTransform(smoothProgress, [0, 1], [0, -1000]), willChange: "transform" }}
          className="absolute top-[15%] left-[2%] text-[9px] font-black uppercase tracking-[1em] vertical-text opacity-20 dark:text-emerald-500"
        >
          GLOBAL_SOVEREIGNTY_ACTIVE
        </motion.div>
        <motion.div 
          style={{ y: useTransform(smoothProgress, [0, 1], [1000, 0]), willChange: "transform" }}
          className="absolute bottom-[10%] right-[3%] text-[9px] font-black uppercase tracking-[1em] vertical-text opacity-20 dark:text-emerald-500"
        >
          UNIVERSE_COMPILATION_V9.4
        </motion.div>
      </div>

      {/* 3. HERO SECTION: COMMERCIAL SOVEREIGNTY (REFINED SIZING) */}
      <section className="relative h-screen flex flex-col items-center justify-center px-10 text-center overflow-hidden">
        <motion.div style={{ opacity: heroOpacity, scale: heroScale, willChange: "transform, opacity" }} className="relative z-20">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-10 py-3 rounded-full border border-neutral-100 dark:border-neutral-800 text-[10px] font-black uppercase tracking-[0.8em] text-emerald-500 mb-12 backdrop-blur-xl"
          >
            ENTERPRISE_READY
          </motion.span>
          
          <h1 className="text-[10vw] md:text-[8rem] font-black leading-[0.85] tracking-[-0.08em] uppercase mb-12">
            CHOOSE <br /> 
            <span className="text-neutral-200 dark:text-neutral-800">YOUR</span> <br /> 
            <span className="italic">REALITY.</span>
          </h1>
          
          <p className="max-w-xl mx-auto text-xl md:text-2xl font-bold tracking-tight text-neutral-500 dark:text-neutral-400 leading-relaxed">
            We don't just provide services. We compile entire domains of existence where your brand is the fundamental law of nature.
          </p>
        </motion.div>

        {/* PARALLAX BG TYPOGRAPHY (Forward/Reverse) */}
        <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 pointer-events-none opacity-[0.03] dark:opacity-[0.08] select-none whitespace-nowrap">
          <motion.div style={{ x: bgTextMove, willChange: "transform" }} className="text-[25vw] font-black leading-none tracking-tighter">SOLUTIONS</motion.div>
          <motion.div style={{ x: revTextMove, willChange: "transform" }} className="text-[25vw] font-black leading-none tracking-tighter italic text-emerald-500">LEGACY_BUILT</motion.div>
        </div>
      </section>

      {/* 4. DENSE ASYMMETRIC GRID: No Empty Spaces */}
      <section className="relative px-8 md:px-20 py-40 max-w-[2400px] mx-auto min-h-[600vh]">
        
        {/* BLOCK A: Retail Sovereignty */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-80 items-center">
          <div className="md:col-span-7 relative z-20">
            <SolutionBlock 
              number="01"
              category="RETAIL"
              title="THE INFINITE STOREFRONT"
              desc="Forget static websites. We build living brand dimensions where every floor, every light, and every interaction is a direct reflection of your customer's deepest desires. It's not shopping; it's a pilgrimage into your world."
            />
          </div>
          <div className="md:col-span-5 relative">
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="aspect-[4/5] bg-neutral-100 dark:bg-neutral-900 rounded-[120px] overflow-hidden shadow-3xl"
            >
              <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200" loading="lazy" className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-[2000ms]" />
            </motion.div>
            <div className="absolute -bottom-10 -left-10 p-8 bg-emerald-500 text-white rounded-[50px] shadow-2xl rotate-[-5deg] z-30">
               <span className="text-[9px] font-black uppercase tracking-widest mb-1 block">Conversion_Sync</span>
               <div className="text-3xl font-black">+842% Impact</div>
            </div>
          </div>
        </div>

        {/* BLOCK B: Enterprise Nexus */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-80 items-center">
          <div className="md:col-span-5 relative order-2 md:order-1">
             <motion.div 
               whileInView={{ x: [-50, 0], opacity: [0, 1] }}
               viewport={{ once: true, margin: "-100px" }}
               className="aspect-square bg-neutral-100 dark:bg-neutral-900 rounded-full overflow-hidden shadow-3xl flex items-center justify-center p-1"
             >
                <div className="w-full h-full rounded-full border-[10px] border-emerald-500/20 overflow-hidden">
                   <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200" loading="lazy" className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 transition-all duration-[2000ms]" />
                </div>
             </motion.div>
             <div className="absolute top-0 -right-20 text-[180px] font-black text-outline opacity-10 select-none pointer-events-none vertical-text">NEXUS</div>
          </div>
          <div className="md:col-span-7 order-1 md:order-2 text-right relative z-20">
            <SolutionBlock 
              number="02"
              category="ENTERPRISE"
              title="THE GLOBAL NEXUS"
              align="right"
              desc="Distance is a parameter we have solved. Our enterprise hubs provide your global team with a synchronized spatial reality. Collaborative work is no longer fragmented; it is unified, persistent, and evolves in real-time."
            />
            <div className="mt-16 flex justify-end gap-10">
               <DataBadge label="SYNC_RATE" val="99.99%" />
               <DataBadge label="DRIFT" val="0.00MS" />
            </div>
          </div>
        </div>

        {/* BLOCK C: Entertainment Realms */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-80 items-start">
           <div className="md:col-span-8 relative">
              <SolutionBlock 
                number="03"
                category="ENTERTAINMENT"
                title="LIVABLE NARRATIVES"
                desc="Transform your Intellectual Property into a persistent world. Give your fans a key to the kingdom. They don't just watch your story; they live within it, evolve with it, and protect it forever."
              />
              <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
                 {[...Array(4)].map((_, i) => (
                   <motion.div 
                     key={i} 
                     whileHover={{ y: -20, scale: 1.05 }}
                     className="aspect-[3/4] bg-neutral-100 dark:bg-neutral-900 rounded-[40px] overflow-hidden grayscale hover:grayscale-0 transition-all shadow-xl"
                   >
                      <img src={`https://picsum.photos/seed/sol_ent_${i}/600/800`} loading="lazy" className="w-full h-full object-cover" />
                   </motion.div>
                 ))}
              </div>
           </div>
           <div className="md:col-span-4 relative md:sticky md:top-40 mt-20 md:mt-0">
              <div className="p-12 bg-neutral-50 dark:bg-neutral-900 rounded-[80px] border border-neutral-100 dark:border-neutral-800 shadow-2xl overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-bl-full group-hover:bg-emerald-500/20 transition-colors" />
                 <h4 className="text-3xl font-black mb-8 dark:text-white uppercase leading-tight">Persistent <br /> Audience <br /> Sync.</h4>
                 <p className="text-neutral-500 dark:text-neutral-400 mb-10 text-lg leading-snug">Our engagement nodes ensure your world remains active even when the observer is away.</p>
                 <button className="w-full py-6 bg-black dark:bg-emerald-500 text-white dark:text-neutral-900 rounded-full font-black text-xl uppercase tracking-tighter hover:scale-105 active:scale-95 transition-all">Claim Territory</button>
              </div>
           </div>
        </div>

        {/* 5. SCROLL HIGHLIGHTING MANIFESTO */}
        <div className="py-80 max-w-7xl mx-auto px-10 relative">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-60 bg-gradient-to-b from-transparent via-emerald-500 to-transparent" />
           <HighlightSection text="We believe in a world where your business is not a file, not a site, but a profound existence. A world where every transaction is an interaction, and every visitor is a citizen of your unique sovereignty. This is the future of commerce. This is the end of the temporary and the beginning of the eternal." />
        </div>

        {/* 6. DENSE STATISTICS BLOCK */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-1 py-40 border-y border-neutral-100 dark:border-neutral-900">
           <StatSquare label="OBSERVER_COUNT" val="1.2B" />
           <StatSquare label="REALITY_UPTIME" val="100%" color="emerald" />
           <StatSquare label="CAUSAL_STAB" val="MAX" />
           <StatSquare label="LATENCY_SYNC" val="0.1MS" color="emerald" />
           <StatSquare label="AXIOM_NODES" val="8.4M" />
        </div>

        {/* 7. THE GALLERY MOSAIC */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-1 pt-60">
           {[...Array(24)].map((_, i) => (
             <GalleryTile key={i} index={i} />
           ))}
        </div>

        {/* 8. FINAL COMMERCIAL CALL TO ACTION */}
        <div className="py-80 text-center relative px-10 bg-neutral-900 dark:bg-black rounded-[140px] text-white mt-80 overflow-hidden transition-colors duration-1000">
           <div className="relative z-10 max-w-5xl mx-auto">
              <span className="text-emerald-500 font-black text-[10px] uppercase tracking-[1em] mb-12 block">Inception_Initiated</span>
              <h2 className="text-[10vw] md:text-[8rem] font-black leading-[0.85] tracking-tighter uppercase mb-20">
                 YOUR <br /> <span className="text-neutral-600">NEW WORLD</span> <br /> <span className="italic">AWAITS.</span>
              </h2>
              
              <div className="flex flex-col md:flex-row justify-center gap-12 items-center">
                 <motion.button 
                   whileHover={{ scale: 1.1, rotate: -2 }}
                   className="px-24 py-12 bg-white text-black rounded-full font-black text-4xl tracking-tighter uppercase shadow-3xl"
                 >
                   Secure Project
                 </motion.button>
                 <motion.button 
                   whileHover={{ scale: 1.1, rotate: 2 }}
                   className="px-24 py-12 border-4 border-white text-white rounded-full font-black text-4xl tracking-tighter uppercase hover:bg-white hover:text-black transition-all"
                 >
                   Book Audit
                 </motion.button>
              </div>

              {/* Randomized Monospace Metadata */}
              <div className="mt-60 grid grid-cols-2 md:grid-cols-6 gap-10 opacity-20 font-mono text-[8px] uppercase tracking-[0.6em] border-t border-white/10 pt-10 text-left">
                 <div>AUTH: VERIFIED</div>
                 <div>LOC: GLOBAL_MESH</div>
                 <div>SYNC: NOMINAL</div>
                 <div>VERSION: 9.4.2</div>
                 <div>ENTROPY: LOW</div>
                 <div>AXIOM: LOCKED</div>
              </div>
           </div>
           
           {/* Kinetic Background Circle */}
           <motion.div 
             animate={{ rotate: 360, scale: [1, 1.1, 1] }}
             transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] aspect-square border-[80px] border-emerald-500/10 rounded-full pointer-events-none"
           />
        </div>

      </section>

      {/* Footer Buffer */}
      <div className="h-[20vh] bg-white dark:bg-[#050505] transition-colors duration-1000" />
      
    </div>
  );
};

const SolutionBlock: React.FC<{ number: string, category: string, title: string, desc: string, align?: 'left'|'right' }> = ({ number, category, title, desc, align='left' }) => (
  <motion.div 
    initial={{ y: 80, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={{ margin: "-100px", once: true }}
    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    className={align === 'right' ? 'text-right' : 'text-left'}
  >
    <div className={`flex items-center gap-10 mb-12 ${align === 'right' ? 'flex-row-reverse' : ''}`}>
       <span className="text-[12vw] font-black text-neutral-100 dark:text-neutral-900 italic leading-none select-none">{number}</span>
       <div className="h-px flex-grow bg-neutral-100 dark:bg-neutral-900" />
       <span className="text-[10px] font-black uppercase tracking-[0.8em] text-emerald-500">{category}</span>
    </div>
    <h3 className="text-7xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-12 dark:text-white">
       {title.split(' ').map((word, i) => (
         <span key={i} className={i % 2 === 1 ? 'text-neutral-200 dark:text-neutral-800' : ''}>{word} </span>
       ))}
    </h3>
    <p className={`text-2xl text-neutral-400 font-medium leading-tight tracking-tight max-w-2xl ${align === 'right' ? 'ml-auto' : ''}`}>
      {desc}
    </p>
  </motion.div>
);

const DataBadge: React.FC<{ label: string, val: string }> = ({ label, val }) => (
  <div className="text-left border-l-2 border-emerald-500 pl-6">
    <div className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-2">{label}</div>
    <div className="text-3xl font-black text-black dark:text-white tracking-tighter uppercase">{val}</div>
  </div>
);

const StatSquare: React.FC<{ label: string, val: string, color?: string }> = ({ label, val, color }) => (
  <div className={`aspect-square flex flex-col justify-center p-10 border border-neutral-50 dark:border-neutral-900 ${color === 'emerald' ? 'bg-emerald-500/5' : ''}`}>
     <div className={`text-[10px] font-black uppercase tracking-[0.4em] mb-4 ${color === 'emerald' ? 'text-emerald-500' : 'text-neutral-400'}`}>{label}</div>
     <div className="text-6xl font-black text-black dark:text-white tracking-tighter leading-none">{val}</div>
  </div>
);

const HighlightSection: React.FC<{ text: string }> = ({ text }) => {
  const words = text.split(" ");
  return (
    <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-[6vw] font-black uppercase leading-[0.8] tracking-tighter text-center">
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
      className="transition-all duration-500 cursor-default"
    >
      {word}
    </motion.span>
  );
};

const GalleryTile: React.FC<{ index: number }> = ({ index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });
  return (
    <motion.div 
      ref={ref}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.8, delay: (index % 8) * 0.03 }}
      className="aspect-square bg-neutral-100 dark:bg-neutral-900 relative overflow-hidden group grayscale hover:grayscale-0 transition-all cursor-crosshair"
    >
       <img src={`https://picsum.photos/seed/sol_gallery_${index}/400/400`} loading="lazy" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000" />
       <div className="absolute inset-0 bg-emerald-500/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
};

export default Solutions;
