import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useNavigate } from 'react-router-dom';
import { OrbitControls } from '@react-three/drei';
import { generateCurves, generateBrainCurves } from '../utils/curveUtils';
import { Brain } from '../components/Brain';
import { data } from '../data';
import * as THREE from 'three';

import './HomePage.css'; // Styles imported

const HomePage = () => {
    const navigate = useNavigate();

    const handleEnterClick = () => {
        // Logic to navigate to the next part of the portfolio
        // For example, using React Router
        navigate('/InsideMyMind/portfolio');  // Navigate to the portfolio page
    };

    const PATHS = data.economics[0].paths
    const allthecurves = generateCurves();
    const braincurves = generateBrainCurves(PATHS);

    return (
        <div className="homepage-container">
            <Canvas camera={{ position: [0, 0, 0.25], near: 0.001, far: 5 }}>
                <color attach="background" args={['black']} />
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <Brain braincurves={braincurves} />
                <OrbitControls enableZoom={false} autoRotate={true} /> {/* Optional controls */}
            </Canvas>
            <div className="text-container">
                <h1 className="title">Enter my mind</h1>
                <h2 className="subtitle">Wiebe Vandendriessche test</h2>
            </div>
            <button
                onClick={handleEnterClick}
                className="enter-button"
            >
                Enter
            </button>
        </div>
    );
};

export default HomePage;