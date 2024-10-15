import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { BrainMaterial } from '../shaders/BrainMaterial';
import * as THREE from 'three';
import { extend, useThree } from '@react-three/fiber';

extend({ BrainMaterial });

function Tube({ curve }) {
  const brainMat = useRef();
  const { viewport } = useThree();

  useFrame(({ clock, mouse }) => {
    brainMat.current.uniforms.time.value = clock.getElapsedTime();
    brainMat.current.uniforms.mouse.value = new THREE.Vector3(
        mouse.x * viewport.width/2,
        mouse.y * viewport.height/2,
        0
    )
});

  return (
    <mesh>
      <tubeGeometry args={[curve, 64, 0.001, 10, false]} />
      <brainMaterial
        ref={brainMat}
        side={THREE.DoubleSide}
        transparent={true}
        depthTest={false}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

export default Tube;