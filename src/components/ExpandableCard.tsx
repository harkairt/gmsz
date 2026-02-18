import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ExpandableCardProps {
  term: string;
  definition: string;
  details?: string;
  defaultOpen?: boolean;
  disabled?: boolean;
  onActivate?: () => void;
}

export default function ExpandableCard({
  term,
  definition,
  details,
  defaultOpen = false,
  disabled = false,
  onActivate,
}: ExpandableCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  // Call onActivate when card is opened for the first time
  useEffect(() => {
    if (isOpen && onActivate) {
      onActivate();
    }
  }, [isOpen, onActivate]);

  const handleClick = () => {
    if (disabled || isOpen) return;
    setIsOpen(true);
  };

  return (
    <div
      className={`rounded-lg border border-border bg-white card-shadow transition-all duration-150 ${
        disabled
          ? 'opacity-50 cursor-not-allowed'
          : 'hover:border-primary-purple/50'
      }`}
    >
      <button
        onClick={handleClick}
        disabled={disabled}
        className={`w-full px-6 py-4 text-left transition-colors rounded-lg ${
          disabled ? 'cursor-not-allowed' : 'hover:bg-background-muted/30'
        }`}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold gradient-text">{term}</h3>
          {disabled && (
            <svg
              className="w-5 h-5 text-text-secondary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          )}
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
