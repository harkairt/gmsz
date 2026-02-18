import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Trail } from '@react-three/drei';
import * as THREE from 'three';

interface ZapEffectProps {
  start?: [number, number, number];
  end?: [number, number, number];
  points?: [number, number, number][];
  interval?: number;
  chain?: boolean;
  color?: string;
  onReachPoint?: (pointIndex: number) => void;
}

export default function ZapEffect({
  start = [-1.5, 0, 0],
  end = [1.5, 0, 0],
  points,
  interval = 2,
  chain = false,
  color = '#F472B6',
  onReachPoint,
}: ZapEffectProps) {
  const zapRef = useRef<THREE.Mesh>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentSegment, setCurrentSegment] = useState(0);
  const progressRef = useRef(0);
  const notifiedPointsRef = useRef<Set<number>>(new Set());
  const animationSpeed = 3; // Units per second

  // Calculate path points
  const pathPoints = points || [start, end];
  const totalSegments = pathPoints.length - 1;

  // Start animation on interval
  useEffect(() => {
    const startAnimation = () => {
      setIsAnimating(true);
      progressRef.current = 0;
      setCurrentSegment(0);
      notifiedPointsRef.current.clear();
    };

    // Initial start
    const initialDelay = setTimeout(startAnimation, 500);

    // Repeat interval
    const intervalId = setInterval(startAnimation, interval * 1000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(intervalId);
    };
  }, [interval, onReachPoint]);

  // Helper to get distance between two points
  function getDistance(a: [number, number, number], b: [number, number, number]) {
    return Math.sqrt(
      Math.pow(b[0] - a[0], 2) +
      Math.pow(b[1] - a[1], 2) +
      Math.pow(b[2] - a[2], 2)
    );
  }

  // Helper to get segment length
  function getSegmentLength(segmentIndex: number) {
    if (segmentIndex >= totalSegments) return 1;
    return getDistance(pathPoints[segmentIndex], pathPoints[segmentIndex + 1]);
  }

  // Animation loop
  useFrame((_, delta) => {
    if (!isAnimating || !zapRef.current) return;

    progressRef.current += delta * animationSpeed;

    if (chain) {
      // Chain animation through all segments
      const segmentLength = getSegmentLength(currentSegment);
      const segmentProgress = progressRef.current / segmentLength;

      if (segmentProgress >= 1) {
        // Reached the end of current segment - notify reaching this point
        const reachedPointIndex = currentSegment + 1;
        if (onReachPoint && !notifiedPointsRef.current.has(reachedPointIndex)) {
          notifiedPointsRef.current.add(reachedPointIndex);
          onReachPoint(reachedPointIndex);
        }

        // Move to next segment
        if (currentSegment < totalSegments - 1) {
          setCurrentSegment((prev) => prev + 1);
          progressRef.current = 0;
        } else {
          // Animation complete
          setIsAnimating(false);
          progressRef.current = 0;
          setCurrentSegment(0);
        }
      } else {
        // Interpolate position along current segment
        const segmentStart = pathPoints[currentSegment];
        const segmentEnd = pathPoints[currentSegment + 1];

        zapRef.current.position.x = THREE.MathUtils.lerp(
          segmentStart[0],
          segmentEnd[0],
          segmentProgress
        );
        zapRef.current.position.y = THREE.MathUtils.lerp(
          segmentStart[1],
          segmentEnd[1],
          segmentProgress
        );
        zapRef.current.position.z = THREE.MathUtils.lerp(
          segmentStart[2],
          segmentEnd[2],
          segmentProgress
        );
      }
    } else {
      // Simple start to end animation
      const totalLength = getDistance(start, end);
      const progress = progressRef.current / totalLength;

      if (progress >= 1) {
        // Notify reaching the end point (index 1)
        if (onReachPoint && !notifiedPointsRef.current.has(1)) {
          notifiedPointsRef.current.add(1);
          onReachPoint(1);
        }
        setIsAnimating(false);
        progressRef.current = 0;
      } else {
        zapRef.current.position.x = THREE.MathUtils.lerp(start[0], end[0], progress);
        zapRef.current.position.y = THREE.MathUtils.lerp(start[1], end[1], progress);
        zapRef.current.position.z = THREE.MathUtils.lerp(start[2], end[2], progress);
      }
    }
  });

  // Hide when not animating
  if (!isAnimating) return null;

  return (
    <Trail
      width={0.5}
      length={6}
      color={color}
      attenuation={(t) => t * t}
    >
      <mesh ref={zapRef} position={chain ? pathPoints[0] : start}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
    </Trail>
  );
}
