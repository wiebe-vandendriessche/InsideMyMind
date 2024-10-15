import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

export const BrainMaterial = shaderMaterial(
  { time: 0, color: new THREE.Color(0.1, 0.3, 0.6), mouse: new THREE.Vector3(0, 0, 0) },
  // vertex shader
  /*glsl*/ `
    varying vec2 vUv;
    uniform float time;
    varying float vProgress;
    uniform vec3 mouse;

    void main() {
      vUv = uv;
      vProgress = smoothstep(-1.,1.,sin(vUv.x*8. + time*3.));

      vec3 p = position;
      float maxDist = 0.05;
      float dist = length(mouse - p);
      if(dist < maxDist) {
        vec3 dir = normalize(mouse - p);
        dir*= (1.-dist / maxDist);
        p -= dir*0.02;
      }

      gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
    }
  `,
  // fragment shader
  /*glsl*/ `
    uniform float time;
    uniform vec3 color;
    varying vec2 vUv;
    varying float vProgress;
    void main() {
      vec3 finalColor = mix(color, color*0.25, vProgress);
  
      float hideCorners = smoothstep(1., 0.9, vUv.x);
      float hideCorners1 = smoothstep(0., 0.1, vUv.x);
  
      //gl_FragColor.rgba = vec4(vec3(vProgress), 1.);
      gl_FragColor.rgba = vec4(finalColor, hideCorners * hideCorners1);
    }
  `
);