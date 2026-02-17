import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ExpandableStepProps {
  stepNumber: number;
  title: string;
  description: string;
  defaultOpen?: boolean;
}

export default function ExpandableStep({
  stepNumber,
  title,
  description,
  defaultOpen = false,
}: ExpandableStepProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="rounded-lg border border-border bg-white card-shadow hover:border-primary-purple/50 transition-all duration-150">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 text-left hover:bg-background-muted/30 transition-colors rounded-lg"
      >
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-primary-purple to-primary-blue flex items-center justify-center text-white font-bold">
            {stepNumber}
          </div>
          <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
        </div>
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
            <div className="px-4 pb-4 pl-18">
              <div className="ml-14">
                <p className="text-text-secondary">{description}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
