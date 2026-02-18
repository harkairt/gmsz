import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import ExpandableCard from '../components/ExpandableCard';
import CollapsibleSection from '../components/CollapsibleSection';
import EntitasVisualization, { type SceneStage } from '../components/EntitasVisualization';
import { alapfogalmak } from '../data/content';

// Map alapfogalmak terms to scene stages
const termToStage: Record<string, SceneStage> = {
  'Entitás': 'entitas',
  'Attribútum': 'attributum',
  'Aktivitás': 'aktivitas',
  'Relevancia': 'relevancia',
  'Cél': 'cel',
  'Feladat': 'feladat',
};

export default function Alapfogalmak() {
  const [stage, setStage] = useState<SceneStage>('empty');
  const [unlockedIndex, setUnlockedIndex] = useState(0);

  // Handle card activation
  const handleCardActivate = useCallback((term: string, index: number) => {
    const newStage = termToStage[term];
    if (newStage) {
      setStage(newStage);
    }
    // Unlock the next card
    if (index >= unlockedIndex) {
      setUnlockedIndex(index + 1);
    }
  }, [unlockedIndex]);

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

        {/* 3D Visualization - replaces the static "Az alapképlet" box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-16"
        >
          <div className="text-center mb-4">
            <h2 className="text-2xl font-semibold text-text-primary">
              Az alapképlet
            </h2>
            <p className="text-text-secondary text-sm mt-1">
              Kattints a fogalmakra a vizualizáció aktiválásához
            </p>
          </div>
          <EntitasVisualization stage={stage} />
        </motion.div>

        {/* Definition cards - expandable with sequential unlocking */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {alapfogalmak.map((item, index) => (
            <ExpandableCard
              key={item.term}
              term={item.term}
              definition={item.definition}
              details={item.details}
              defaultOpen={false}
              disabled={index > unlockedIndex}
              onActivate={() => handleCardActivate(item.term, index)}
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
