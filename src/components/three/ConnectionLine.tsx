import { useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';

interface ConnectionLineProps {
  start: [number, number, number];
  end: [number, number, number];
  color?: string;
}

export default function ConnectionLine({
  start,
  end,
  color = '#8B5CF680',
}: ConnectionLineProps) {
  const [progress, setProgress] = useState(0);

  // Animate line drawing using useFrame
  useFrame((_, delta) => {
    setProgress((prev) => {
      const target = 1;
      const diff = target - prev;
      return prev + diff * Math.min(delta * 4, 1);
    });
  });

  // Calculate interpolated end point
  const currentEnd: [number, number, number] = [
    start[0] + (end[0] - start[0]) * progress,
    start[1] + (end[1] - start[1]) * progress,
    start[2] + (end[2] - start[2]) * progress,
  ];

  return (
    <Line
      points={[start, currentEnd]}
      color={color}
      lineWidth={1.5}
      transparent
      opacity={0.5}
      dashed
      dashSize={0.1}
      gapSize={0.05}
    />
  );
}
