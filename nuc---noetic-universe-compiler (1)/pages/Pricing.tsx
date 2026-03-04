
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';

const Pricing: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 30,
    damping: 20,
    restDelta: 0.001
  });

  // Background kinetic transforms
  const bgTextMove = useTransform(smoothProgress, [0, 1], ["0%", "-50%"]);
  const revTextMove = useTransform(smoothProgress, [0, 1], ["-30%", "20%"]);
  const infraPath = useTransform(smoothProgress, [0, 1], [0, 2]);
  const heroScale = useTransform(smoothProgress, [0, 0.15], [1, 1.25]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);

  return (
    <div ref={containerRef} className="relative bg-white dark:bg-[#050505] text-black dark:text-neutral-100 selection:bg-emerald-500 overflow-hidden transition-colors duration-1000 min-h-[800vh]">
      
      {/* 1. KINETIC INFRASTRUCTURE LAYER */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <svg className="w-full h-full opacity-[0.06] dark:opacity-[0.12]" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <motion.path
            d="M 50,0 V 1000 M 950,0 V 1000 M 0,150 H 1000 M 0,850 H 1000"
            stroke="currentColor" strokeWidth="0.5" fill="none"
            style={{ pathLength: infraPath }}
          />
          <motion.circle 
            cx="500" cy="500" r="450" stroke="#10b981" strokeWidth="0.5" fill="none"
            style={{ pathLength: infraPath }}
          />
          <motion.path
            d="M 0,0 L 1000,1000 M 1000,0 L 0,1000"
            stroke="currentColor" strokeWidth="0.2" fill="none" opacity="0.3"
            style={{ pathLength: infraPath }}
          />
        </svg>
      </div>

      {/* 2. HUD DATA OVERLAY */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        <motion.div 
          style={{ y: useTransform(smoothProgress, [0, 1], [0, -2000]) }}
          className="absolute top-[10%] left-[2%] text-[8px] font-black uppercase tracking-[2em] vertical-text opacity-40 dark:text-emerald-500"
        >
          COMMERCIAL_LEDGER_V.9
        </motion.div>
        <motion.div 
          style={{ y: useTransform(smoothProgress, [0, 1], [2000, 0]) }}
          className="absolute bottom-[5%] right-[2%] text-[8px] font-black uppercase tracking-[2em] vertical-text opacity-40 dark:text-emerald-500"
        >
          SOVEREIGN_EXCHANGE_ACTIVE
        </motion.div>
      </div>

      {/* 3. HERO SECTION: THE EXCHANGE */}
      <section className="relative h-screen flex flex-col items-center justify-center px-10 overflow-hidden">
        <motion.div style={{ scale: heroScale, opacity: heroOpacity }} className="relative z-20 text-center">
          <motion.span 
            initial={{ opacity: 0, letterSpacing: "3em" }}
            animate={{ opacity: 1, letterSpacing: "1.2em" }}
            transition={{ duration: 1.8 }}
            className="text-[10px] font-black uppercase text-emerald-500 mb-14 block"
          >
            The_Value_Axios
          </motion.span>
          <h1 className="text-[12vw] md:text-[11rem] font-black tracking-[-0.1em] leading-[0.7] uppercase mb-16 dark:text-white">
            CHOOSE <br /> 
            <span className="text-neutral-200 dark:text-neutral-800 italic">EXISTENCE.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-2xl md:text-3xl font-bold tracking-tight text-neutral-500 dark:text-neutral-400 leading-none uppercase">
            Sovereignty has a price. Consistency is our currency. Access the core.
          </p>
        </motion.div>

        {/* PARALLAX BG TYPOGRAPHY */}
        <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 pointer-events-none opacity-[0.04] dark:opacity-[0.12] select-none whitespace-nowrap">
          <motion.div style={{ x: bgTextMove }} className="text-[40vw] font-black leading-none tracking-tighter">EXCHANGE</motion.div>
          <motion.div style={{ x: revTextMove }} className="text-[40vw] font-black leading-none tracking-tighter italic text-emerald-500">VALUATION</motion.div>
        </div>
      </section>

      {/* 4. ASYMMETRIC PRICING MATRIX */}
      <section className="relative px-8 md:px-24 py-40 max-w-[2800px] mx-auto min-h-[600vh]">
        
        {/* TIER 01: THE SEED */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-[60vh] items-start">
          <div className="lg:col-span-8 relative z-20">
            <PricingBlock 
              number="01"
              label="ENTRY_TIER"
              title="THE SEED"
              price="4,999"
              desc="The foundational level for solo architects. Instantiate a single universe with persistent physics. Perfect for testing axioms before total derivation."
              features={[
                "1 Sovereign Universe",
                "Standard Causal Engine",
                "10GB Persistence Archive",
                "Single Observer Protocol",
                "Community Council Access"
              ]}
            />
          </div>
          <div className="lg:col-span-4 mt-40">
             <div className="aspect-[4/5] bg-neutral-50 dark:bg-neutral-900 rounded-[80px] border border-neutral-100 dark:border-neutral-800 p-12 flex flex-col justify-end relative group overflow-hidden shadow-4xl">
                <div className="absolute top-10 right-10 text-[10vw] font-black opacity-5 dark:opacity-10 select-none">SEED</div>
                <img src="https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?auto=format&fit=crop&q=80&w=800" loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale group-hover:scale-110 transition-transform duration-[3000ms]" />
                <div className="relative z-10">
                   <div className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-4">Integrity_Check</div>
                   <div className="text-4xl font-black dark:text-white leading-none tracking-tighter">NOMINAL <br /> STABILITY.</div>
                </div>
             </div>
          </div>
        </div>

        {/* DATA DIVIDER: THE MESH LEVEL */}
        <div className="py-80 text-center relative border-y border-neutral-100 dark:border-neutral-900">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-neutral-100 dark:bg-neutral-800 opacity-40" />
           <span className="text-emerald-500 font-black text-[11px] uppercase tracking-[1.5em] mb-14 block">Global_Valuation</span>
           <h2 className="text-9xl md:text-[11rem] font-black tracking-tighter uppercase leading-[0.7] mb-20 relative z-20">
              VALUE IS <br /> 
              <span className="text-neutral-200 dark:text-neutral-800">BUILT ON</span> <br /> 
              TRUTH.
           </h2>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-left pt-24">
              <PricingMetric label="AVG_ROI" val="840%" />
              <PricingMetric label="TRUST_SCORE" val="MAX" color="emerald" />
              <PricingMetric label="UPTIME" val="100%" />
              <PricingMetric label="NODES" val="8.4M" color="emerald" />
           </div>
        </div>

        {/* TIER 02: THE CORE (POPULAR) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 my-[60vh] items-center">
          <div className="lg:col-span-5 relative order-2 lg:order-1">
             <div className="grid grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <motion.div 
                    key={i} 
                    whileInView={{ opacity: [0, 1], scale: [0.8, 1], y: [50, 0] }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: i * 0.1, duration: 1 }}
                    className="aspect-square bg-neutral-50 dark:bg-neutral-900 rounded-[50px] overflow-hidden grayscale hover:grayscale-0 transition-all shadow-5xl border border-neutral-100 dark:border-neutral-800"
                  >
                     <img src={`https://picsum.photos/seed/pricing_core_${i}/800/800`} loading="lazy" className="w-full h-full object-cover opacity-80" />
                  </motion.div>
                ))}
             </div>
             <div className="absolute -top-20 -left-20 text-[220px] font-black text-outline opacity-5 select-none pointer-events-none vertical-text">STABILITY</div>
          </div>
          <div className="lg:col-span-7 order-1 lg:order-2 text-right relative z-20">
             <div className="mb-8 inline-block px-10 py-3 bg-emerald-500 text-white rounded-full text-[10px] font-black uppercase tracking-[0.5em] shadow-xl animate-pulse">MOST_SELECTED</div>
            <PricingBlock 
              number="02"
              label="CORE_TIER"
              title="THE CORE"
              price="24,999"
              align="right"
              desc="Professional infrastructure for high-performance domains. Unlimited universes, advanced causality linkage, and full commercial sovereignty."
              features={[
                "Unlimited Universes",
                "Advanced Causal Linkage",
                "1TB High-Persistence Drive",
                "Multi-Observer Mesh Sync",
                "Priority Council Support",
                "Axiom Bridging (V.4)"
              ]}
            />
          </div>
        </div>

        {/* TIER 03: THE COUNCIL */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-[60vh] items-end">
          <div className="lg:col-span-12 relative z-20 text-center">
            <PricingBlock 
              number="03"
              label="SOVEREIGN_TIER"
              title="THE COUNCIL"
              price="Custom"
              align="center"
              desc="Ultimate governance for institutions. Bespoke physical constants, proprietary ontological proofs, and dedicated architectural council support."
              features={[
                "Global Persistence Mesh",
                "Bespoke Physical Constants",
                "Institutional Law Derivation",
                "Infinite Observer Capacity",
                "Council Seat Representation",
                "Direct Architect Access"
              ]}
            />
            <div className="mt-20">
               <motion.button 
                 whileHover={{ scale: 1.1, rotate: -2 }}
                 className="px-28 py-10 bg-black dark:bg-emerald-500 text-white dark:text-neutral-900 rounded-full font-black text-5xl tracking-tighter uppercase shadow-5xl"
               >
                 Book Audit
               </motion.button>
            </div>
          </div>
        </div>

        {/* MANIFESTO: DENSE HIGHLIGHTING */}
        <div className="py-96 max-w-[2000px] mx-auto px-10 relative">
           <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-40" />
           <PricingManifesto text="We do not sell services. We lease existence. To own a tier in the Sovereign Exchange is to anchor your commercial legacy in the deep logic of the core. Our prices are not arbitrary; they are reflections of the computational and ontological energy required to maintain your absolute domain." />
        </div>

        {/* GALLERY OF EXCHANGE: NO EMPTY SPACE */}
        <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-10 gap-1 pt-60">
           {[...Array(30)].map((_, i) => (
             <ArchiveTile key={i} index={i} />
           ))}
        </div>

        {/* FINAL COMMERCIAL CTA */}
        <div className="py-96 bg-neutral-900 dark:bg-black rounded-[200px] relative overflow-hidden px-16 transition-colors duration-1000 mt-[40vh]">
           <div className="grid grid-cols-1 xl:grid-cols-12 gap-24 items-center relative z-20 text-white">
              <div className="xl:col-span-8">
                 <span className="text-emerald-500 font-black text-[12px] uppercase tracking-[2em] mb-16 block">Initiate_Commercial_Bond</span>
                 <h2 className="text-[10vw] xl:text-[10rem] font-black leading-[0.7] tracking-tighter uppercase mb-16">
                    OWN <br /> <span className="text-neutral-700">THE</span> <br /> <span className="italic">ETERNAL.</span>
                 </h2>
                 <p className="text-3xl text-neutral-400 font-medium max-w-3xl leading-tight">
                    Your universe is waiting for its first ledger entry. Access the core and begin the derivation of your custom existence.
                 </p>
              </div>
              <div className="xl:col-span-4 flex flex-col items-end gap-16">
                 <Link to="/signup" className="w-full">
                    <motion.button 
                      whileHover={{ scale: 1.1, rotate: -2 }}
                      className="w-full py-16 bg-white text-black rounded-full font-black text-5xl tracking-tighter uppercase hover:bg-emerald-500 transition-colors shadow-5xl"
                    >
                      Join Now
                    </motion.button>
                 </Link>
                 <div className="w-full p-14 bg-white/5 border border-white/10 rounded-[90px] backdrop-blur-3xl text-right">
                    <div className="text-[11px] font-black uppercase tracking-widest text-emerald-500 mb-8 italic">Commercial Integrity</div>
                    <div className="text-8xl font-black text-white tracking-tighter uppercase leading-none italic">Total.</div>
                 </div>
              </div>
           </div>
           
           <motion.div 
             animate={{ rotate: 360, scale: [1, 1.2, 1] }}
             transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140vw] aspect-square border-[150px] border-emerald-500/5 rounded-full pointer-events-none"
           />
        </div>

      </section>

      {/* FOOTER SPACING BUFFER */}
      <div className="h-[30vh] bg-white dark:bg-[#050505] transition-colors duration-1000" />

    </div>
  );
};

// --- SUBCOMPONENTS ---

const PricingBlock: React.FC<{ 
  number: string, 
  label: string, 
  title: string, 
  price: string, 
  desc: string, 
  features: string[], 
  align?: 'left'|'right'|'center' 
}> = ({ number, label, title, price, desc, features, align='left' }) => (
  <motion.div 
    initial={{ y: 120, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
    className={`${align === 'right' ? 'text-right ml-auto' : align === 'center' ? 'text-center mx-auto' : 'text-left'} max-w-6xl`}
  >
    <div className={`flex items-center gap-14 mb-14 ${align === 'right' ? 'flex-row-reverse' : align === 'center' ? 'justify-center' : ''}`}>
       <span className="text-[18vw] font-black text-neutral-100 dark:text-neutral-900 leading-none italic select-none">{number}</span>
       <div className="h-px flex-grow bg-neutral-100 dark:bg-neutral-900" />
       <span className="text-[12px] font-black uppercase tracking-[1.2em] text-emerald-500">{label}</span>
    </div>
    <div className={`flex items-baseline gap-6 mb-12 ${align === 'right' ? 'flex-row-reverse' : align === 'center' ? 'justify-center' : ''}`}>
       <h3 className="text-8xl md:text-[11rem] font-black tracking-tighter uppercase leading-[0.7] dark:text-white">
          {title}
       </h3>
       <div className="flex items-baseline gap-2">
          {price !== 'Custom' && <span className="text-3xl font-black text-neutral-300">₹</span>}
          <span className="text-8xl font-black tracking-tighter text-emerald-500 italic">{price}</span>
          {price !== 'Custom' && <span className="text-xl font-black text-neutral-300 uppercase">/mo</span>}
       </div>
    </div>
    <p className={`text-4xl text-neutral-400 font-bold leading-[0.95] tracking-tighter uppercase mb-16 ${align === 'center' ? 'mx-auto' : ''}`}>
      {desc}
    </p>
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-6 text-left ${align === 'center' ? 'justify-center' : ''}`}>
       {features.map((f, i) => (
         <div key={i} className={`flex items-center gap-4 ${align === 'right' ? 'flex-row-reverse text-right' : ''}`}>
            <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500 dark:text-neutral-400">{f}</span>
         </div>
       ))}
    </div>
  </motion.div>
);

const PricingMetric: React.FC<{ label: string, val: string, color?: string }> = ({ label, val, color }) => (
  <div className={`p-20 flex flex-col justify-center border border-neutral-50 dark:border-neutral-900 ${color === 'emerald' ? 'bg-emerald-500/5' : ''}`}>
     <div className={`text-[12px] font-black uppercase tracking-[0.8em] mb-12 ${color === 'emerald' ? 'text-emerald-500' : 'text-neutral-400'}`}>{label}</div>
     <div className="text-9xl font-black text-black dark:text-white tracking-tighter leading-none">{val}</div>
  </div>
);

const PricingManifesto: React.FC<{ text: string }> = ({ text }) => {
  const words = text.split(" ");
  return (
    <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 text-[7vw] font-black uppercase leading-[0.8] tracking-tighter text-center">
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
        opacity: isInView ? 1 : 0.05,
        scale: isInView ? 1 : 0.95
      }}
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
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 1, delay: (index % 15) * 0.02 }}
      className={`aspect-square bg-neutral-50 dark:bg-neutral-900 relative overflow-hidden group grayscale hover:grayscale-0 transition-all cursor-crosshair ${index % 8 === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
    >
       <img src={`https://picsum.photos/seed/pricing_tile_${index}/1000/1000`} loading="lazy" className="w-full h-full object-cover opacity-80" />
       <div className="absolute inset-0 bg-emerald-500/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
          <span className="text-white font-black text-[10px] uppercase tracking-widest mb-1">EXCHANGE_NODE_{index+8000}</span>
          <h4 className="text-2xl font-black text-white italic leading-none">Verified.</h4>
       </div>
    </motion.div>
  );
};

export default Pricing;
