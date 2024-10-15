import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Tubes } from '../components/Tubes';
import { Particles } from '../components/Particles';

export const Brain = ({ braincurves }) => {

    return (
        <group position={[0, 0.05, 0]}> {/* Adjust height */}
            <Tubes allthecurves={braincurves} />
            <Particles allthecurves={braincurves} />
        </group>
    );
}
