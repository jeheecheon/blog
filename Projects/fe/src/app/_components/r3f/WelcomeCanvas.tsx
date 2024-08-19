import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

import Models from "@/_components/r3f/Models";
import { Leva } from "leva";

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
                <directionalLight
                    castShadow
                    intensity={1}
                    position={[3, 5, 1]}
                    shadow-mapSize-height={1024}
                    shadow-mapSize-width={1024}
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
