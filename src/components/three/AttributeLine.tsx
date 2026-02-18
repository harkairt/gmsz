import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line, Text } from '@react-three/drei';

export default function AttributeLine() {
  const [progress, setProgress] = useState(0);
  const targetProgress = useRef(1);

  // Animate line drawing using useFrame for smooth spring-like motion
  useFrame((_, delta) => {
    setProgress((prev) => {
      const diff = targetProgress.current - prev;
      return prev + diff * Math.min(delta * 5, 1);
    });
  });

  // Line points from marble center to the right
  const startPoint: [number, number, number] = [1.1, 0, 0];
  const endPoint: [number, number, number] = [3, 0, 0];

  // Calculate interpolated end point
  const currentEnd: [number, number, number] = [
    startPoint[0] + (endPoint[0] - startPoint[0]) * progress,
    startPoint[1] + (endPoint[1] - startPoint[1]) * progress,
    startPoint[2] + (endPoint[2] - startPoint[2]) * progress,
  ];

  return (
    <group>
      {/* Animated line */}
      <Line
        points={[startPoint, currentEnd]}
        color="#8B5CF6"
        lineWidth={2}
        transparent
        opacity={0.8}
      />

      {/* Label */}
      <group
        position={[3.5, 0, 0]}
        scale={[progress, progress, progress]}
      >
        <Text
          fontSize={0.5}
          color="#FFFFFF"
          anchorX="left"
          anchorY="middle"
        >
          szín
        </Text>
      </group>

      {/* Small dot at the end of line */}
      <mesh position={currentEnd} scale={progress * 0.1}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color="#8B5CF6" />
      </mesh>
    </group>
  );
}
