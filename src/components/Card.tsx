import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  variant?: 'default' | 'gradient' | 'outline';
}

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95,
  },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: delay * 0.1,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

export default function Card({
  children,
  delay = 0,
  className = '',
  variant = 'default',
}: CardProps) {
  const baseStyles =
    'rounded-lg p-6 transition-all duration-150 hover:scale-[1.02] hover:-translate-y-1';

  const variantStyles = {
    default:
      'bg-white border border-border hover:border-primary-purple/50 card-shadow card-shadow-hover',
    gradient:
      'bg-gradient-to-br from-primary-purple/10 to-primary-blue/10 border border-primary-purple/20 card-shadow',
    outline:
      'border-2 border-dashed border-border-subtle hover:border-primary-purple/50 bg-transparent',
  };

  return (
    <motion.div
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={cardVariants}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </motion.div>
  );
}
