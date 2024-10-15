import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import * as THREE from 'three';
import { BrainParticleMaterial } from '../shaders/BrainParticleMaterial';

extend({ BrainParticleMaterial });

const randomRange = (min, max) => Math.random() * (max - min) + min;

export function Particles({ allthecurves }) {
  const density = 10;
  const numberOfPoints = density * allthecurves.length;

  const myPoints = useRef([]);
  const brainGeo = useRef();

  let positions = useMemo(() => {
    let positions = []
    for (let i = 0; i < numberOfPoints; i++) {
      positions.push(
        randomRange(-1, 1),
        randomRange(-1, 1),
        randomRange(-1, 1),
      )
    }
    return new Float32Array(positions)
  }, [])

  let randoms = useMemo(() => {
    let randoms = []
    for (let i = 0; i < numberOfPoints; i++) {
      randoms.push(
        randomRange(0.3, 1.),
      )
    }
    return new Float32Array(randoms)
  }, [])

  useEffect(() => {
    for(let i = 0;i < allthecurves.length; i++) {
      for(let j = 0; j < density; j++) {
        myPoints.current.push({
          currentOffset: Math.random(),
          speed: Math.random() * 0.01,
          curve: allthecurves[i],
          curPosition: Math.random()
        })
    }}
  })

  useFrame(({ clock }) => {
    let curpositions = brainGeo.current.getAttribute('position').array

    for(let i = 0; i < myPoints.current.length; i++) {
      myPoints.current[i].curPosition += myPoints.current[i].speed;
      myPoints.current[i].curPosition = myPoints.current[i].curPosition % 1

      let curPoint = myPoints.current[i].curve.getPointAt(myPoints.current[i].curPosition)
      curpositions[i * 3] = curPoint.x
      curpositions[i * 3 + 1] = curPoint.y
      curpositions[i * 3 + 2] = curPoint.z


    }
    brainGeo.current.getAttribute('position').needsUpdate = true
  })

  return (
    <points>
      <bufferGeometry ref={brainGeo}>
        <bufferAttribute
          attach='attributes-position'
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach='attributes-randoms'
          array={randoms}
          count={randoms.length}
          itemSize={1}
        />
      </bufferGeometry>
      <brainParticleMaterial
        attach="material"
        depthTest={false}
        transparent={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}