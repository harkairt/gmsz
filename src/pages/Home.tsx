import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { homeContent } from '../data/content';

export default function Home() {
  return (
    <PageTransition>
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Animated background decoration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="absolute inset-0 -z-10 overflow-hidden"
          >
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-purple/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-blue/10 rounded-full blur-3xl" />
          </motion.div>

          {/* Name card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="inline-flex flex-col items-center gap-1 px-8 py-5 rounded-lg bg-white border border-border card-shadow">
              <span className="text-2xl md:text-3xl font-bold tracking-tight">
                <span className="text-gray-300">Har</span>
                <span className="gradient-text text-3xl md:text-4xl">Kai</span>
                <span className="inline-block w-[0.04em]" />
                <span className="gradient-text text-3xl md:text-4xl">ró</span>
                <span className="text-gray-300">bert Tamás</span>
              </span>
              <span className="text-sm text-text-secondary">
                programtervező informatikus
              </span>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight"
          >
            <span className="gradient-text">{homeContent.title}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-xl md:text-2xl text-text-secondary"
          >
            {homeContent.subtitle}
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Link to="/alapfogalmak">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-md bg-gradient-to-r from-primary-purple to-primary-blue text-white font-semibold text-lg shadow-lg shadow-primary-purple/20 hover:shadow-primary-purple/30 transition-shadow"
              >
                Kezdjük el →
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
