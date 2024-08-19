import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

import Models from "@/_components/r3f/Models";
import { Leva } from "leva";
import { OrbitControls } from "@react-three/drei";

function WelcomeCanvas() {
    const fontSize = window.getComputedStyle(document.documentElement).fontSize;
    const needsZoom = parseInt(fontSize) * 40 <= innerWidth;

    return (
        <>
            <Leva />
            <Canvas
                shadows
                dpr={[1, 1]}
                camera={{
                    zoom: needsZoom ? 0.8 : 1.5,
                    position: [0, 1, 1.4],
                }}
            >
                <OrbitControls />
                <directionalLight
                    castShadow
                    intensity={1}
                    position={[3, 5, 1]}
                    shadow-mapSize-height={1024}
                    shadow-mapSize-width={1024}
                    shadow-camera-far={8}
                    shadow-camera-near={4}
                    shadow-camera-left={-2.5}
                    shadow-camera-right={2.5}
                    shadow-camera-top={2.5}
                    shadow-camera-bottom={-2.5}
                />
                <ambientLight intensity={2} />
                <EffectComposer>
                    <Bloom luminanceThreshold={1.1} mipmapBlur />
                </EffectComposer>

                <Models />
            </Canvas>
        </>
    );
}

export default WelcomeCanvas;
