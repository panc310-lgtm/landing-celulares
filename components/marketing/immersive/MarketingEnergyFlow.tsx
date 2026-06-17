"use client";

import type { MutableRefObject } from "react";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  AdditiveBlending,
  CatmullRomCurve3,
  Group,
  Mesh,
  MeshBasicMaterial,
  SphereGeometry,
  TubeGeometry,
  Vector3,
} from "three";
import type { ImmersivePointerState } from "./useImmersivePointer";

type MarketingEnergyFlowProps = {
  variant?: "global" | "stage";
  pointerState?: MutableRefObject<ImmersivePointerState>;
};

type Stream = {
  curve: CatmullRomCurve3;
  geometry: TubeGeometry;
  speed: number;
  offset: number;
};

function createStreams(variant: "global" | "stage") {
  const streams: Stream[] = [];
  const count = variant === "stage" ? 7 : 4;

  for (let index = 0; index < count; index += 1) {
    const y = -2.1 + index * (variant === "stage" ? 0.38 : 0.58);
    const z = -1.2 + (index % 3) * 0.2;
    const curve = new CatmullRomCurve3([
      new Vector3(-5.2, y - 0.28, z),
      new Vector3(-2.7, y + Math.sin(index) * 0.32, z - 0.1),
      new Vector3(-0.45, y + 0.45 + index * 0.06, z + 0.22),
      new Vector3(1.1, y + 0.18, z - 0.12),
      new Vector3(4.4, y + 0.52 + Math.cos(index) * 0.25, z),
    ]);

    streams.push({
      curve,
      geometry: new TubeGeometry(curve, 72, variant === "stage" ? 0.008 : 0.005, 8, false),
      speed: 0.055 + index * 0.012,
      offset: index * 0.17,
    });
  }

  return streams;
}

export function MarketingEnergyFlow({
  variant = "stage",
  pointerState,
}: MarketingEnergyFlowProps) {
  const groupRef = useRef<Group>(null);
  const particleRefs = useRef<Mesh[]>([]);
  const streams = useMemo(() => createStreams(variant), [variant]);
  const particleGeometry = useMemo(() => new SphereGeometry(0.025, 12, 12), []);
  const lineMaterials = useMemo(
    () => [
      new MeshBasicMaterial({
        color: "#e01818",
        transparent: true,
        opacity: variant === "stage" ? 0.38 : 0.18,
        blending: AdditiveBlending,
        depthWrite: false,
      }),
      new MeshBasicMaterial({
        color: "#ff4a12",
        transparent: true,
        opacity: variant === "stage" ? 0.28 : 0.15,
        blending: AdditiveBlending,
        depthWrite: false,
      }),
    ],
    [variant],
  );
  const particleMaterial = useMemo(
    () =>
      new MeshBasicMaterial({
        color: "#ff9b2a",
        transparent: true,
        opacity: variant === "stage" ? 0.78 : 0.44,
        blending: AdditiveBlending,
        depthWrite: false,
      }),
    [variant],
  );

  useFrame((state) => {
    const elapsed = state.clock.elapsedTime;
    const pointer = pointerState?.current;

    if (groupRef.current) {
      groupRef.current.rotation.z = (pointer?.normalizedX ?? 0) * -0.018;
      groupRef.current.position.x = (pointer?.normalizedX ?? 0) * -0.08;
      groupRef.current.position.y = (pointer?.normalizedY ?? 0) * 0.04;
    }

    particleRefs.current.forEach((particle, index) => {
      const stream = streams[index % streams.length];
      const point = stream.curve.getPointAt((elapsed * stream.speed + stream.offset) % 1);
      particle.position.copy(point);
      particle.scale.setScalar(0.75 + Math.sin(elapsed * 2 + index) * 0.18);
    });
  });

  return (
    <group
      ref={groupRef}
      position={variant === "stage" ? [0.15, -0.15, -0.55] : [0, -0.35, -1.2]}
      rotation={[0, 0, variant === "stage" ? -0.08 : -0.03]}
    >
      {streams.map((stream, index) => (
        <mesh
          key={`stream-${index}`}
          geometry={stream.geometry}
          material={lineMaterials[index % lineMaterials.length]}
        />
      ))}
      {streams.map((stream, index) => (
        <mesh
          key={`stream-particle-${index}`}
          ref={(node) => {
            if (node) {
              particleRefs.current[index] = node;
            }
          }}
          geometry={particleGeometry}
          material={particleMaterial}
        />
      ))}
    </group>
  );
}
