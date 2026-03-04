
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });
  const location = useLocation();
  const { scrollY } = useScroll();

  const taglineOpacity = useTransform(scrollY, [0, 100], [0.2, 0.7]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const navLinks = [
    { name: 'Product', path: '/' },
    { name: 'Realms', path: '/realms' },
    { name: 'Platform', path: '/platform' },
    { name: 'Compiler', path: '/compiler' },
    { name: 'Solutions', path: '/solutions' },
    { name: 'Research', path: '/research' },
    { name: 'Docs', path: '/docs' },
    { name: 'Pricing', path: '/pricing' },
  ];

  const transitionConfig = {
    duration: 0.8,
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
  };

  return (
    <motion.nav
      initial={false}
      animate={{
        height: scrolled ? 72 : 110,
        backgroundColor: scrolled
          ? (isDark ? 'rgba(5, 5, 5, 0.9)' : 'rgba(255, 255, 255, 0.9)')
          : 'rgba(255, 255, 255, 0)',
        backdropFilter: scrolled ? 'blur(24px)' : 'blur(0px)',
        paddingLeft: scrolled ? '3rem' : '4rem',
        paddingRight: scrolled ? '3rem' : '4rem',
      }}
      transition={transitionConfig}
      className="fixed top-0 left-0 right-0 z-[500] flex items-center transition-all"
    >
      <div className="w-full max-w-[2400px] mx-auto flex items-center justify-between">

        <Link to="/" className="flex items-center gap-6 group">
          <div className="relative w-12 h-12 flex items-center justify-center">
            <motion.div
              animate={{ rotate: scrolled ? 90 : 0, scale: scrolled ? 0.8 : 1 }}
              className="absolute inset-0 border border-neutral-200 dark:border-neutral-800 rounded-xl"
            />
            <div className="w-7 h-7 bg-emerald-500 rounded flex items-center justify-center shadow-lg">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-black text-2xl dark:text-white leading-none">NUC<span className="text-emerald-500">.</span></span>
            <motion.span style={{ opacity: taglineOpacity }} className="text-[7px] font-black uppercase tracking-[0.5em] text-neutral-400 mt-1">Sovereign_OS</motion.span>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 text-[10px] font-black uppercase tracking-[0.3em] transition-all relative ${location.pathname === link.path ? 'text-emerald-500' : 'text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="w-px h-6 bg-neutral-100 dark:bg-neutral-800 mx-4" />
          <span className="text-[9px] font-mono text-neutral-300 dark:text-neutral-600 tracking-widest uppercase">Nodes: 8.4M</span>
        </div>

        <div className="flex items-center gap-8">
          <motion.button onClick={toggleTheme} className="text-neutral-400 hover:text-emerald-500 transition-colors">
            {isDark ? <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" /></svg> : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>}
          </motion.button>

          <div className="flex items-center gap-6">
            <Link to="/login" className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400 hover:text-emerald-500 transition-all">Login</Link>
            <Link to="/signup" className="px-8 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:bg-emerald-500 dark:hover:bg-emerald-500 hover:text-white transition-all shadow-xl">Sign Up</Link>
          </div>
        </div>

      </div>
    </motion.nav>
  );
};

export default Navbar;
