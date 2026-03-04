import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 45,
    damping: 25,
    restDelta: 0.001
  });

  const heroY = useTransform(smoothProgress, [0, 0.2], [0, -150]);
  const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 1.12]);
  const lineDraw = useTransform(smoothProgress, [0, 0.6], [0, 1]);
  const marquee1 = useTransform(smoothProgress, [0, 1], ["0%", "-50%"]);
  const marquee2 = useTransform(smoothProgress, [0, 1], ["-50%", "0%"]);
  const sideTextY = useTransform(smoothProgress, [0, 1], [0, -400]);

  return (
    <div ref={containerRef} className="relative bg-white dark:bg-[#050505] text-black dark:text-neutral-100 selection:bg-emerald-500 selection:text-white transition-colors duration-700">

      {/* Background Layer */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-5 dark:opacity-10">
        <svg className="absolute w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <motion.path
            d="M 100,0 C 200,300 800,700 900,1000 M 0,500 L 1000,500"
            stroke="currentColor"
            strokeWidth="0.5"
            fill="none"
            style={{ pathLength: lineDraw, willChange: "path-length" }}
            className="text-black dark:text-white"
          />
          <motion.circle cx="500" cy="500" r="200" stroke="#10b981" strokeWidth="1" fill="none" style={{ pathLength: lineDraw, willChange: "path-length" }} />
        </svg>
      </div>

      {/* HERO SECTION */}
      <section className="relative h-[120vh] flex flex-col items-center justify-center pt-24 px-8 overflow-hidden">
        <motion.div style={{ y: heroY, scale: heroScale, willChange: "transform, opacity" }} className="relative z-10 w-full max-w-[1920px] text-center">

          <div className="flex justify-between items-start w-full absolute top-0 left-0 px-10 md:px-20 opacity-40">
            <div className="text-[9px] font-black uppercase tracking-[0.8em] vertical-text dark:text-neutral-400">EXISTENCE_VER_9.1</div>
            <div className="text-[9px] font-black uppercase tracking-[0.8em] vertical-text dark:text-neutral-400">PERSISTENCE_LOCKED</div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-[16vw] md:text-[14rem] leading-[0.65] font-black tracking-[-0.09em] uppercase dark:text-white">
              BEYOND <br />
              <span className="text-emerald-500 italic">BELIEF.</span>
            </h1>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mt-24">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }} className="md:col-span-4 text-left">
              <span className="text-emerald-500 font-black text-[10px] uppercase tracking-widest mb-4 block">The Mission</span>
              <p className="text-2xl font-black leading-none tracking-tighter uppercase dark:text-white">We Build <br /> Realities That <br /> Outlast You.</p>
            </motion.div>

            <motion.div
              className="md:col-span-4 flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Link to="/platform">
                <button className="group relative px-20 py-10 bg-black dark:bg-emerald-500 text-white dark:text-neutral-900 rounded-full font-black text-2xl uppercase tracking-tighter overflow-hidden transition-all hover:bg-emerald-500 dark:hover:bg-emerald-400 hover:scale-110 active:scale-95">
                  <span className="relative z-10">Start Inception</span>
                  <div className="absolute inset-0 bg-emerald-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </button>
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 }} className="md:col-span-4 text-right">
              <span className="text-black dark:text-neutral-400 font-black text-[10px] uppercase tracking-widest mb-4 block">The Result</span>
              <p className="text-2xl font-black leading-none tracking-tighter uppercase dark:text-white">Zero Latency. <br /> Absolute <br /> Sovereignty.</p>
            </motion.div>
          </div>
        </motion.div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] dark:opacity-[0.05]">
          <h2 className="text-[40vw] font-black text-outline uppercase select-none">NUC_9</h2>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="py-20 bg-black dark:bg-[#0a0a0a] overflow-hidden relative border-y border-emerald-500/20">
        <motion.div style={{ x: marquee1, willChange: "transform" }} className="flex gap-20 whitespace-nowrap text-[12rem] font-black text-white/5 uppercase italic">
          <span>REALITY IS COMPILED • SOVEREIGNTY IS EARNED • LEGACY IS BUILT • </span>
          <span>REALITY IS COMPILED • SOVEREIGNTY IS EARNED • LEGACY IS BUILT • </span>
        </motion.div>
        <motion.div style={{ x: marquee2, willChange: "transform" }} className="flex gap-20 whitespace-nowrap text-[12rem] font-black text-emerald-500/10 uppercase italic mt-10">
          <span>THE FUTURE IS PERSISTENT • THE FUTURE IS PERSISTENT • THE FUTURE IS PERSISTENT • </span>
          <span>THE FUTURE IS PERSISTENT • THE FUTURE IS PERSISTENT • THE FUTURE IS PERSISTENT • </span>
        </motion.div>
      </section>

      {/* DENSE GRID */}
      <section className="py-60 relative px-8 max-w-[1920px] mx-auto min-h-[250vh]">
        <ScrollBlock
          className="max-w-xl absolute top-0 left-20"
          title="IMMERSIVE SOVEREIGNTY"
          label="01"
          desc="Your vision is no longer a dream; it is the fundamental law of nature within our compiled frameworks."
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}
          viewport={{ margin: "-100px" }}
          className="w-[50vw] aspect-[4/5] bg-neutral-100 dark:bg-neutral-900 rounded-[100px] overflow-hidden absolute top-40 right-10 shadow-3xl"
        >
          <img src="https://picsum.photos/seed/arch99/1200/1600" loading="lazy" className="w-full h-full object-cover grayscale brightness-90 dark:brightness-50 hover:grayscale-0 dark:hover:brightness-100 transition-all duration-1000" />
          <div className="absolute inset-0 bg-emerald-500/5 mix-blend-multiply" />
          <div className="absolute bottom-20 left-20 text-white">
            <span className="text-[10vw] font-black leading-none italic uppercase tracking-tighter">Legacy.</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 200, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
          viewport={{ margin: "-100px" }}
          className="max-w-4xl mx-auto absolute top-[40%] left-20 z-20 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-2xl p-24 rounded-[80px] border border-neutral-100 dark:border-neutral-800 shadow-2xl"
        >
          <h2 className="text-9xl font-black tracking-tighter mb-12 uppercase leading-[0.8] dark:text-white">INSTANT <br /> <span className="text-neutral-200 dark:text-neutral-700">EXISTENCE.</span></h2>
          <p className="text-3xl text-neutral-500 dark:text-neutral-400 font-medium leading-tight mb-16 tracking-tight">
            We operate the world's most stable noetic mesh, serving over 15,000 persistent universes globally. From high-fashion brand dimensions to cinematic fan-worlds, we provide the silence and the strength for you to build.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-neutral-100 dark:border-neutral-800 pt-16">
            <StatItem label="PERSISTENCE" val="100%" />
            <StatItem label="LATENCY" val="0.0ms" />
            <StatItem label="UPTIME" val="99.99%" />
            <StatItem label="NODES" val="8.4M" />
          </div>
        </motion.div>

        <motion.div style={{ y: sideTextY, willChange: "transform" }} className="absolute right-0 top-1/2 opacity-20 pointer-events-none">
          <div className="text-[180px] font-black text-outline rotate-90 origin-right whitespace-nowrap">GLOBAL_SOVEREIGNTY</div>
        </motion.div>

        <ScrollBlock
          className="max-w-lg absolute bottom-40 right-40 text-right"
          title="THE ARCHITECT'S PROMISE"
          label="02"
          desc="Every world we compile remains active, evolving, and logically sound forever. Time has no power here."
        />

        <div className="absolute bottom-20 left-20 aspect-square w-96 rounded-full border-[20px] border-neutral-50 dark:border-neutral-900 flex items-center justify-center">
          <div className="text-center">
            <div className="text-8xl font-black text-neutral-200 dark:text-neutral-800">ONE.</div>
            <div className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Unified Reality Stack</div>
          </div>
        </div>
      </section>

      {/* HIGHLIGHT */}
      <section className="py-80 bg-neutral-900 dark:bg-black text-white relative overflow-hidden px-8 transition-colors duration-500">
        <div className="max-w-6xl mx-auto">
          <HighlightParagraph text="We do not just create experiences. We define the logic of being. Your world is a living reflection of your intent, powered by the most sophisticated causal engine in existence. It is not a simulation. It is a beginning." />
        </div>
        <div className="absolute top-20 left-20 opacity-10">
          <div className="w-1 h-96 bg-emerald-500" />
          <div className="text-[8px] font-mono mt-4 uppercase tracking-[1em]">Auth_Level_9</div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-20 bg-white dark:bg-[#050505]">
        <div className="max-w-[1920px] mx-auto px-4 grid grid-cols-2 md:grid-cols-6 gap-2">
          {[...Array(12)].map((_, i) => (
            <GalleryCard key={i} index={i} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-80 bg-white dark:bg-[#050505] relative overflow-hidden text-center transition-colors duration-500">
        <div className="relative z-10 max-w-7xl mx-auto px-8">
          <h2 className="text-[14vw] font-black leading-[0.75] tracking-tighter mb-24 uppercase dark:text-white">
            YOUR <br /> <span className="text-neutral-200 dark:text-neutral-800">LEGACY</span> <br /> <span className="text-emerald-500 italic">STARTS.</span>
          </h2>

          <div className="flex flex-col md:flex-row justify-center gap-10 items-center">
            <Link to="/signup">
              <motion.button
                whileHover={{ scale: 1.1, rotate: -2 }} whileTap={{ scale: 0.9 }}
                className="px-24 py-12 bg-black dark:bg-emerald-500 text-white dark:text-neutral-900 rounded-full font-black text-4xl uppercase tracking-tighter shadow-3xl shadow-black/20"
              >
                Secure Access
              </motion.button>
            </Link>
            <Link to="/pricing">
              <motion.button
                whileHover={{ scale: 1.1, rotate: 2 }} whileTap={{ scale: 0.9 }}
                className="px-24 py-12 border-4 border-black dark:border-white text-black dark:text-white rounded-full font-black text-4xl uppercase tracking-tighter hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all"
              >
                Contact Council
              </motion.button>
            </Link>
          </div>

          <div className="mt-60 grid grid-cols-2 md:grid-cols-5 gap-20 border-t border-neutral-100 dark:border-neutral-800 pt-20 text-left opacity-30">
            <MetadataBlock title="AUTH" val="SECURE" />
            <MetadataBlock title="SYNC" val="MESH_READY" />
            <MetadataBlock title="FLUX" val="NOMINAL" />
            <MetadataBlock title="GEOS" val="GLOBAL" />
            <MetadataBlock title="VERSION" val="4.2.0" />
          </div>
        </div>

        <motion.div
          animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
          className="absolute -bottom-[50%] -left-[20%] w-[100vw] aspect-square border-[100px] border-neutral-50 dark:border-neutral-900 rounded-full pointer-events-none"
        />
      </section>
    </div>
  );
};

const ScrollBlock: React.FC<{ title: string, label: string, desc: string, className?: string }> = ({ title, label, desc, className }) => (
  <motion.div
    initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1 }}
    viewport={{ margin: "-50px" }}
    className={`${className} group`}
  >
    <div className="flex items-center gap-8 mb-8">
      <span className="text-6xl font-black text-neutral-100 dark:text-neutral-900 group-hover:text-emerald-500/20 transition-colors">{label}</span>
      <div className="h-[1px] flex-grow bg-neutral-100 dark:bg-neutral-800 group-hover:bg-emerald-500 transition-colors" />
    </div>
    <h3 className="text-6xl font-black mb-8 leading-none tracking-tighter uppercase dark:text-white">{title}</h3>
    <p className="text-2xl text-neutral-400 dark:text-neutral-500 font-medium leading-tight">{desc}</p>
  </motion.div>
);

const StatItem: React.FC<{ label: string, val: string }> = ({ label, val }) => (
  <div className="text-left">
    <div className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-2">{label}</div>
    <div className="text-4xl font-black text-black dark:text-white tracking-tighter">{val}</div>
  </div>
);

const MetadataBlock: React.FC<{ title: string, val: string }> = ({ title, val }) => (
  <div>
    <div className="text-[9px] font-black uppercase tracking-[0.3em] mb-4 dark:text-neutral-400">{title}</div>
    <div className="text-2xl font-black tracking-tighter text-black dark:text-white uppercase">{val}</div>
  </div>
);

const GalleryCard: React.FC<{ index: number }> = ({ index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
      transition={{ duration: 0.8, delay: index * 0.03 }}
      className={`relative aspect-[3/4] overflow-hidden group bg-neutral-100 dark:bg-neutral-900 ${index % 5 === 0 ? 'md:col-span-2' : ''}`}
    >
      <img src={`https://picsum.photos/seed/nuc_gal_${index}/800/1200`} loading="lazy" className="w-full h-full object-cover grayscale brightness-90 dark:brightness-50 group-hover:grayscale-0 dark:group-hover:brightness-100 group-hover:scale-110 transition-all duration-1000" />
      <div className="absolute inset-0 bg-neutral-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
        <span className="text-emerald-500 font-black text-[10px] uppercase tracking-widest mb-2">WORLD_NODE_{index + 100}</span>
        <h4 className="text-4xl font-black text-white italic uppercase tracking-tighter">Compiled.</h4>
      </div>
    </motion.div>
  );
};

const HighlightParagraph: React.FC<{ text: string }> = ({ text }) => {
  const words = text.split(" ");
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-2 text-7xl font-black uppercase leading-[0.85] tracking-tighter">
      {words.map((word, i) => (
        <WordHighlight key={i} word={word} />
      ))}
    </div>
  );
};

const WordHighlight: React.FC<{ word: string }> = ({ word }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });

  return (
    <motion.span
      ref={ref}
      animate={{
        color: isInView ? "#10b981" : (document.documentElement.classList.contains('dark') ? "#1a1a1a" : "#e5e5e5"),
        scale: isInView ? 1 : 0.98
      }}
      className="transition-all duration-500 cursor-default"
    >
      {word}
    </motion.span>
  );
};

export default Home;
