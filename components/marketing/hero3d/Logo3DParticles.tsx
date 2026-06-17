"use client";

import type { MutableRefObject } from "react";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Points,
} from "three";
import { logo3DParticleConfig } from "./hero3d-assets";
import type { Logo3DPointerState } from "./useLogo3DPointer";

type ParticleLayer = {
  geometry: BufferGeometry;
  base: Float32Array;
  speed: number;
};

type Logo3DParticlesProps = {
  pointerState: MutableRefObject<Logo3DPointerState>;
};

function createParticleLayer(count: number, type: "dust" | "flow" | "burst"): ParticleLayer {
  const base = new Float32Array(count * 3);
  const positions = new Float32Array(count * 3);

  for (let index = 0; index < count; index += 1) {
    const i = index * 3;
    const t = index / count;

    if (type === "dust") {
      const biasRight = index % 5 === 0 ? 1.1 : 0.55;
      base[i] = -4.4 + ((index * 37) % 100) / 100 * 8.8 * biasRight;
      base[i + 1] = -2.25 + ((index * 53) % 100) / 100 * 4.5;
      base[i + 2] = -1.45 + ((index * 29) % 100) / 100 * 2.4;
    }

    if (type === "flow") {
      const wave = Math.sin(t * Math.PI * 4.4);
      base[i] = -4.7 + t * 9.4;
      base[i + 1] = -1.8 + wave * 0.42 + Math.sin(t * 11) * 0.16;
      base[i + 2] = -0.9 + Math.cos(t * 7.1) * 0.22;
    }

    if (type === "burst") {
      const angle = index * 0.71;
      const radius = 0.72 + (index % 40) * 0.035;
      base[i] = Math.cos(angle) * radius + 0.22;
      base[i + 1] = Math.sin(angle * 0.88) * radius * 0.78 + 0.05;
      base[i + 2] = Math.sin(angle) * 0.5 - 0.22;
    }

    positions[i] = base[i];
    positions[i + 1] = base[i + 1];
    positions[i + 2] = base[i + 2];
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(positions, 3));

  return {
    geometry,
    base,
    speed: type === "flow" ? 1 : type === "burst" ? 0.78 : 0.36,
  };
}

export function Logo3DParticles({ pointerState }: Logo3DParticlesProps) {
  const dustRef = useRef<Points>(null);
  const flowRef = useRef<Points>(null);
  const burstRef = useRef<Points>(null);
  const dust = useMemo(
    () => createParticleLayer(logo3DParticleConfig.dustCount, "dust"),
    [],
  );
  const flow = useMemo(
    () => createParticleLayer(logo3DParticleConfig.flowCount, "flow"),
    [],
  );
  const burst = useMemo(
    () => createParticleLayer(logo3DParticleConfig.burstCount, "burst"),
    [],
  );

  useFrame((state) => {
    const elapsed = state.clock.elapsedTime;
    const pointer = pointerState.current;

    for (const layer of [dust, flow, burst]) {
      const attr = layer.geometry.getAttribute("position") as BufferAttribute;
      const positions = attr.array as Float32Array;

      for (let index = 0; index < positions.length / 3; index += 1) {
        const i = index * 3;
        const phase = elapsed * layer.speed + index * 0.09;
        const influence = pointer.isInside ? logo3DParticleConfig.cursorInfluence : 0.045;
        positions[i] =
          layer.base[i] +
          Math.sin(phase) * 0.035 +
          pointer.x * influence * (index % 3 === 0 ? 1.1 : 0.42);
        positions[i + 1] =
          layer.base[i + 1] +
          Math.cos(phase * 0.82) * 0.03 +
          pointer.y * influence * 0.64;

        if (layer === flow) {
          positions[i] = -4.8 + ((layer.base[i] + 4.8 + elapsed * 0.18) % 9.6);
        }
      }

      attr.needsUpdate = true;
    }

    if (dustRef.current) {
      dustRef.current.rotation.z = pointer.x * 0.025;
    }

    if (flowRef.current) {
      flowRef.current.rotation.z = -0.08 + pointer.x * 0.035;
    }

    if (burstRef.current) {
      burstRef.current.rotation.z = elapsed * 0.04 + pointer.x * 0.12;
      burstRef.current.rotation.y = pointer.x * 0.12;
    }
  });

  return (
    <>
      <points ref={dustRef} geometry={dust.geometry} position={[0.5, 0, -1.25]}>
        <pointsMaterial
          color="#e01818"
          size={0.01}
          transparent
          opacity={0.28}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </points>
      <points ref={flowRef} geometry={flow.geometry} position={[0.1, -0.1, -0.8]}>
        <pointsMaterial
          color="#ff5a00"
          size={0.014}
          transparent
          opacity={0.44}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </points>
      <points ref={burstRef} geometry={burst.geometry} position={[0, 0, -0.18]}>
        <pointsMaterial
          color="#ff7a24"
          size={0.021}
          transparent
          opacity={0.62}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </>
  );
}
