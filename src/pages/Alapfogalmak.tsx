import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import ExpandableCard from '../components/ExpandableCard';
import CollapsibleSection from '../components/CollapsibleSection';
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

        {/* Concept visual - always visible */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-16 p-8 rounded-lg bg-gradient-to-br from-primary-purple/10 to-primary-blue/10 border border-border"
        >
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-semibold text-text-primary">
              Az alapképlet
            </h2>
            <div className="flex items-center justify-center gap-4 flex-wrap text-lg">
              <span className="px-4 py-2 rounded-md bg-primary-purple/15 text-primary-purple font-medium">
                Entitás
              </span>
              <span className="text-text-secondary">+</span>
              <span className="px-4 py-2 rounded-md bg-primary-blue/15 text-primary-blue font-medium">
                Attribútum
              </span>
              <span className="text-text-secondary">→</span>
              <span className="px-4 py-2 rounded-md bg-accent-cyan/15 text-accent-cyan font-medium">
                Aktivitás
              </span>
              <span className="text-text-secondary">→</span>
              <span className="px-4 py-2 rounded-md bg-secondary-pink/15 text-secondary-pink font-medium">
                Cél
              </span>
            </div>
          </div>
        </motion.div>

        {/* Definition cards - expandable, collapsed by default */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {alapfogalmak.map((item) => (
            <ExpandableCard
              key={item.term}
              term={item.term}
              definition={item.definition}
              details={item.details}
              defaultOpen={false}
            />
          ))}
        </motion.div>

        {/* 2R highlight - collapsible section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-16"
        >
          <CollapsibleSection title="A jó cél: 2R" defaultOpen={false}>
            <div className="pt-2">
              <div className="inline-block p-6 rounded-lg bg-gradient-to-r from-secondary-pink/10 to-secondary-orange/10 border border-secondary-pink/20">
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
              <p className="mt-4 text-text-secondary text-sm">
                Reális: Meg tudod csinálni az adott erőforrásokkal.<br />
                Releváns: Kapcsolódik ahhoz, ami igazán számít.
              </p>
            </div>
          </CollapsibleSection>
        </motion.div>
      </div>
    </PageTransition>
  );
}
