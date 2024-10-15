import * as THREE from 'three';

const randomRange = (min, max) => Math.random() * (max - min) + min;

export const generateCurves = (numCurves = 100) => {
  let curves = [];
  for (let i = 0; i < numCurves; i++) {
    let points = [];
    let length = randomRange(0.1, 1);

    for (let j = 0; j < 100; j++) {
      points.push(
        new THREE.Vector3().setFromSphericalCoords(
          -1,
          (j / 100) * Math.PI * length,
          (i / 100) * Math.PI * 2
        )
      );
    }
    curves.push(new THREE.CatmullRomCurve3(points));
  }
  return curves;
};

export const generateBrainCurves = (paths) => {
  let braincurves = [];
  paths.forEach((path) => {
    let points = [];
    for (let j = 0; j < path.length; j += 3) {
      points.push(new THREE.Vector3(path[j], path[j + 1], path[j + 2]));
    }
    braincurves.push(new THREE.CatmullRomCurve3(points));
  });
  return braincurves;
};