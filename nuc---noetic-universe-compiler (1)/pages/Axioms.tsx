import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useNUCStore } from '../stores/useNUCStore';
import { nucApi } from '../services/api';

const Axioms: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { addExperiment } = useNUCStore();
  const [isCompiling, setIsCompiling] = useState(false);

  const [axioms, setAxioms] = useState({
    timeSpeed: 50,
    emotionalDepth: 50,
    visualFidelity: 50,
    presenceSync: 50,
    commercialFlow: 50,
    worldScale: 50
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 1.3]);
  const heroY = useTransform(smoothProgress, [0, 0.2], [0, -200]);
  const infraLineDraw = useTransform(smoothProgress, [0, 0.8], [0, 1]);
  const marqueeLeft = useTransform(smoothProgress, [0, 1], ["0%", "-40%"]);
  const marqueeRight = useTransform(smoothProgress, [0, 1], ["-40%", "0%"]);
  const backgroundRotate = useTransform(smoothProgress, [0, 1], [0, 90]);

  const handleSliderChange = (label: string, value: number) => {
    // Map human readable label back to state key if needed, or update directly
    // The RealitySlider uses labels like "Time Speed", but state keys are camelCase
    const key = label.split(' ').map((word, i) => i === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('') as keyof typeof axioms;
    setAxioms(prev => ({ ...prev, [key]: value }));
  };

  const generateMetric = () => {
    const { timeSpeed, presenceSync, worldScale } = axioms;
    return [
      [`-1 * (${timeSpeed} / 100)`, "0", "0", "0"],
      ["0", `${presenceSync} / 100`, "0", "0"],
      ["0", "0", `${presenceSync} / 100`, "0"],
      ["0", "0", "0", `${worldScale} / 100`]
    ];
  };

  const handleActivate = async () => {
    setIsCompiling(true);
    try {
      const metric = generateMetric();
      const response = await nucApi.createExperiment({
        name: `Universe_${Date.now().toString().slice(-4)}`,
        axioms: axioms,
        metric_symbolic: metric,
        coordinates: "t x y z" // Changed coordinates to string
      });
      addExperiment({
        job_id: response.job_id,
        name: `Universe_${Date.now().toString().slice(-4)}`,
        status: 'QUEUED',
        axioms: axioms // axioms property already correct
      });
      // Navigate to Realms to see the derivation
      navigate('/realms');
    } catch (error) {
      console.error("Experiment failed", error);
      alert("Inception Failed. Check console."); // Added alert for error case
    } finally {
      setIsCompiling(false);
    }
  };

  return (
    <div ref={containerRef} className="relative bg-white dark:bg-[#050505] text-black dark:text-neutral-100 selection:bg-emerald-500 selection:text-white overflow-hidden transition-colors duration-500">

      {/* Background Layer */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.04] dark:opacity-[0.08]">
        <svg className="absolute w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <motion.path
            d="M 0,0 L 1000,1000 M 1000,0 L 0,1000 M 500,0 L 500,1000 M 0,500 L 1000,500"
            stroke="currentColor"
            strokeWidth="0.5"
            fill="none"
            style={{ pathLength: infraLineDraw }}
            className="text-black dark:text-white"
          />
          <motion.circle
            cx="500" cy="500" r="400"
            stroke="#10b981" strokeWidth="1" fill="none"
            style={{ pathLength: infraLineDraw, rotate: backgroundRotate }}
          />
        </svg>
      </div>

      {/* HERO SECTION */}
      <section className="relative h-[130vh] flex flex-col items-center justify-center pt-32 px-10 overflow-hidden">
        <motion.div style={{ scale: heroScale, y: heroY }} className="relative z-10 w-full max-w-[2200px] text-center">

          <div className="absolute -top-20 left-0 w-full flex justify-between px-10 opacity-40">
            <span className="text-[10px] font-black uppercase tracking-[1.2em] vertical-text dark:text-neutral-500">INFRASTRUCTURE_9.2.0</span>
            <span className="text-[10px] font-black uppercase tracking-[1.2em] vertical-text text-emerald-500">STABILITY_NOMINAL</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-[18vw] md:text-[16rem] font-black tracking-[-0.11em] leading-[0.6] uppercase dark:text-white">
              THE <br /> <span className="text-emerald-500 italic">CORE.</span>
            </h1>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-20 items-end mt-32 px-10">
            <div className="text-left">
              <span className="text-emerald-500 font-black text-[9px] uppercase tracking-widest mb-6 block">Foundational Integrity</span>
              <p className="text-4xl font-black leading-none tracking-tighter uppercase dark:text-white">Absolute <br /> Persistence <br /> Guaranteed.</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="w-24 h-24 border border-neutral-100 dark:border-neutral-800 rounded-full flex items-center justify-center mb-8 animate-spin-slow">
                <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 4h16v16H4z" /></svg>
              </div>
              <button className="px-16 py-8 bg-black dark:bg-emerald-500 text-white dark:text-neutral-900 rounded-full font-black text-xl uppercase tracking-widest hover:bg-emerald-500 transition-all shadow-3xl hover:scale-110 active:scale-95">
                License Access
              </button>
            </div>
            <div className="text-right">
              <span className="text-black dark:text-neutral-400 font-black text-[9px] uppercase tracking-widest mb-6 block">Unified Mesh</span>
              <p className="text-4xl font-black leading-none tracking-tighter uppercase dark:text-white">Unlimited <br /> Sovereign <br /> Scale.</p>
            </div>
          </div>
        </motion.div>

        <div className="absolute bottom-20 left-20 text-[8px] font-mono opacity-20 uppercase tracking-[0.8em] hidden lg:block dark:text-neutral-400">
          NODE_SYNC: 99.98% // PK_ENCRYPTION: ACTIVE // LATENCY: 0.04MS
        </div>
      </section>

      {/* MARQUEE */}
      <section className="py-24 bg-black dark:bg-[#0a0a0a] overflow-hidden relative border-y border-emerald-500/10">
        <motion.div style={{ x: marqueeLeft }} className="flex gap-24 whitespace-nowrap text-[14rem] font-black text-white/5 uppercase italic leading-none">
          <span>HARDENED LOGIC • PERSISTENT MESH • SOVEREIGN ENGINE • </span>
        </motion.div>
        <motion.div style={{ x: marqueeRight }} className="flex gap-24 whitespace-nowrap text-[14rem] font-black text-emerald-500/10 uppercase italic leading-none mt-10">
          <span>BUILT FOR LEGACY • BUILT FOR POWER • BUILT FOR SCALE •</span>
        </motion.div>
      </section>

      {/* GRID */}
      <section className="relative py-80 px-10 max-w-[1920px] mx-auto min-h-[400vh]">
        <motion.div
          initial={{ x: -100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 1.2 }}
          className="max-w-2xl absolute top-0 left-20 z-10"
        >
          <div className="flex items-center gap-10 mb-10">
            <span className="text-7xl font-black text-neutral-100 dark:text-neutral-900 italic">01</span>
            <div className="h-[2px] w-full bg-neutral-50 dark:bg-neutral-800" />
          </div>
          <h2 className="text-[8vw] font-black tracking-tighter uppercase leading-[0.75] mb-12 dark:text-white">Hardened <br /> Persistence.</h2>
          <p className="text-3xl text-neutral-400 font-medium leading-tight tracking-tight">
            NUC's platform is designed for zero-drift persistence. Every law you define, every atom you compile, remains active across time. We provide the permanent steel for your infinite vision.
          </p>
          <div className="mt-20 flex gap-4">
            <div className="px-6 py-2 bg-neutral-50 dark:bg-neutral-900 rounded-full text-[9px] font-black uppercase tracking-widest dark:text-neutral-400">Protocol_V.4</div>
            <div className="px-6 py-2 bg-neutral-50 dark:bg-neutral-900 rounded-full text-[9px] font-black uppercase tracking-widest dark:text-neutral-400">Mesh_Verified</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 1.5 }}
          className="w-[60vw] aspect-[16/10] bg-neutral-100 dark:bg-neutral-900 rounded-[120px] overflow-hidden absolute top-60 right-[-5vw] shadow-3xl group"
        >
          <img src="https://picsum.photos/seed/platform_arch/1800/1200" className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2000ms]" />
          <div className="absolute inset-0 bg-emerald-500/5 mix-blend-overlay" />
          <div className="absolute bottom-20 left-20">
            <h3 className="text-[12vw] font-black text-white italic leading-none uppercase tracking-tighter opacity-10 group-hover:opacity-40 transition-opacity">INFRA.</h3>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 300, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1.2 }}
          className="max-w-[1400px] mx-auto absolute top-[38%] left-1/2 -translate-x-1/2 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-3xl p-32 rounded-[140px] border border-neutral-100 dark:border-neutral-800 shadow-[0_100px_200px_rgba(0,0,0,0.08)] dark:shadow-none z-20 flex flex-col md:flex-row gap-24 items-center"
        >
          <div className="flex-1">
            <span className="text-emerald-500 font-black text-[10px] uppercase tracking-[0.5em] mb-10 block">Global Operations</span>
            <h3 className="text-9xl font-black tracking-tighter uppercase leading-[0.8] mb-12 dark:text-white">Planetary <br /> <span className="text-neutral-200 dark:text-neutral-800">Reach.</span></h3>
            <p className="text-2xl text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed">
              Our planetary mesh synchronizes billions of observer points instantly. We operate the world's most stable reality nodes, ensuring that "distance" is only a parameter, not a limitation.
            </p>
          </div>
          <div className="flex-shrink-0 grid grid-cols-2 gap-12 border-l border-neutral-50 dark:border-neutral-800 pl-24">
            <DataBox label="UPTIME" val="100.0%" />
            <DataBox label="MESH_NODES" val="8,402" />
            <DataBox label="DRIFT" val="0.000%" />
            <DataBox label="ENCRYPTION" val="SHA_9" />
          </div>
        </motion.div>

        <div className="absolute top-[65%] right-20 text-right">
          <div className="text-[14rem] font-black text-outline uppercase leading-none opacity-10 select-none mb-10">SOVEREIGN</div>
          <div className="max-w-xl ml-auto">
            <span className="text-emerald-500 font-black text-[10px] uppercase tracking-[0.5em] mb-8 block">02 / SOVEREIGNTY</span>
            <h4 className="text-6xl font-black tracking-tighter uppercase mb-8 dark:text-white">Unbreakable <br /> Foundations.</h4>
            <p className="text-2xl text-neutral-400 font-medium leading-tight">
              You own every compiled asset. Our platform is a neutral, high-performance substrate for your intellectual and creative property. No intermediaries, only logic.
            </p>
          </div>
        </div>

        <div className="absolute left-20 top-[40%] h-[1200px] w-[2px] bg-neutral-50 dark:bg-neutral-900 overflow-hidden">
          <motion.div
            className="w-full h-[200px] bg-emerald-500"
            animate={{ y: [-200, 1200] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="py-96 bg-neutral-900 dark:bg-black text-white relative overflow-hidden px-10 transition-colors duration-500">
        <div className="max-w-7xl mx-auto">
          <span className="text-emerald-500 font-black text-[10px] uppercase tracking-[1em] mb-16 block text-center">Platform Manifesto</span>
          <PlatformTextReveal text="We do not build for the next release. We build for the next century. The NUC Platform provides a hardened, axiomatic layer that transforms imagination into permanent digital existence. This is the end of shallow experiences and the beginning of deep, persistent reality." />
        </div>
        <div className="absolute top-20 right-20 opacity-10 flex flex-col gap-2 font-mono text-[9px] text-emerald-500">
          <div>INIT_SEQUENCE_SUCCESS</div>
          <div>AXIOM_BINDING_LOCKED</div>
          <div>CAUSAL_MESH_ACTIVE</div>
          <div>SOVEREIGN_LVL: MAX</div>
        </div>
      </section>

      {/* SLIDER CONTROLS SECTION */}
      <section className="py-40 max-w-7xl mx-auto px-10 relative">
        <div className="text-center mb-40">
          <span className="text-emerald-500 font-black text-[12px] uppercase tracking-[2em] mb-12 block">Reality_Design</span>
          <h2 className="text-[12vw] font-black tracking-tighter uppercase leading-[0.65] mb-14 dark:text-white">YOUR <br /> <span className="text-neutral-200 dark:text-neutral-800 italic">RULES.</span></h2>
          <p className="text-4xl text-neutral-400 font-bold uppercase leading-none tracking-tighter max-w-3xl mx-auto">
            No code. No jargon. Just simple sliders to define how your world works. Change gravity, change time, change everything.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <RealitySlider label="Time Speed" value={axioms.timeSpeed} onChange={(v) => handleSliderChange("Time Speed", v)} />
          <RealitySlider label="Emotional Depth" value={axioms.emotionalDepth} onChange={(v) => handleSliderChange("Emotional Depth", v)} />
          <RealitySlider label="Visual Fidelity" value={axioms.visualFidelity} onChange={(v) => handleSliderChange("Visual Fidelity", v)} />
          <RealitySlider label="Presence Sync" value={axioms.presenceSync} onChange={(v) => handleSliderChange("Presence Sync", v)} />
          <RealitySlider label="Commercial Flow" value={axioms.commercialFlow} onChange={(v) => handleSliderChange("Commercial Flow", v)} />
          <RealitySlider label="World Scale" value={axioms.worldScale} onChange={(v) => handleSliderChange("World Scale", v)} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-96 relative overflow-hidden text-center bg-white dark:bg-[#050505] rounded-t-[150px] transition-colors duration-500">
        <motion.div
          animate={{ scale: [1, 1.4, 1], opacity: [0.05, 0.15, 0.05] }} transition={{ duration: 25, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] aspect-square bg-emerald-500/20 rounded-full blur-[250px]"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-10">
          <span className="text-[10px] font-black uppercase tracking-[1.5em] mb-16 block text-neutral-300">Deployment Phase</span>
          <h2 className="text-[15vw] font-black leading-[0.7] tracking-tighter mb-24 uppercase dark:text-white">
            {isCompiling ? "COMPILING..." : "ACTIVATE"} <br /> <span className="text-emerald-500 italic">SYSTEM.</span>
          </h2>
          <div className="flex flex-col md:flex-row justify-center gap-10 items-center">
            <motion.button
              onClick={handleActivate}
              disabled={isCompiling}
              className="px-28 py-14 bg-black dark:bg-emerald-500 text-white dark:text-neutral-900 rounded-full font-black text-5xl uppercase tracking-tighter shadow-3xl disabled:opacity-50"
            >
              {isCompiling ? "Processing..." : "Secure Project"}
            </motion.button>
            <motion.button className="px-28 py-14 border-4 border-black dark:border-white text-black dark:text-white rounded-full font-black text-5xl uppercase tracking-tighter hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all">Book Demo</motion.button>
          </div>
          <div className="mt-80 grid grid-cols-2 md:grid-cols-5 gap-24 border-t border-neutral-100 dark:border-neutral-800 pt-24 text-left opacity-30">
            <MetadataBlock title="AUTH" val="SECURE" />
            <MetadataBlock title="SYNC" val="MESH_READY" />
            <MetadataBlock title="FLUX" val="NOMINAL" />
            <MetadataBlock title="GEOS" val="GLOBAL" />
            <MetadataBlock title="ENGINE" val="V.9.4.2" />
          </div>
        </div>
      </section>
    </div>
  );
};

const DataBox: React.FC<{ label: string, val: string }> = ({ label, val }) => (
  <div className="text-left border-l-2 border-emerald-500 pl-6 py-2">
    <div className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-2">{label}</div>
    <div className="text-3xl font-black text-black dark:text-white tracking-tighter uppercase">{val}</div>
  </div>
);

const MetadataBlock: React.FC<{ title: string, val: string }> = ({ title, val }) => (
  <div>
    <div className="text-[10px] font-black uppercase tracking-[0.4em] mb-4 text-emerald-500">{title}</div>
    <div className="text-2xl font-black tracking-tighter text-black dark:text-white uppercase leading-none">{val}</div>
  </div>
);

const PlatformTextReveal: React.FC<{ text: string }> = ({ text }) => {
  const words = text.split(" ");
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-4 text-[6vw] font-black uppercase leading-[0.8] tracking-tighter text-center justify-center">
      {words.map((word, i) => (
        <WordReveal key={i} word={word} />
      ))}
    </div>
  );
};

const WordReveal: React.FC<{ word: string }> = ({ word }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.8 });
  return (
    <motion.span
      ref={ref}
      animate={{
        color: isInView ? "#10b981" : "#333",
        opacity: isInView ? 1 : 0.1,
        scale: isInView ? 1 : 0.92
      }}
      className="transition-all duration-1000 cursor-default"
    >
      {word}
    </motion.span>
  );
};

const RealitySlider: React.FC<{ label: string, value: number, onChange: (v: number) => void }> = ({ label, value, onChange }) => (
  <div className="p-12 bg-neutral-50 dark:bg-neutral-900 rounded-[60px] border border-neutral-100 dark:border-neutral-800 shadow-xl group">
    <div className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-8">{label}</div>
    <div className="relative h-4 w-full bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden flex items-center">
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full opacity-0 absolute inset-0 cursor-pointer z-20"
      />
      <motion.div
        animate={{ width: `${value}%` }}
        className="absolute h-full bg-emerald-500 z-10"
      />
    </div>
    <div className="flex justify-between mt-6 opacity-30 text-[8px] font-mono">
      <span>MIN</span>
      <span className="text-[10px] font-black text-emerald-500 opacity-100">{value}%</span>
      <span>MAX_SOVEREIGN</span>
    </div>
  </div>
);

export default Axioms;
