import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import PageTransition from '../components/PageTransition';

// Resource node data
const resources = {
  T: { emoji: '🧠', label: 'Tudás', },
  I: { emoji: '📜', label: 'Információ', },
  E: { emoji: '🛠️', label: 'Eszköz', },
  H: { emoji: '⏳', label: 'Emberi idő', },
  P: { emoji: '💰', label: 'Pénz', },
};

// Animation timing constants (in seconds)
const TIMING = {
  topNodesAppear: 0,
  topLinesStart: 0.5,
  topLinesDuration: 1.0,
  hNodeAppear: 1.5,
  bottomLineStart: 2.0,
  bottomLineDuration: 0.8,
  pNodeAppear: 2.8,
};

interface ResourceNodeProps {
  emoji: string;
  label: string;
  delay: number;
  className?: string;
}

function ResourceNode({ emoji, label, delay, className = '' }: ResourceNodeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay,
        duration: 0.4,
        type: 'spring',
        stiffness: 200,
        damping: 15
      }}
      className={`flex flex-col items-center ${className}`}
    >
      {/* Glow background */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-purple/20 to-primary-blue/20 rounded-full blur-xl scale-150" />
        <div className="relative text-5xl md:text-6xl p-4 bg-white/80 rounded-full border border-border shadow-lg backdrop-blur-sm">
          {emoji}
        </div>
      </div>
      {/* Labels */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: delay + 0.2, duration: 0.3 }}
        className="mt-3 text-center"
      >
        <div className="font-semibold text-text-primary">{label}</div>
      </motion.div>
    </motion.div>
  );
}

interface AnimatedLineProps {
  d: string;
  delay: number;
  duration: number;
}

function AnimatedLine({ d, delay, duration }: AnimatedLineProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      setPathLength(length);
    }
  }, [d]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(true);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <path
      ref={pathRef}
      d={d}
      fill="none"
      stroke="url(#arrowGradient)"
      strokeWidth="3"
      strokeLinecap="round"
      strokeDasharray={pathLength}
      strokeDashoffset={isAnimating ? 0 : pathLength}
      style={{
        transition: isAnimating ? `stroke-dashoffset ${duration}s ease-in-out` : 'none',
      }}
      markerEnd="url(#arrowhead)"
    />
  );
}

export default function Eroforrasok() {
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
            <span className="gradient-text">Erőforrások</span>
          </h1>
        </motion.div>

        {/* Resource flow diagram */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative max-w-3xl mx-auto"
        >
          {/* SVG for animated arrows */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 600 600"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              {/* Gradient for arrows */}
              <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
              {/* Arrowhead marker */}
              <marker
                id="arrowhead"
                markerWidth="12"
                markerHeight="12"
                refX="10"
                refY="6"
                orient="auto"
                markerUnits="userSpaceOnUse"
              >
                <path
                  d="M0,0 L12,6 L0,12 L3,6 Z"
                  fill="#3b82f6"
                />
              </marker>
            </defs>

            {/* Arrow from T (left) to H (center) */}
            <AnimatedLine
              d="M90,80 Q140,180 255,240"
              delay={TIMING.topLinesStart}
              duration={TIMING.topLinesDuration}
            />

            {/* Arrow from I (center) to H (center) */}
            <AnimatedLine
              d="M300,80 Q305,160 300,240"
              delay={TIMING.topLinesStart}
              duration={TIMING.topLinesDuration}
            />

            {/* Arrow from E (right) to H (center) */}
            <AnimatedLine
              d="M510,80 Q460,180 345,240"
              delay={TIMING.topLinesStart}
              duration={TIMING.topLinesDuration}
            />

            {/* Arrow from H to P */}
            <AnimatedLine
              d="M300,360 Q305,430 300,500"
              delay={TIMING.bottomLineStart}
              duration={TIMING.bottomLineDuration}
            />
          </svg>

          {/* Resource nodes container */}
          <div className="relative" style={{ height: '600px' }}>
            {/* Top row: T, I, E */}
            <div className="absolute top-0 left-0 right-0 flex justify-between px-4 md:px-12">
              <ResourceNode
                emoji={resources.T.emoji}
                label={resources.T.label}
                delay={TIMING.topNodesAppear}
              />
              <ResourceNode
                emoji={resources.I.emoji}
                label={resources.I.label}
                delay={TIMING.topNodesAppear + 0.1}
              />
              <ResourceNode
                emoji={resources.E.emoji}
                label={resources.E.label}
                delay={TIMING.topNodesAppear + 0.2}
              />
            </div>

            {/* Middle: H */}
            <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2">
              <ResourceNode
                emoji={resources.H.emoji}
                label={resources.H.label}
                delay={TIMING.hNodeAppear}
              />
            </div>

            {/* Bottom: P */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
              <ResourceNode
                emoji={resources.P.emoji}
                label={resources.P.label}
                delay={TIMING.pNodeAppear}
              />
            </div>
          </div>
        </motion.div>

        {/* Explanation section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: TIMING.pNodeAppear + 0.5, duration: 0.6 }}
          className="mt-16 text-center"
        >
        </motion.div>
      </div>
    </PageTransition>
  );
}
