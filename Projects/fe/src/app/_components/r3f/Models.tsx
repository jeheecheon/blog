import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import KorriganHat from "@/_components/r3f/models/KorriganHat";
import { Center } from "@react-three/drei";
import * as THREE from "three";

import Sword from "@/_components/r3f/models/Sword";
import Floor from "@/_components/r3f/models/Floor";
import Apple from "@/_components/r3f/models/Apple";
import ReactLogo from "@/_components/r3f/models/ReactLogo";
import Heart from "@/_components/r3f/models/Heart";
import Lighting from "@/_components/r3f/models/Lighting";
import Star from "@/_components/r3f/models/Star";

function Models() {
    const characterRef = useRef<THREE.Group>(null!);
    const swordRef = useRef<THREE.Group>(null!);
    const appleRef = useRef<THREE.Group>(null!);
    const reactLogoRef = useRef<THREE.Group>(null!);
    const heartRef = useRef<THREE.Group>(null!);
    const lightingRef = useRef<THREE.Group>(null!);
    const starRef = useRef<THREE.Group>(null!);

    const objectGroupRef = useRef<THREE.Group>(null!);

    useFrame((state) => {
        characterRef.current.lookAt(state.pointer.x, state.pointer.y + 0.5, 2);

        objectGroupRef.current.rotation.y = state.clock.elapsedTime * 0.5;

        swordRef.current.rotation.y = state.clock.elapsedTime;
        swordRef.current.rotation.z = state.clock.elapsedTime;

        appleRef.current.rotation.y = state.clock.elapsedTime;
        appleRef.current.rotation.z = state.clock.elapsedTime;

        reactLogoRef.current.rotation.y = state.clock.elapsedTime;
        reactLogoRef.current.rotation.z = state.clock.elapsedTime;

        heartRef.current.rotation.y = state.clock.elapsedTime;
        heartRef.current.rotation.z = state.clock.elapsedTime;

        lightingRef.current.rotation.y = state.clock.elapsedTime;
        lightingRef.current.rotation.z = state.clock.elapsedTime;

        starRef.current.rotation.y = state.clock.elapsedTime;
        starRef.current.rotation.z = state.clock.elapsedTime;
    });

    return (
        <>
            <Floor />

            <Center position-x={-0.2} scale={[2.5, 2.5, 2]}>
                <KorriganHat ref={characterRef} receiveShadow castShadow />
            </Center>

            <group ref={objectGroupRef}>
                <Sword
                    ref={swordRef}
                    scale={[0.5, 0.5, 0.5]}
                    position={[0, 0, 1.3]}
                />

                <Apple ref={appleRef} position={[1.2, 0.5, -0.5]} />

                <Center position={[1, -0.1, 0.6]} scale={[0.1, 0.1, 0.1]}>
                    <ReactLogo ref={reactLogoRef} />
                </Center>

                <Heart
                    ref={heartRef}
                    scale={[0.2, 0.2, 0.2]}
                    position={[0.8, 0.2, -1]}
                />

                <Lighting
                    ref={lightingRef}
                    scale={[0.2, 0.2, 0.2]}
                    position={[-1, 0, 0.5]}
                />

                <Star
                    ref={starRef}
                    scale={[0.2, 0.2, 0.2]}
                    position={[-1, 0.2, -1]}
                />
            </group>
        </>
    );
}

export default Models;
