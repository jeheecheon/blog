import * as THREE from "three";
import { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three/addons";

type GLTFResult = GLTF & {
    nodes: {
        coin: THREE.Mesh;
    };
    materials: {
        ["Gold.009"]: THREE.MeshStandardMaterial;
    };
};

export default function Model(props: JSX.IntrinsicElements["group"]) {
    const modelRef = useRef<THREE.Group>(null!);
    const { nodes, materials } = useGLTF(
        "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/coin/model.gltf"
    ) as unknown as GLTFResult;

    useEffect(() => {
        const material = materials["Gold.009"] as THREE.MeshStandardMaterial;
        const model = (modelRef as React.MutableRefObject<THREE.Group>).current;
        if (!material || !model) return;

        model.traverse((child) => {
            if (child instanceof THREE.Mesh) child.castShadow = true;
        });

        material.emissive = new THREE.Color(0xd5af50);
        material.emissiveIntensity = 0.4;
    }, []);

    return (
        <group ref={modelRef} {...props} dispose={null}>
            <mesh
                geometry={nodes.coin.geometry}
                material={materials["Gold.009"]}
                rotation={[Math.PI / 2, 0, 0]}
            />
        </group>
    );
}

useGLTF.preload(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/coin/model.gltf"
);
