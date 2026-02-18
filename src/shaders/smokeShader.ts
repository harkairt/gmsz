import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Vertex shader
const vertexShader = `
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying vec3 vViewDirection;

  void main() {
    vPosition = position;
    vNormal = normalize(normalMatrix * normal);
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;
    vViewDirection = normalize(cameraPosition - worldPosition.xyz);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Fragment shader with colorful plasma effect
const fragmentShader = `
  uniform float time;
  uniform vec3 color1;
  uniform vec3 color2;
  uniform vec3 color3;
  uniform float intensity;
  uniform float activated;

  varying vec3 vPosition;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying vec3 vViewDirection;

  // Improved 3D simplex-like noise
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod289(i);
    vec4 p = permute(permute(permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  // Fractal Brownian Motion with rotation
  float fbm(vec3 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;

    // Rotation matrix for more interesting patterns
    mat3 rot = mat3(
      0.00, 0.80, 0.60,
      -0.80, 0.36, -0.48,
      -0.60, -0.48, 0.64
    );

    for (int i = 0; i < 6; i++) {
      value += amplitude * snoise(p * frequency);
      p = rot * p * 2.0 + vec3(100.0);
      amplitude *= 0.5;
      frequency *= 1.0;
    }

    return value;
  }

  // Domain warping for flowing effect
  float domainWarp(vec3 p, float t) {
    vec3 q = vec3(
      fbm(p + vec3(0.0, 0.0, 0.0)),
      fbm(p + vec3(5.2, 1.3, 2.8)),
      fbm(p + vec3(2.1, 7.3, 4.2))
    );

    vec3 r = vec3(
      fbm(p + 4.0 * q + vec3(1.7, 9.2, 0.0) + 0.15 * t),
      fbm(p + 4.0 * q + vec3(8.3, 2.8, 4.1) + 0.126 * t),
      fbm(p + 4.0 * q + vec3(3.1, 4.7, 1.8) + 0.13 * t)
    );

    return fbm(p + 4.0 * r);
  }

  void main() {
    // Animated position for flowing plasma effect
    float t = time * 1.0;
    vec3 animatedPos = vPosition * 2.8;

    // Multiple layers of domain-warped noise for plasma swirls
    float plasma1 = domainWarp(animatedPos + vec3(t * 0.25, t * 0.15, t * 0.2), t);
    float plasma2 = domainWarp(animatedPos * 1.5 + vec3(-t * 0.2, t * 0.25, -t * 0.15), t * 1.3);
    float plasma3 = fbm(animatedPos * 2.2 + vec3(t * 0.35, -t * 0.25, t * 0.15));

    // Combine plasma layers with more contrast
    float combined = plasma1 * 0.5 + plasma2 * 0.35 + plasma3 * 0.25;
    combined = combined * 0.5 + 0.5; // Normalize to 0-1
    combined = pow(combined, 0.85); // Increase contrast

    // Create color gradient based on plasma intensity with smoother transitions
    vec3 plasmaColor;
    float colorMix = combined * 3.0;
    if (combined < 0.33) {
      plasmaColor = mix(color1, color2, colorMix);
    } else if (combined < 0.66) {
      plasmaColor = mix(color2, color3, colorMix - 1.0);
    } else {
      plasmaColor = mix(color3, color1, colorMix - 2.0);
    }

    // Boost color saturation and brightness for bloom
    plasmaColor = pow(plasmaColor, vec3(0.9)); // Slightly boost mid-tones
    plasmaColor *= 2.2; // Increase overall brightness for bloom pickup

    // Add bright hot spots - more intense
    float hotspot = pow(max(0.0, plasma1), 2.5);
    vec3 hotColor = vec3(1.0, 0.95, 0.85); // Bright warm white
    plasmaColor = mix(plasmaColor, hotColor * 3.0, hotspot * 0.5);

    // Secondary hotspots for more variation
    float hotspot2 = pow(max(0.0, plasma2 * 0.8 + plasma3 * 0.2), 3.0);
    plasmaColor = mix(plasmaColor, color2 * 4.0, hotspot2 * 0.3);

    // Fresnel rim glow (edge glow) - more pronounced
    float fresnel = pow(1.0 - abs(dot(normalize(vViewDirection), vNormal)), 2.2);

    // Pulse effect when activated - more dramatic
    float pulse = activated > 0.5 ? (sin(time * 6.0) * 0.25 + 1.0) : 1.0;

    // Enhanced glow based on plasma intensity
    float glow = pow(combined, 1.5) * 2.0;

    // Final color composition - significantly brighter
    vec3 finalColor = plasmaColor * (glow + 0.5) * intensity * pulse;

    // Enhanced fresnel rim color (uses color1 and color2 tint)
    vec3 rimColor = mix(color1, color2, 0.3) * 3.5;
    finalColor += rimColor * fresnel * 1.2;

    // Add inner glow/core brightness
    float dist = length(vPosition);
    float coreGlow = smoothstep(0.8, 0.0, dist);
    finalColor += plasmaColor * coreGlow * 0.8;

    // Alpha based on distance from center and noise - more opaque core
    float alphaCore = smoothstep(1.0, 0.2, dist);
    float alpha = (combined * 0.75 + 0.35) * alphaCore * intensity;

    gl_FragColor = vec4(finalColor, alpha);
  }
`;

// Create the shader material with three color uniforms for gradient
const SmokeMaterial = shaderMaterial(
  {
    time: 0,
    color1: new THREE.Color('#FF6B35'), // Orange
    color2: new THREE.Color('#F72585'), // Pink/Magenta
    color3: new THREE.Color('#7209B7'), // Purple
    intensity: 1.0,
    activated: 0,
  },
  vertexShader,
  fragmentShader
);

export default SmokeMaterial;
