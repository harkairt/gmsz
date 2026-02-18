import { useRef, useMemo } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import * as THREE from 'three';
import SmokeMaterial from '../../shaders/smokeShader';

// Extend R3F to recognize the custom material
extend({ SmokeMaterial });

// Color palettes for different marbles - vibrant and saturated for bloom effect
export const COLOR_PALETTES = {
  purple: {
    color1: new THREE.Color('#FF8C42'), // Bright orange
    color2: new THREE.Color('#FF2E88'), // Hot pink/magenta
    color3: new THREE.Color('#9D4EDD'), // Vivid purple
  },
  blue: {
    color1: new THREE.Color('#00F5FF'), // Electric cyan
    color2: new THREE.Color('#5865F2'), // Discord blue
    color3: new THREE.Color('#A855F7'), // Purple
  },
  cyan: {
    color1: new THREE.Color('#00FFB3'), // Neon teal
    color2: new THREE.Color('#00B4D8'), // Bright blue
    color3: new THREE.Color('#0077B6'), // Deep blue
  },
  pink: {
    color1: new THREE.Color('#FFD60A'), // Bright yellow
    color2: new THREE.Color('#FF6D00'), // Vibrant orange
    color3: new THREE.Color('#FF0080'), // Neon pink
  },
};

// Proper type for the shader material ref
type SmokeMaterialType = THREE.ShaderMaterial & {
  time: number;
  color1: THREE.Color;
  color2: THREE.Color;
  color3: THREE.Color;
  intensity: number;
  activated: number;
};

interface SmokeCoreProps {
  palette?: keyof typeof COLOR_PALETTES;
  activated?: boolean;
}

export default function SmokeCore({
  palette = 'purple',
  activated = false,
}: SmokeCoreProps) {
  const materialRef = useRef<SmokeMaterialType>(null);

  // Get colors from palette
  const colors = useMemo(() => {
    const p = COLOR_PALETTES[palette] || COLOR_PALETTES.purple;
    return p;
  }, [palette]);

  // Animate the shader
  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.time = clock.elapsedTime;
      materialRef.current.activated = activated ? 1 : 0;
    }
  });

  return (
    <mesh scale={0.88}>
      <sphereGeometry args={[1, 64, 64]} />
      {/* @ts-expect-error - shaderMaterial type not fully compatible with JSX */}
      <smokeMaterial
        ref={materialRef}
        key={SmokeMaterial.key}
        color1={colors.color1}
        color2={colors.color2}
        color3={colors.color3}
        intensity={1.8}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </mesh>
  );
}
