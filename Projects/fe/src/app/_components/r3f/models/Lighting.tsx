import * as THREE from "three";
import React, { forwardRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three/addons";

type GLTFResult = GLTF & {
    nodes: {
        lightning: THREE.Mesh;
    };
    materials: {
        ["Yellow.026"]: THREE.MeshStandardMaterial;
    };
};

function Model(
    props: JSX.IntrinsicElements["group"],
    modelRef: React.ForwardedRef<THREE.Group>
) {
    const { nodes, materials } = useGLTF(
        "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/lightning/model.gltf"
    ) as unknown as GLTFResult;

    useEffect(() => {
        const material = materials["Yellow.026"] as THREE.MeshStandardMaterial;
        const model = (modelRef as React.MutableRefObject<THREE.Group>).current;
        if (!material || !model) return;

        model.traverse((child) => {
            if (child instanceof THREE.Mesh) child.castShadow = true;
        });

        material.emissive = new THREE.Color(0xd5af50);
        material.emissiveIntensity = 1.3;
    }, []);

    return (
        <group ref={modelRef} {...props} dispose={null}>
            <mesh
                geometry={nodes.lightning.geometry}
                material={materials["Yellow.026"]}
                rotation={[Math.PI / 2, 0, 0]}
            />
        </group>
    );
}

useGLTF.preload(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/lightning/model.gltf"
);

export default forwardRef(Model);
