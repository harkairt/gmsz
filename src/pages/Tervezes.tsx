import { motion } from 'framer-motion';
import { useState } from 'react';
import PageTransition from '../components/PageTransition';
import ExpandableStep from '../components/ExpandableStep';
import CollapsibleSection from '../components/CollapsibleSection';
import { sprintTervezes, storyTervezes } from '../data/content';

type TabType = 'sprint' | 'story';

export default function Tervezes() {
  const [activeTab, setActiveTab] = useState<TabType>('sprint');

  const tabs = [
    { id: 'sprint' as const, label: 'Sprint', data: sprintTervezes },
    { id: 'story' as const, label: 'User Story', data: storyTervezes },
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
        </motion.div>

        {/* Tab switcher */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex p-1 rounded-lg bg-background-muted border border-border">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-6 py-3 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-white'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTabBg"
                    className="absolute inset-0 rounded-md bg-gradient-to-r from-primary-purple to-primary-blue"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Planning steps - expandable, collapsed by default */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-3"
        >
          {currentData.map((item, index) => (
            <ExpandableStep
              key={`${activeTab}-${item.step}`}
              stepNumber={index + 1}
              title={item.step}
              description={item.description}
              defaultOpen={false}
            />
          ))}
        </motion.div>

        {/* Interaction matrix - collapsible section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-16"
        >
          <CollapsibleSection title="Interakciós mátrix" defaultOpen={false}>
            <div className="pt-4">
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
                            <div
                              className={`w-8 h-8 mx-auto rounded-md ${
                                i === col
                                  ? 'bg-background-muted'
                                  : (i + col) % 2 === 0
                                  ? 'bg-primary-purple/20'
                                  : 'bg-primary-blue/20'
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
            </div>
          </CollapsibleSection>
        </motion.div>
      </div>
    </PageTransition>
  );
}
