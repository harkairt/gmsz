import { useRef, useState, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import type { SceneStage } from '../EntitasVisualization';
import Marble, { COLOR_PALETTES } from './Marble';
import AttributeLine from './AttributeLine';
import ConnectionLine from './ConnectionLine';
import ZapEffect from './ZapEffect';

interface EntitasSceneProps {
  stage: SceneStage;
}

// Marble configurations with palette
type MarbleConfig = {
  position: [number, number, number];
  palette: keyof typeof COLOR_PALETTES;
  muted?: boolean;
};

export default function EntitasScene({ stage }: EntitasSceneProps) {
  const glowRef = useRef<THREE.PointLight>(null);
  // Track hit counts for each orb (by index)
  const [orbHits, setOrbHits] = useState<number[]>([0, 0, 0, 0]);

  // Callback when zap reaches a point - increment that orb's hit counter
  const handleZapReachPoint = useCallback((pointIndex: number) => {
    setOrbHits((prev) => {
      const next = [...prev];
      if (pointIndex < next.length) {
        next[pointIndex] = (next[pointIndex] || 0) + 1;
      }
      return next;
    });
  }, []);

  // Ambient glow animation for empty state
  useFrame(({ clock }) => {
    if (glowRef.current && stage === 'empty') {
      glowRef.current.intensity = 0.5 + Math.sin(clock.elapsedTime * 2) * 0.3;
    }
  });

  // Calculate marble positions and colors based on stage
  const getMarbleConfigs = (): MarbleConfig[] => {
    switch (stage) {
      case 'empty':
        return [];
      case 'entitas':
        return [{ position: [0, 0, 0], palette: 'purple' }];
      case 'attributum':
        return [{ position: [0, 0, 0], palette: 'purple' }];
      case 'aktivitas':
        return [
          { position: [-1.5, 0, 0], palette: 'purple' },
          { position: [1.5, 0, 0], palette: 'blue' },
        ];
      case 'relevancia':
        return [
          { position: [-1.5, 0, 0], palette: 'purple' },
          { position: [1.5, 0, 0], palette: 'blue' },
        ];
      case 'cel':
        // First 3 marbles are muted/subdued, 4th (the goal) is prominent
        return [
          { position: [-4.5, 0, 0], palette: 'purple', muted: true },
          { position: [-1.5, 0, 0], palette: 'blue', muted: true },
          { position: [1.5, 0, 0], palette: 'cyan', muted: true },
          { position: [4.5, 0, 0], palette: 'pink', muted: false },
        ];
      case 'feladat':
        // All marbles active - showing the activity chain
        return [
          { position: [-4.5, 0, 0], palette: 'purple' },
          { position: [-1.5, 0, 0], palette: 'blue' },
          { position: [1.5, 0, 0], palette: 'cyan' },
          { position: [4.5, 0, 0], palette: 'pink' },
        ];
      default:
        return [];
    }
  };

  const marbleConfigs = getMarbleConfigs();
  const showAttributeLine = stage === 'attributum';
  const showConnectionLine = stage === 'relevancia' || stage === 'cel' || stage === 'feladat';
  const showZap = stage === 'aktivitas' || stage === 'relevancia' || stage === 'feladat';

  return (
    <group>
      {/* Ambient glow for empty state */}
      {stage === 'empty' && (
        <pointLight
          ref={glowRef}
          position={[0, 0, 2]}
          color="#8B5CF6"
          intensity={0.5}
          distance={10}
        />
      )}

      {/* Marbles */}
      {marbleConfigs.map((config, index) => (
        <Float
          key={`marble-${index}`}
          speed={1.5}
          rotationIntensity={0.3}
          floatIntensity={0.4}
          floatingRange={[-0.1, 0.1]}
        >
          <Marble
            position={config.position}
            palette={config.palette}
            activated={showZap}
            hitTrigger={orbHits[index] || 0}
            muted={config.muted}
          />
        </Float>
      ))}

      {/* Attribute line (szín) */}
      {showAttributeLine && <AttributeLine />}

      {/* Connection lines between marbles */}
      {showConnectionLine && stage === 'relevancia' && (
        <ConnectionLine
          start={[-1.5, 0, 0]}
          end={[1.5, 0, 0]}
        />
      )}

      {showConnectionLine && (stage === 'cel' || stage === 'feladat') && (
        <>
          <ConnectionLine start={[-4.5, 0, 0]} end={[-1.5, 0, 0]} />
          <ConnectionLine start={[-1.5, 0, 0]} end={[1.5, 0, 0]} />
          <ConnectionLine start={[1.5, 0, 0]} end={[4.5, 0, 0]} />
        </>
      )}

      {/* Zap effects */}
      {showZap && stage === 'aktivitas' && (
        <ZapEffect
          start={[-1.5, 0, 0]}
          end={[1.5, 0, 0]}
          interval={2}
          onReachPoint={handleZapReachPoint}
        />
      )}

      {showZap && stage === 'relevancia' && (
        <ZapEffect
          start={[-1.5, 0, 0]}
          end={[1.5, 0, 0]}
          interval={2}
          onReachPoint={handleZapReachPoint}
        />
      )}

      {showZap && stage === 'feladat' && (
        <ZapEffect
          points={[
            [-4.5, 0, 0],
            [-1.5, 0, 0],
            [1.5, 0, 0],
            [4.5, 0, 0],
          ]}
          interval={2}
          chain
          onReachPoint={handleZapReachPoint}
        />
      )}
    </group>
  );
}
