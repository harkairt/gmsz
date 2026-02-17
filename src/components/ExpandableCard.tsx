import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ExpandableCardProps {
  term: string;
  definition: string;
  details?: string;
  defaultOpen?: boolean;
}

export default function ExpandableCard({
  term,
  definition,
  details,
  defaultOpen = false,
}: ExpandableCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="rounded-lg border border-border bg-white card-shadow hover:border-primary-purple/50 transition-all duration-150">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left hover:bg-background-muted/30 transition-colors rounded-lg"
      >
        <h3 className="text-xl font-bold gradient-text">{term}</h3>
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
            <div className="px-6 pb-6 space-y-3">
              <p className="text-lg text-text-primary font-medium">
                "{definition}"
              </p>

              {details && (
                <p className="text-text-secondary text-sm leading-relaxed">
                  {details}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
