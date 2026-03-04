
import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useNUCStore } from '../stores/useNUCStore';
import { nucApi } from '../services/api';

const Realms: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { experiments, updateExperiment } = useNUCStore();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 30,
    damping: 20,
    restDelta: 0.001
  });

  // Background and global kinetic transforms
  const bgTextMove = useTransform(smoothProgress, [0, 1], ["0%", "-50%"]);
  const revTextMove = useTransform(smoothProgress, [0, 1], ["-20%", "30%"]);
  const infraPath = useTransform(smoothProgress, [0, 1], [0, 2]);
  const heroScale = useTransform(smoothProgress, [0, 0.1], [1, 1.25]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.1], [1, 0]);


  return (
    <div ref={containerRef} className="relative bg-white dark:bg-[#050505] text-black dark:text-neutral-100 selection:bg-emerald-500 overflow-hidden transition-colors duration-1000 min-h-[900vh]">

      {/* 1. KINETIC INFRASTRUCTURE LAYER */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <svg className="w-full h-full opacity-[0.05] dark:opacity-[0.12]" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <motion.path
            d="M 20,0 V 1000 M 980,0 V 1000 M 0,50 H 1000 M 0,950 H 1000"
            stroke="currentColor" strokeWidth="0.5" fill="none"
            style={{ pathLength: infraPath }}
          />
          <motion.circle
            cx="500" cy="500" r="460" stroke="#10b981" strokeWidth="0.3" fill="none"
            style={{ pathLength: infraPath }}
          />
          <motion.path
            d="M 0,0 L 1000,1000 M 1000,0 L 0,1000"
            stroke="currentColor" strokeWidth="0.1" fill="none" opacity="0.2"
          />
        </svg>
      </div>

      {/* 2. HUD DENSITY OVERLAY */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        <motion.div
          style={{ y: useTransform(smoothProgress, [0, 1], [0, -3000]) }}
          className="absolute top-[8%] left-[1.5%] text-[7px] font-black uppercase tracking-[2em] vertical-text opacity-40 dark:text-emerald-500"
        >
          REALM_CATALOG_V9_CORE
        </motion.div>
        <motion.div
          style={{ y: useTransform(smoothProgress, [0, 1], [3000, 0]) }}
          className="absolute bottom-[2%] right-[1.5%] text-[7px] font-black uppercase tracking-[2em] vertical-text opacity-40 dark:text-emerald-500"
        >
          SOVEREIGN_REGISTRY_LOCKED
        </motion.div>
      </div>

      {/* 3. HERO SECTION: THE REALMS CATALOG */}
      <section className="relative h-screen flex flex-col items-center justify-center px-10 overflow-hidden">
        <motion.div style={{ scale: heroScale, opacity: heroOpacity }} className="relative z-20 text-center">
          <motion.span
            initial={{ opacity: 0, letterSpacing: "3em" }}
            animate={{ opacity: 1, letterSpacing: "1.5em" }}
            transition={{ duration: 1.8 }}
            className="text-[10px] font-black uppercase text-emerald-500 mb-12 block"
          >
            The_Canvas_Collection
          </motion.span>
          <h1 className="text-[14vw] md:text-[13rem] font-black tracking-[-0.08em] leading-[0.6] uppercase mb-16 dark:text-white">
            CHOOSE <br />
            <span className="text-neutral-200 dark:text-neutral-800 italic">YOUR WORLD.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-2xl md:text-3xl font-bold tracking-tight text-neutral-500 dark:text-neutral-400 leading-[0.9] uppercase">
            Don't just browse. Select the starting logic for your infinite domain.
          </p>
        </motion.div>

        {/* PARALLAX BG TYPOGRAPHY */}
        <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 pointer-events-none opacity-[0.03] dark:opacity-[0.1] select-none whitespace-nowrap">
          <motion.div style={{ x: bgTextMove }} className="text-[45vw] font-black leading-none tracking-tighter">CATALOG</motion.div>
          <motion.div style={{ x: revTextMove }} className="text-[45vw] font-black leading-none tracking-tighter italic text-emerald-500 uppercase">Derivation</motion.div>
        </div>
      </section>

      {/* LIVE REGISTRY SECTION */}
      <section className="relative py-40 max-w-7xl mx-auto px-10">
        <div className="border border-neutral-100 dark:border-neutral-900 bg-white/50 dark:bg-black/50 backdrop-blur-3xl rounded-[80px] p-20 shadow-2xl overflow-hidden relative">
          <div className="flex items-center justify-between mb-20 border-b border-neutral-100 dark:border-neutral-900 pb-10">
            <div>
              <span className="text-emerald-500 font-black text-[10px] uppercase tracking-widest block mb-1">SOVEREIGN_REGISTRY</span>
              <h2 className="text-5xl font-black uppercase tracking-tighter dark:text-white">Active Computations</h2>
            </div>
            <div className="text-right">
              <span className="text-[9px] font-mono opacity-40 uppercase">Cluster Status: NOMINAL</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {experiments.length === 0 ? (
              <div className="py-20 text-center opacity-30 text-2xl font-bold uppercase italic">No active derivations found.</div>
            ) : (
              experiments.map((exp) => (
                <div key={exp.job_id} className="p-10 border border-neutral-100 dark:border-neutral-800 rounded-[40px] flex flex-col md:flex-row items-center gap-10">
                  <div className="flex-grow">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-4xl font-black dark:text-white uppercase leading-none">{exp.name}</span>
                      <span className={`px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${exp.status === 'COMPLETED' ? 'bg-emerald-500 text-white' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400 animate-pulse'}`}>
                        {exp.status}
                      </span>
                    </div>
                    <div className="text-[10px] font-mono opacity-40 uppercase">JOB_ID: {exp.job_id}</div>
                  </div>
                  {exp.result && (
                    <div className="flex flex-col gap-6 w-full mt-6 border-t border-neutral-100 dark:border-neutral-800 pt-6">
                      <div className="flex flex-wrap gap-10">
                        <div className="px-6 py-4 bg-emerald-500/5 rounded-3xl border border-emerald-500/10">
                          <div className="text-[8px] font-black text-emerald-500 uppercase">RICCI_SCALAR</div>
                          <div className="text-2xl font-black dark:text-white truncate max-w-[200px]">{exp.result.ricci_scalar}</div>
                        </div>
                        <div className="px-6 py-4 bg-neutral-50 dark:bg-neutral-900 rounded-3xl border border-neutral-100 dark:border-neutral-800">
                          <div className="text-[8px] font-black text-neutral-400 uppercase tracking-widest">ANTI_GRAV</div>
                          <div className="text-2xl font-black text-emerald-500">{exp.result.anti_gravity_analysis?.repulsive_potential ? "YES" : "NO"}</div>
                        </div>
                      </div>

                      {exp.result.ai_explanation && (
                        <div className="p-8 bg-black/5 dark:bg-white/5 rounded-[30px] border border-neutral-100 dark:border-neutral-900">
                          <div className="text-[9px] font-black text-emerald-500 uppercase mb-4 tracking-widest">AI_SCIENTIFIC_INTERPRETATION</div>
                          <p className="text-sm font-medium leading-relaxed opacity-80 italic">"{exp.result.ai_explanation}"</p>
                        </div>
                      )}

                      {exp.result.derived_metric && (
                        <div className="p-8 bg-neutral-900 rounded-[30px] font-mono text-[10px] text-emerald-400/70 overflow-x-auto">
                          <div className="text-[8px] font-black text-neutral-500 uppercase mb-2 tracking-widest">DERIVED_TENSOR_g_μν</div>
                          <pre>{exp.result.derived_metric}</pre>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* 4. REALM SHOWCASE: THE TYPES */}
      <section className="relative px-8 md:px-24 py-40 max-w-[2800px] mx-auto">

        {/* REALM 01: THE MIRROR (RETAIL/IDENTITY) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-[60vh] items-center">
          <div className="lg:col-span-7 relative z-20">
            <RealmFeature
              number="01"
              label="DIGITAL_TWIN"
              title="THE MIRROR WORLD"
              desc="The ultimate tool for creators and brands. Create a perfect digital copy of reality where your brand identity is the physical law. In the Mirror, the sky is your color, and your products are eternal."
              tags={["Brand Identity", "Absolute Fidelity", "Personal Commerce"]}
            />
          </div>
          <div className="lg:col-span-5">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="aspect-[4/5] bg-neutral-100 dark:bg-neutral-900 rounded-[100px] overflow-hidden shadow-5xl border border-neutral-100 dark:border-neutral-800 group relative"
            >
              <img src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1200" loading="lazy" className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[3000ms]" />
              <div className="absolute inset-0 bg-emerald-500/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-10 right-10 text-white font-black text-6xl opacity-10 uppercase italic">Mirror.</div>
            </motion.div>
          </div>
        </div>

        {/* DATA STRIP: THE LIVING PHYSICS */}
        <div className="py-80 text-center relative border-y border-neutral-100 dark:border-neutral-900">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-neutral-100 dark:bg-neutral-800 opacity-40" />
          <span className="text-emerald-500 font-black text-[11px] uppercase tracking-[1.5em] mb-14 block">Living_Dynamics</span>
          <h2 className="text-9xl md:text-[12rem] font-black tracking-tighter uppercase leading-[0.7] mb-20 relative z-20 dark:text-white">
            WORLDS <br />
            <span className="text-neutral-200 dark:text-neutral-800">THAT ACTUALLY</span> <br />
            REACT.
          </h2>
          <p className="max-w-xl mx-auto text-xl font-bold text-neutral-400 uppercase leading-none tracking-tight mb-20">Our worlds don't just sit there. They change based on who is inside them. This is the end of the static web.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1 pt-24 border-t border-neutral-50 dark:border-neutral-900">
            <MetricItem label="REACTION_SPD" val="0.02ms" />
            <MetricItem label="EMERGENCE" val="TOTAL" color="emerald" />
            <MetricItem label="CONSISTENCY" val="100%" />
            <MetricItem label="CAUSAL_LINKS" val="8.4M" color="emerald" />
          </div>
        </div>

        {/* GALLERY OF POSSIBILITIES: ZERO EMPTY SPACE */}
        <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-10 gap-1 pt-80">
          {[...Array(30)].map((_, i) => (
            <PossibilityTile key={i} index={i} />
          ))}
        </div>

        {/* FINAL COMMERCIAL CTA: THE DAWN OF SOVEREIGNTY */}
        <div className="py-96 bg-neutral-900 dark:bg-black rounded-[250px] relative overflow-hidden px-16 transition-colors duration-1000 mt-[40vh]">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-24 items-center relative z-20">
            <div className="xl:col-span-8">
              <span className="text-emerald-500 font-black text-[14px] uppercase tracking-[2.5em] mb-20 block">Initiate_First_Breathe</span>
              <h2 className="text-[12vw] xl:text-[12rem] font-black text-white leading-[0.65] tracking-tighter uppercase mb-16">
                OWN <br /> <span className="text-neutral-700">THE</span> <br /> <span className="italic">ETERNAL.</span>
              </h2>
              <p className="text-4xl text-neutral-400 font-black tracking-tighter max-w-4xl leading-[0.9] uppercase">
                Your first universe is waiting for its constitution. Select your realm and begin the derivation of your custom existence.
              </p>
            </div>
            <div className="xl:col-span-4 flex flex-col items-end gap-20">
              <Link to="/signup" className="w-full">
                <motion.button
                  whileHover={{ scale: 1.1, rotate: -2 }}
                  className="w-full py-20 bg-white text-black rounded-full font-black text-6xl tracking-tighter uppercase hover:bg-emerald-500 transition-colors shadow-5xl"
                >
                  Join Now
                </motion.button>
              </Link>
            </div>
          </div>

          <motion.div
            animate={{ rotate: -360, scale: [1, 1.3, 1] }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160vw] aspect-square border-[180px] border-emerald-500/5 rounded-full pointer-events-none"
          />

          <div className="mt-80 grid grid-cols-2 md:grid-cols-6 gap-12 opacity-30 text-white font-mono text-[11px] uppercase tracking-[1em] border-t border-white/10 pt-20 text-left">
            <div>SIG: REALM_SYNC</div>
            <div>LOC: GLOBAL_MESH</div>
            <div>SYNC: VERIFIED</div>
            <div>NODES: 18.4M</div>
            <div>DRIFT: 0.00%</div>
            <div>REALM: READY</div>
          </div>
        </div>

      </section>
    </div>
  );
};

// --- SUBCOMPONENTS ---

const RealmFeature: React.FC<{
  number: string,
  label: string,
  title: string,
  desc: string,
  tags: string[],
  align?: 'left' | 'right' | 'center'
}> = ({ number, label, title, desc, tags, align = 'left' }) => (
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
    <h3 className="text-9xl md:text-[11rem] font-black tracking-tighter uppercase leading-[0.7] mb-14 dark:text-white">
      {title.split(' ').map((word, i) => (
        <span key={i} className={i % 2 === 1 ? 'text-neutral-200 dark:text-neutral-800' : ''}>{word} </span>
      ))}
    </h3>
    <p className={`text-4xl text-neutral-400 font-bold leading-[0.95] tracking-tighter uppercase mb-16 ${align === 'center' ? 'mx-auto' : ''}`}>
      {desc}
    </p>
    <div className={`flex flex-wrap gap-4 ${align === 'right' ? 'justify-end' : align === 'center' ? 'justify-center' : ''}`}>
      {tags.map((tag, i) => (
        <div key={i} className="px-8 py-3 bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-full text-[10px] font-black uppercase tracking-widest text-emerald-500">
          {tag}
        </div>
      ))}
    </div>
  </motion.div>
);

const MetricItem: React.FC<{ label: string, val: string, color?: string }> = ({ label, val, color }) => (
  <div className={`p-20 flex flex-col justify-center border border-neutral-50 dark:border-neutral-900 ${color === 'emerald' ? 'bg-emerald-500/5' : ''}`}>
    <div className={`text-[12px] font-black uppercase tracking-[0.8em] mb-12 ${color === 'emerald' ? 'text-emerald-500' : 'text-neutral-400'}`}>{label}</div>
    <div className="text-9xl font-black text-black dark:text-white tracking-tighter leading-none">{val}</div>
  </div>
);

const RealitySlider: React.FC<{ label: string }> = ({ label }) => (
  <div className="p-12 bg-neutral-50 dark:bg-neutral-900 rounded-[60px] border border-neutral-100 dark:border-neutral-800 shadow-xl group">
    <div className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-8">{label}</div>
    <div className="relative h-2 w-full bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: "30%" }}
        whileInView={{ width: "80%" }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute h-full bg-emerald-500"
      />
    </div>
    <div className="flex justify-between mt-6 opacity-30 text-[8px] font-mono">
      <span>MIN</span>
      <span>MAX_SOVEREIGN</span>
    </div>
  </div>
);

const PossibilityTile: React.FC<{ index: number }> = ({ index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });
  return (
    <motion.div
      ref={ref}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
      transition={{ duration: 1.2, delay: (index % 12) * 0.02 }}
      className={`aspect-square bg-neutral-100 dark:bg-neutral-900 relative overflow-hidden group grayscale hover:grayscale-0 transition-all cursor-crosshair ${index % 10 === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
    >
      <img src={`https://picsum.photos/seed/realm_mosaic_${index}/1200/1200`} loading="lazy" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-125 transition-all duration-[2500ms]" />
      <div className="absolute inset-0 bg-emerald-500/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-10">
        <span className="text-white font-black text-[12px] uppercase tracking-widest mb-2">POSSIBILITY_NODE_{index + 5000}</span>
        <h4 className="text-4xl font-black text-white italic leading-none">Verified.</h4>
      </div>
    </motion.div>
  );
};

export default Realms;
