import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import Definition from '../components/Definition';
import { alapfogalmak } from '../data/content';

export default function Alapfogalmak() {
  return (
    <PageTransition>
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Alapfogalmak</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            A gondolkodás módszertanának alapvető építőkövei, amelyek segítenek
            strukturáltan megközelíteni bármilyen problémát.
          </p>
        </motion.div>

        {/* Concept visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-16 p-8 rounded-3xl bg-gradient-to-br from-primary-purple/10 to-primary-blue/10 border border-white/10"
        >
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-semibold text-white">
              Az alapképlet
            </h2>
            <div className="flex items-center justify-center gap-4 flex-wrap text-lg">
              <span className="px-4 py-2 rounded-lg bg-primary-purple/20 text-primary-purple font-medium">
                Entitás
              </span>
              <span className="text-text-secondary">+</span>
              <span className="px-4 py-2 rounded-lg bg-primary-blue/20 text-primary-blue font-medium">
                Attribútum
              </span>
              <span className="text-text-secondary">→</span>
              <span className="px-4 py-2 rounded-lg bg-accent-cyan/20 text-accent-cyan font-medium">
                Aktivitás
              </span>
              <span className="text-text-secondary">→</span>
              <span className="px-4 py-2 rounded-lg bg-secondary-pink/20 text-secondary-pink font-medium">
                Cél
              </span>
            </div>
          </div>
        </motion.div>

        {/* Definition cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {alapfogalmak.map((item, index) => (
            <Definition
              key={item.term}
              term={item.term}
              definition={item.definition}
              details={item.details}
              index={index}
            />
          ))}
        </div>

        {/* 2R highlight */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-block p-8 rounded-2xl bg-gradient-to-r from-secondary-pink/10 to-secondary-orange/10 border border-secondary-pink/30">
            <h3 className="text-2xl font-bold mb-4 gradient-text-secondary">
              A jó cél: 2R
            </h3>
            <div className="flex items-center justify-center gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary-pink">R</div>
                <div className="text-sm text-text-secondary">Reális</div>
              </div>
              <div className="text-4xl text-text-secondary">+</div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary-orange">R</div>
                <div className="text-sm text-text-secondary">Releváns</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
