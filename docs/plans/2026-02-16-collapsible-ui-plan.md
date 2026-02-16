# Collapsible UI Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Split overwhelming presentation content into digestible collapsible sections and expandable cards.

**Architecture:** Create two reusable components (CollapsibleSection, ExpandableCard) using framer-motion's AnimatePresence for smooth expand/collapse animations. Refactor three content pages to use these components. No arrows — hover states provide affordance.

**Tech Stack:** React 18, TypeScript, framer-motion, Tailwind CSS

---

## Task 1: Create CollapsibleSection Component

**Files:**
- Create: `src/components/CollapsibleSection.tsx`

**Step 1: Create the component file**

```tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

interface CollapsibleSectionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export default function CollapsibleSection({
  title,
  children,
  defaultOpen = false,
  className = '',
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`rounded-lg border border-border bg-white card-shadow ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-background-muted/50 transition-colors rounded-lg"
      >
        <h3 className="text-xl font-bold gradient-text">{title}</h3>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-text-secondary opacity-0 group-hover:opacity-100"
        >
          {/* No arrow as per design */}
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

**Step 2: Verify component renders**

Run: `npm run dev`
Open browser, check console for errors.

**Step 3: Commit**

```bash
git add src/components/CollapsibleSection.tsx
git commit -m "feat: add CollapsibleSection component"
```

---

## Task 2: Create ExpandableCard Component

**Files:**
- Create: `src/components/ExpandableCard.tsx`

**Step 1: Create the component file**

```tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ExpandableCardProps {
  term: string;
  definition: string;
  details?: string;
  index: number;
  defaultOpen?: boolean;
}

export default function ExpandableCard({
  term,
  definition,
  details,
  index,
  defaultOpen = false,
}: ExpandableCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="rounded-lg border border-border bg-white card-shadow overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-5 py-4 text-left transition-all duration-200 ${
          isOpen
            ? 'bg-gradient-to-r from-primary-purple/5 to-primary-blue/5'
            : 'hover:bg-background-muted/50'
        }`}
      >
        <h3 className="text-lg font-bold gradient-text">{term}</h3>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-4 space-y-2 border-t border-border/50">
              <p className="text-base text-text-primary font-medium pt-3">
                "{definition}"
              </p>
              {details && (
                <p className="text-sm text-text-secondary leading-relaxed">
                  {details}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
```

**Step 2: Verify component renders**

Run: `npm run dev`
Open browser, check console for errors.

**Step 3: Commit**

```bash
git add src/components/ExpandableCard.tsx
git commit -m "feat: add ExpandableCard component"
```

---

## Task 3: Create ExpandableStep Component

**Files:**
- Create: `src/components/ExpandableStep.tsx`

**Step 1: Create the component file**

This is for the planning steps in Tervezés and Kockázat pages.

```tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ExpandableStepProps {
  step: string;
  description: string;
  index: number;
  defaultOpen?: boolean;
}

export default function ExpandableStep({
  step,
  description,
  index,
  defaultOpen = false,
}: ExpandableStepProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="rounded-lg border border-border bg-white card-shadow overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-5 py-4 text-left flex items-start gap-4 transition-all duration-200 ${
          isOpen
            ? 'bg-gradient-to-r from-primary-purple/5 to-primary-blue/5'
            : 'hover:bg-background-muted/50'
        }`}
      >
        <div className="flex-shrink-0 w-8 h-8 rounded-md bg-gradient-to-br from-primary-purple to-primary-blue flex items-center justify-center text-white font-bold text-sm">
          {index + 1}
        </div>
        <h3 className="text-base font-semibold text-text-primary pt-1">{step}</h3>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-4 pl-[4.25rem] border-t border-border/50">
              <p className="text-sm text-text-secondary leading-relaxed pt-3">
                {description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/ExpandableStep.tsx
git commit -m "feat: add ExpandableStep component for planning steps"
```

---

## Task 4: Refactor Alapfogalmak Page

**Files:**
- Modify: `src/pages/Alapfogalmak.tsx`

**Step 1: Replace Definition with ExpandableCard**

Replace the entire file content:

```tsx
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
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Alapfogalmak</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            A gondolkodás módszertanának alapvető építőkövei, amelyek segítenek
            strukturáltan megközelíteni bármilyen problémát.
          </p>
        </motion.div>

        {/* Formula visual - always visible */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-12 p-6 rounded-lg bg-gradient-to-br from-primary-purple/10 to-primary-blue/10 border border-border"
        >
          <div className="text-center space-y-4">
            <h2 className="text-xl font-semibold text-text-primary">
              Az alapképlet
            </h2>
            <div className="flex items-center justify-center gap-3 flex-wrap text-base">
              <span className="px-3 py-1.5 rounded-md bg-primary-purple/15 text-primary-purple font-medium">
                Entitás
              </span>
              <span className="text-text-secondary">+</span>
              <span className="px-3 py-1.5 rounded-md bg-primary-blue/15 text-primary-blue font-medium">
                Attribútum
              </span>
              <span className="text-text-secondary">→</span>
              <span className="px-3 py-1.5 rounded-md bg-accent-cyan/15 text-accent-cyan font-medium">
                Aktivitás
              </span>
              <span className="text-text-secondary">→</span>
              <span className="px-3 py-1.5 rounded-md bg-secondary-pink/15 text-secondary-pink font-medium">
                Cél
              </span>
            </div>
          </div>
        </motion.div>

        {/* Expandable definition cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {alapfogalmak.map((item, index) => (
            <ExpandableCard
              key={item.term}
              term={item.term}
              definition={item.definition}
              details={item.details}
              index={index}
            />
          ))}
        </div>

        {/* 2R section - collapsible */}
        <CollapsibleSection title="A jó cél: 2R" className="max-w-lg mx-auto">
          <div className="flex items-center justify-center gap-8 py-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary-pink">R</div>
              <div className="text-sm text-text-secondary">Reális</div>
            </div>
            <div className="text-3xl text-text-secondary">+</div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary-orange">R</div>
              <div className="text-sm text-text-secondary">Releváns</div>
            </div>
          </div>
        </CollapsibleSection>
      </div>
    </PageTransition>
  );
}
```

**Step 2: Verify in browser**

Run: `npm run dev`
Navigate to `/alapfogalmak`, click cards to expand/collapse.

**Step 3: Commit**

```bash
git add src/pages/Alapfogalmak.tsx
git commit -m "refactor: Alapfogalmak page with expandable cards"
```

---

## Task 5: Refactor Tervezes Page

**Files:**
- Modify: `src/pages/Tervezes.tsx`

**Step 1: Replace with expandable steps**

Replace the entire file content:

```tsx
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
    { id: 'sprint' as const, label: 'Sprint tervezés', data: sprintTervezes },
    { id: 'story' as const, label: 'Story tervezés', data: storyTervezes },
  ];

  const currentData = activeTab === 'sprint' ? sprintTervezes : storyTervezes;

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
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
          className="flex justify-center mb-10"
        >
          <div className="inline-flex p-1 rounded-lg bg-background-muted border border-border">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-5 py-2.5 rounded-md text-sm font-medium transition-colors ${
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

        {/* Expandable planning steps */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-3 mb-12"
        >
          {currentData.map((item, index) => (
            <ExpandableStep
              key={item.step}
              step={item.step}
              description={item.description}
              index={index}
            />
          ))}
        </motion.div>

        {/* Interaction matrix - collapsible */}
        <CollapsibleSection title="Interakciós mátrix">
          <div className="py-4">
            <p className="text-text-secondary text-center mb-6 text-sm">
              Az entitások és attribútumok kapcsolatainak feltérképezése
            </p>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[400px]">
                <thead>
                  <tr>
                    <th className="p-2 text-left text-text-secondary"></th>
                    <th className="p-2 text-center text-xs font-medium text-accent-cyan">
                      Fejlesztő
                    </th>
                    <th className="p-2 text-center text-xs font-medium text-accent-cyan">
                      PO
                    </th>
                    <th className="p-2 text-center text-xs font-medium text-accent-cyan">
                      Kód
                    </th>
                    <th className="p-2 text-center text-xs font-medium text-accent-cyan">
                      User
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {['Fejlesztő', 'PO', 'Kód', 'User'].map((row, i) => (
                    <tr key={row}>
                      <td className="p-2 text-xs font-medium text-accent-cyan">
                        {row}
                      </td>
                      {[0, 1, 2, 3].map((col) => (
                        <td key={col} className="p-2 text-center">
                          <div
                            className={`w-6 h-6 mx-auto rounded ${
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
              A színes cellák jelzik a releváns kapcsolatokat
            </p>
          </div>
        </CollapsibleSection>
      </div>
    </PageTransition>
  );
}
```

**Step 2: Verify in browser**

Navigate to `/tervezes`, test tab switching and step expansion.

**Step 3: Commit**

```bash
git add src/pages/Tervezes.tsx
git commit -m "refactor: Tervezes page with expandable steps"
```

---

## Task 6: Refactor Kockazat Page

**Files:**
- Modify: `src/pages/Kockazat.tsx`

**Step 1: Replace with collapsible sections**

Replace the entire file content:

```tsx
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import CollapsibleSection from '../components/CollapsibleSection';
import ExpandableStep from '../components/ExpandableStep';
import { kockazatKezeles } from '../data/content';

export default function Kockazat() {
  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Kockázatkezelés</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            A kockázatok szisztematikus azonosítása és kezelése a módszertani
            gondolkodás segítségével.
          </p>
        </motion.div>

        {/* Process flow - collapsible section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8"
        >
          <CollapsibleSection title={kockazatKezeles.title} defaultOpen={true}>
            <div className="space-y-3 pt-2">
              {kockazatKezeles.steps.map((step, index) => (
                <ExpandableStep
                  key={index}
                  step={`${index + 1}. lépés`}
                  description={step}
                  index={index}
                  defaultOpen={index === 0}
                />
              ))}
            </div>
          </CollapsibleSection>
        </motion.div>

        {/* Risk matrix - collapsible */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-8"
        >
          <CollapsibleSection title={kockazatKezeles.matrix.title}>
            <div className="py-4">
              <p className="text-text-secondary text-center mb-6 text-sm">
                {kockazatKezeles.matrix.description}
              </p>

              {/* Visual matrix */}
              <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
                {/* Headers */}
                <div></div>
                <div className="text-center text-xs font-medium text-accent-cyan">
                  Alacsony hatás
                </div>
                <div className="text-center text-xs font-medium text-accent-cyan">
                  Magas hatás
                </div>

                {/* High probability row */}
                <div className="text-xs font-medium text-accent-cyan text-right pr-2 flex items-center justify-end">
                  Magas valószínűség
                </div>
                <div className="aspect-square rounded-lg bg-secondary-orange/20 border border-secondary-orange/40 flex items-center justify-center">
                  <span className="text-xl">⚠️</span>
                </div>
                <div className="aspect-square rounded-lg bg-secondary-pink/25 border border-secondary-pink/40 flex items-center justify-center">
                  <span className="text-xl">🚨</span>
                </div>

                {/* Low probability row */}
                <div className="text-xs font-medium text-accent-cyan text-right pr-2 flex items-center justify-end">
                  Alacsony valószínűség
                </div>
                <div className="aspect-square rounded-lg bg-primary-blue/15 border border-primary-blue/30 flex items-center justify-center">
                  <span className="text-xl">✅</span>
                </div>
                <div className="aspect-square rounded-lg bg-secondary-orange/15 border border-secondary-orange/30 flex items-center justify-center">
                  <span className="text-xl">👀</span>
                </div>
              </div>

              {/* Legend */}
              <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs">
                <div className="flex items-center gap-1">
                  <span>🚨</span>
                  <span className="text-text-secondary">Azonnali kezelés</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>⚠️</span>
                  <span className="text-text-secondary">Figyelni kell</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>👀</span>
                  <span className="text-text-secondary">Monitorozás</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>✅</span>
                  <span className="text-text-secondary">Elfogadható</span>
                </div>
              </div>
            </div>
          </CollapsibleSection>
        </motion.div>

        {/* Key takeaway - always visible */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-center"
        >
          <div className="inline-block p-6 rounded-lg bg-white border border-border card-shadow max-w-md">
            <h3 className="text-lg font-bold text-text-primary mb-3">
              Kulcs gondolat
            </h3>
            <p className="text-text-secondary text-sm">
              A kockázatkezelés nem a kockázatok elkerüléséről szól, hanem a
              tudatos döntéshozatalról és a felkészülésről.
            </p>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
```

**Step 2: Verify in browser**

Navigate to `/kockazat`, test section expansion.

**Step 3: Commit**

```bash
git add src/pages/Kockazat.tsx
git commit -m "refactor: Kockazat page with collapsible sections"
```

---

## Task 7: Remove Unused Definition Component

**Files:**
- Delete: `src/components/Definition.tsx`

**Step 1: Delete the file**

```bash
rm src/components/Definition.tsx
```

**Step 2: Verify no import errors**

Run: `npm run dev`
Check console for missing import errors.

**Step 3: Commit**

```bash
git add -A
git commit -m "chore: remove unused Definition component"
```

---

## Task 8: Final Verification

**Step 1: Full test of all pages**

1. Navigate to `/` — verify Home looks correct
2. Navigate to `/alapfogalmak` — click all 5 cards, test 2R section
3. Navigate to `/tervezes` — switch tabs, expand steps, open matrix
4. Navigate to `/kockazat` — expand process section, matrix, verify takeaway visible

**Step 2: Check responsive behavior**

Resize browser to mobile width, verify cards stack properly.

**Step 3: Final commit if any adjustments**

```bash
git add -A
git commit -m "refactor: complete collapsible UI implementation"
```

---

## Summary

| Task | Component/Page | Type |
|------|---------------|------|
| 1 | CollapsibleSection | Create |
| 2 | ExpandableCard | Create |
| 3 | ExpandableStep | Create |
| 4 | Alapfogalmak | Refactor |
| 5 | Tervezes | Refactor |
| 6 | Kockazat | Refactor |
| 7 | Definition | Delete |
| 8 | Final verification | Test |

**Estimated time:** 30-45 minutes
