"use client";

import type { MutableRefObject } from "react";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  Points,
  ShaderMaterial,
} from "three";
import type { ImmersivePointerState } from "./useImmersivePointer";

type MarketingParticlesFieldProps = {
  density?: "global" | "stage";
  pointerState?: MutableRefObject<ImmersivePointerState>;
};

type ParticleSystem = {
  geometry: BufferGeometry;
  base: Float32Array;
  velocity: Float32Array;
  count: number;
};

const colors = ["#e01818", "#ff4a12", "#ff9b2a", "#d8d8d8", "#7d1a12"];

function createParticleSystem(count: number, density: "global" | "stage"): ParticleSystem {
  const base = new Float32Array(count * 3);
  const positions = new Float32Array(count * 3);
  const velocity = new Float32Array(count * 3);
  const colorValues = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const alphas = new Float32Array(count);

  for (let index = 0; index < count; index += 1) {
    const i = index * 3;
    const t = index / count;
    const rightBias = Math.pow((index * 37) % 101 / 100, density === "stage" ? 0.58 : 0.78);
    const x = -5.5 + rightBias * 11;
    const y = -3.2 + ((index * 53) % 101) / 100 * 6.4;
    const z = -2.5 + ((index * 29) % 101) / 100 * 5;
    const reducedLeftDensity = x < -2.3 && y > -0.8 && y < 2.2 && index % 3 !== 0;

    base[i] = reducedLeftDensity ? x + 2.4 : x;
    base[i + 1] = y;
    base[i + 2] = z;
    positions[i] = base[i];
    positions[i + 1] = base[i + 1];
    positions[i + 2] = base[i + 2];
    velocity[i] = 0.018 + (index % 7) * 0.0025;
    velocity[i + 1] = 0.012 + (index % 5) * 0.002;
    velocity[i + 2] = 0.006 + (index % 4) * 0.001;
    sizes[index] = density === "stage" ? 8 + (index % 5) * 2.2 : 5 + (index % 4) * 1.6;
    alphas[index] = 0.22 + ((index * 17) % 100) / 100 * 0.48;

    const color = new Color(colors[index % colors.length]);
    if (t < 0.08) {
      color.lerp(new Color("#ffffff"), 0.28);
    }
    colorValues[i] = color.r;
    colorValues[i + 1] = color.g;
    colorValues[i + 2] = color.b;
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(positions, 3));
  geometry.setAttribute("color", new BufferAttribute(colorValues, 3));
  geometry.setAttribute("aSize", new BufferAttribute(sizes, 1));
  geometry.setAttribute("aAlpha", new BufferAttribute(alphas, 1));

  return { geometry, base, velocity, count };
}

export function MarketingParticlesField({
  density = "stage",
  pointerState,
}: MarketingParticlesFieldProps) {
  const pointsRef = useRef<Points>(null);
  const materialRef = useRef<ShaderMaterial>(null);
  const system = useMemo(
    () => createParticleSystem(density === "stage" ? 620 : 340, density),
    [density],
  );

  useFrame((state) => {
    const elapsed = state.clock.elapsedTime;
    const pointer = pointerState?.current;
    const attr = system.geometry.getAttribute("position") as BufferAttribute;
    const positions = attr.array as Float32Array;
    const cursorX = pointer?.normalizedX ?? 0;
    const cursorY = pointer?.normalizedY ?? 0;
    const cursorPower = pointer?.isHoveringStage ? 0.22 : 0.055;

    for (let index = 0; index < system.count; index += 1) {
      const i = index * 3;
      const phase = elapsed * (0.22 + system.velocity[i]) + index * 0.071;
      const logoPull = density === "stage" ? 0.026 : 0.012;
      const driftX = Math.sin(phase) * 0.045 + elapsed * system.velocity[i];
      const wrappedX = -5.6 + ((system.base[i] + 5.6 + driftX) % 11.2);
      const dx = system.base[i] - cursorX * 3.7;
      const dy = system.base[i + 1] - -cursorY * 2.4;
      const distance = Math.max(0.55, Math.hypot(dx, dy));
      const repel = cursorPower / distance;

      positions[i] =
        wrappedX -
        dx * repel * 0.12 -
        system.base[i] * logoPull +
        Math.sin(phase * 0.7) * 0.02;
      positions[i + 1] =
        system.base[i + 1] +
        Math.cos(phase * 0.82) * 0.05 -
        dy * repel * 0.08 -
        system.base[i + 1] * logoPull * 0.5;
      positions[i + 2] =
        system.base[i + 2] + Math.sin(phase * 0.48) * system.velocity[i + 2] * 4;
    }

    attr.needsUpdate = true;

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = elapsed;
      materialRef.current.uniforms.uOpacity.value = density === "stage" ? 1 : 0.72;
    }

    if (pointsRef.current) {
      pointsRef.current.rotation.z = cursorX * 0.018;
      pointsRef.current.rotation.y = cursorX * 0.025;
    }
  });

  return (
    <points
      ref={pointsRef}
      geometry={system.geometry}
      position={density === "stage" ? [0.35, -0.08, -0.9] : [0, 0, -1.8]}
    >
      <shaderMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        vertexColors
        blending={AdditiveBlending}
        uniforms={{
          uTime: { value: 0 },
          uOpacity: { value: density === "stage" ? 1 : 0.72 },
        }}
        vertexShader={`
          attribute float aSize;
          attribute float aAlpha;
          varying vec3 vColor;
          varying float vAlpha;
          uniform float uTime;

          void main() {
            vColor = color;
            vAlpha = aAlpha * (0.72 + sin(uTime * 1.4 + position.x * 1.8) * 0.28);
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = aSize * (260.0 / max(2.0, -mvPosition.z));
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          varying vec3 vColor;
          varying float vAlpha;
          uniform float uOpacity;

          void main() {
            vec2 uv = gl_PointCoord - vec2(0.5);
            float d = length(uv);
            float alpha = smoothstep(0.5, 0.08, d) * vAlpha * uOpacity;
            gl_FragColor = vec4(vColor, alpha);
          }
        `}
      />
    </points>
  );
}
