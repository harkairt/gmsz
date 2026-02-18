import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import EntitasScene from './three/EntitasScene';

export type SceneStage = 'empty' | 'entitas' | 'attributum' | 'aktivitas' | 'relevancia' | 'cel' | 'feladat';

interface EntitasVisualizationProps {
  stage: SceneStage;
}

export default function EntitasVisualization({ stage }: EntitasVisualizationProps) {
  return (
    <div className="w-full h-64 md:h-80 rounded-lg overflow-hidden bg-gradient-to-br from-slate-900 via-purple-950/50 to-slate-900 border border-purple-500/20">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        {/* Subtle ambient and directional lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.0} color="#ffffff" />
        <directionalLight position={[-5, -5, -5]} intensity={0.3} color="#8B5CF6" />

        {/* Point lights for dramatic effect */}
        <pointLight position={[3, 2, 4]} intensity={0.8} color="#F72585" distance={15} />
        <pointLight position={[-3, -2, 4]} intensity={0.8} color="#4CC9F0" distance={15} />

        {/* Environment for reflections */}
        <Environment preset="night" />

        {/* Main scene */}
        <EntitasScene stage={stage} />

        {/* Post-processing for bloom glow effect */}
        <EffectComposer>
          <Bloom
            intensity={1.2}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            mipmapBlur
            radius={0.8}
          />
          <Vignette offset={0.3} darkness={0.4} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
