import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Color palettes for different orbs
export const ORB_PALETTES = {
  purple: '#9D4EDD',
  blue: '#5865F2',
  cyan: '#00B4D8',
  pink: '#FF6D00',
};

// Get palette keys as array for cycling
const PALETTE_KEYS = Object.keys(ORB_PALETTES) as (keyof typeof ORB_PALETTES)[];

interface PlanetOrbProps {
  position?: [number, number, number];
  palette?: keyof typeof ORB_PALETTES;
  scale?: number;
  hitTrigger?: number; // Increment this to trigger a color change
  muted?: boolean; // Render in a subdued, light appearance
}

export default function PlanetOrb({
  position = [0, 0, 0],
  palette = 'purple',
  scale = 1,
  hitTrigger = 0,
  muted = false,
}: PlanetOrbProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const currentPaletteRef = useRef(palette);
  const flashIntensityRef = useRef(0);
  const lastHitTriggerRef = useRef(hitTrigger);

  // Handle hit trigger - cycle to next color
  useEffect(() => {
    if (hitTrigger > lastHitTriggerRef.current) {
      // Cycle to next palette color
      const currentIndex = PALETTE_KEYS.indexOf(currentPaletteRef.current);
      const nextIndex = (currentIndex + 1) % PALETTE_KEYS.length;
      currentPaletteRef.current = PALETTE_KEYS[nextIndex];
      // Trigger flash effect
      flashIntensityRef.current = 1.0;
    }
    lastHitTriggerRef.current = hitTrigger;
  }, [hitTrigger]);

  // Animation loop for rotation and flash effect
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
      meshRef.current.rotation.x += delta * 0.1;
    }

    if (materialRef.current) {
      const targetColor = new THREE.Color(ORB_PALETTES[currentPaletteRef.current]);

      // Apply flash effect - lerp emissive intensity down
      if (flashIntensityRef.current > 0) {
        flashIntensityRef.current = Math.max(0, flashIntensityRef.current - delta * 2);
        // Flash to white then settle to new color
        const flashColor = new THREE.Color('#ffffff');
        materialRef.current.emissive.lerpColors(targetColor, flashColor, flashIntensityRef.current);
        materialRef.current.emissiveIntensity = 0.3 + flashIntensityRef.current * 0.7;
      } else {
        materialRef.current.emissive.copy(targetColor);
        materialRef.current.emissiveIntensity = 0.3;
      }

      // Smoothly transition the base color
      materialRef.current.color.lerp(targetColor, delta * 4);
    }
  });

  const baseColor = ORB_PALETTES[palette] || ORB_PALETTES.purple;

  // For muted appearance: desaturate and lighten the color
  const color = muted
    ? new THREE.Color(baseColor).lerp(new THREE.Color('#e8e8e8'), 0.65).getStyle()
    : baseColor;

  const emissiveColor = muted
    ? new THREE.Color(baseColor).lerp(new THREE.Color('#cccccc'), 0.7).getStyle()
    : baseColor;

  return (
    <mesh ref={meshRef} position={position} scale={muted ? scale * 0.85 : scale}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        ref={materialRef}
        color={color}
        roughness={muted ? 0.9 : 0.8}
        metalness={muted ? 0.05 : 0.2}
        emissive={emissiveColor}
        emissiveIntensity={muted ? 0.1 : 0.3}
      />
    </mesh>
  );
}
