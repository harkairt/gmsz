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
