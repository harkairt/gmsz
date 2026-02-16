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
    'rounded-2xl p-6 transition-all duration-300';

  const variantStyles = {
    default:
      'bg-white/5 border border-white/10 hover:border-primary-purple/50 card-glow-hover',
    gradient:
      'bg-gradient-to-br from-primary-purple/20 to-primary-blue/20 border border-primary-purple/30 card-glow',
    outline:
      'border-2 border-dashed border-white/20 hover:border-primary-purple/50 bg-transparent',
  };

  return (
    <motion.div
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={cardVariants}
      whileHover={{ scale: 1.02, y: -4 }}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </motion.div>
  );
}
