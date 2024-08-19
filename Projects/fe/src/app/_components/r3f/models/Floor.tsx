import { selectIsDarkMode } from "@/_redux/themeSlice";
import { useRef } from "react";
import { useSelector } from "react-redux";
import * as THREE from "three";

function Floor() {
    const floorRef = useRef<THREE.Mesh>(null!);
    const isDarkMode = useSelector(selectIsDarkMode);

    return (
        <mesh
            ref={floorRef}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -0.6, 0]}
            receiveShadow
        >
            <planeGeometry args={[10, 10]} />
            <shadowMaterial transparent opacity={isDarkMode ? 0.4 : 0.05} />
        </mesh>
    );
}

export default Floor;
