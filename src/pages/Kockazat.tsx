import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import CollapsibleSection from '../components/CollapsibleSection';
import ExpandableStep from '../components/ExpandableStep';
import { kockazatKezeles } from '../data/content';

export default function Kockazat() {
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
            <span className="gradient-text">Kockázatkezelés</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            A kockázatok szisztematikus azonosítása és kezelése a módszertani
            gondolkodás segítségével.
          </p>
        </motion.div>

        {/* Process flow - collapsible with expandable steps inside */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-16"
        >
          <CollapsibleSection title={kockazatKezeles.title} defaultOpen={false}>
            <div className="pt-4 space-y-3">
              {kockazatKezeles.steps.map((step, index) => (
                <ExpandableStep
                  key={index}
                  stepNumber={index + 1}
                  title={step.split(' - ')[0] || step}
                  description={step.split(' - ')[1] || step}
                  defaultOpen={false}
                />
              ))}
            </div>
          </CollapsibleSection>
        </motion.div>

        {/* Risk matrix - collapsible section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <CollapsibleSection title={kockazatKezeles.matrix.title} defaultOpen={false}>
            <div className="pt-4">
              <p className="text-text-secondary text-center mb-8">
                {kockazatKezeles.matrix.description}
              </p>

              {/* Visual matrix */}
              <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
                {/* Headers */}
                <div></div>
                <div className="text-center text-sm font-medium text-accent-cyan">
                  Alacsony hatás
                </div>
                <div className="text-center text-sm font-medium text-accent-cyan">
                  Magas hatás
                </div>

                {/* High probability row */}
                <div className="text-sm font-medium text-accent-cyan text-right pr-4 flex items-center justify-end">
                  Magas valószínűség
                </div>
                <div className="aspect-square rounded-lg bg-secondary-orange/20 border border-secondary-orange/40 flex items-center justify-center">
                  <span className="text-2xl">⚠️</span>
                </div>
                <div className="aspect-square rounded-lg bg-secondary-pink/25 border border-secondary-pink/40 flex items-center justify-center">
                  <span className="text-2xl">🚨</span>
                </div>

                {/* Low probability row */}
                <div className="text-sm font-medium text-accent-cyan text-right pr-4 flex items-center justify-end">
                  Alacsony valószínűség
                </div>
                <div className="aspect-square rounded-lg bg-primary-blue/15 border border-primary-blue/30 flex items-center justify-center">
                  <span className="text-2xl">✅</span>
                </div>
                <div className="aspect-square rounded-lg bg-secondary-orange/15 border border-secondary-orange/30 flex items-center justify-center">
                  <span className="text-2xl">👀</span>
                </div>
              </div>

              {/* Legend */}
              <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span>🚨</span>
                  <span className="text-text-secondary">Azonnali kezelés</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>⚠️</span>
                  <span className="text-text-secondary">Figyelni kell</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>👀</span>
                  <span className="text-text-secondary">Monitorozás</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>✅</span>
                  <span className="text-text-secondary">Elfogadható</span>
                </div>
              </div>
            </div>
          </CollapsibleSection>
        </motion.div>

        {/* Key takeaway - always visible */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-block p-8 rounded-lg bg-white border border-border card-shadow">
            <h3 className="text-xl font-bold text-text-primary mb-4">
              Kulcs gondolat
            </h3>
            <p className="text-text-secondary max-w-md">
              A kockázatkezelés nem a kockázatok elkerüléséről szól, hanem a
              tudatos döntéshozatalról és a felkészülésről.
            </p>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
