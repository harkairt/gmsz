import PlanetOrb, { ORB_PALETTES } from './PlanetOrb';

// Re-export for backwards compatibility
export const COLOR_PALETTES = ORB_PALETTES;

interface MarbleProps {
  position?: [number, number, number];
  palette?: keyof typeof ORB_PALETTES;
  scale?: number;
  activated?: boolean;
  hitTrigger?: number;
  muted?: boolean;
}

export default function Marble({
  position = [0, 0, 0],
  palette = 'purple',
  scale = 1,
  hitTrigger = 0,
  muted = false,
}: MarbleProps) {
  return (
    <PlanetOrb
      position={position}
      palette={palette}
      scale={scale}
      hitTrigger={hitTrigger}
      muted={muted}
    />
  );
}
