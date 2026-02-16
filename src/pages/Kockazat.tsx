import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import Card from '../components/Card';
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

        {/* Process flow */}
        <div className="mb-16">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold text-white mb-8"
          >
            {kockazatKezeles.title}
          </motion.h2>

          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-purple via-primary-blue to-accent-cyan hidden md:block" />

            <div className="space-y-6">
              {kockazatKezeles.steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="relative flex items-start gap-6"
                >
                  {/* Step number */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-primary-purple to-primary-blue flex items-center justify-center text-white font-bold text-lg z-10">
                    {index + 1}
                  </div>

                  {/* Step content */}
                  <div className="flex-1 pb-6">
                    <Card variant="default" delay={0}>
                      <p className="text-white">{step}</p>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Risk matrix */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card variant="gradient" className="p-8">
            <h3 className="text-2xl font-bold text-white mb-2 text-center">
              {kockazatKezeles.matrix.title}
            </h3>
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
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="aspect-square rounded-xl bg-secondary-orange/30 border border-secondary-orange/50 flex items-center justify-center"
              >
                <span className="text-2xl">⚠️</span>
              </motion.div>
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="aspect-square rounded-xl bg-secondary-pink/40 border border-secondary-pink/60 flex items-center justify-center"
              >
                <span className="text-2xl">🚨</span>
              </motion.div>

              {/* Low probability row */}
              <div className="text-sm font-medium text-accent-cyan text-right pr-4 flex items-center justify-end">
                Alacsony valószínűség
              </div>
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="aspect-square rounded-xl bg-primary-blue/20 border border-primary-blue/40 flex items-center justify-center"
              >
                <span className="text-2xl">✅</span>
              </motion.div>
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="aspect-square rounded-xl bg-secondary-orange/20 border border-secondary-orange/40 flex items-center justify-center"
              >
                <span className="text-2xl">👀</span>
              </motion.div>
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
          </Card>
        </motion.div>

        {/* Key takeaway */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-block p-8 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-4">
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
