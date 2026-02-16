import { motion } from 'framer-motion';
import { useState } from 'react';
import PageTransition from '../components/PageTransition';
import Card from '../components/Card';
import { sprintTervezes, storyTervezes } from '../data/content';

type TabType = 'sprint' | 'story';

export default function Tervezes() {
  const [activeTab, setActiveTab] = useState<TabType>('sprint');

  const tabs = [
    { id: 'sprint' as const, label: 'Sprint tervezés', data: sprintTervezes },
    { id: 'story' as const, label: 'Story tervezés', data: storyTervezes },
  ];

  const currentData = activeTab === 'sprint' ? sprintTervezes : storyTervezes;

  return (
    <PageTransition>
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Tervezés</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            A módszertani gondolkodás alkalmazása a Sprint és Story szintű
            tervezésben.
          </p>
        </motion.div>

        {/* Tab switcher */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex p-1 rounded-xl bg-white/5 border border-white/10">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-6 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-white'
                    : 'text-text-secondary hover:text-white'
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTabBg"
                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary-purple to-primary-blue"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Planning steps */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-4"
        >
          {currentData.map((item, index) => (
            <Card key={item.step} delay={index} variant="default">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-primary-purple to-primary-blue flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {item.step}
                  </h3>
                  <p className="text-text-secondary">{item.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </motion.div>

        {/* Interaction matrix visual */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-16"
        >
          <Card variant="gradient" className="p-8">
            <h3 className="text-2xl font-bold text-white mb-4 text-center">
              Interakciós mátrix
            </h3>
            <p className="text-text-secondary text-center mb-8">
              Az entitások és attribútumok kapcsolatainak feltérképezése
            </p>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[500px]">
                <thead>
                  <tr>
                    <th className="p-3 text-left text-text-secondary"></th>
                    <th className="p-3 text-center text-sm font-medium text-accent-cyan">
                      Fejlesztő
                    </th>
                    <th className="p-3 text-center text-sm font-medium text-accent-cyan">
                      PO
                    </th>
                    <th className="p-3 text-center text-sm font-medium text-accent-cyan">
                      Kód
                    </th>
                    <th className="p-3 text-center text-sm font-medium text-accent-cyan">
                      User
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {['Fejlesztő', 'PO', 'Kód', 'User'].map((row, i) => (
                    <tr key={row}>
                      <td className="p-3 text-sm font-medium text-accent-cyan">
                        {row}
                      </td>
                      {[0, 1, 2, 3].map((col) => (
                        <td key={col} className="p-3 text-center">
                          <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: (i * 4 + col) * 0.05 }}
                            className={`w-8 h-8 mx-auto rounded-lg ${
                              i === col
                                ? 'bg-white/10'
                                : (i + col) % 2 === 0
                                ? 'bg-primary-purple/30'
                                : 'bg-primary-blue/30'
                            }`}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-xs text-text-secondary/70 text-center mt-4">
              A színes cellák jelzik a releváns kapcsolatokat az entitások között
            </p>
          </Card>
        </motion.div>
      </div>
    </PageTransition>
  );
}
