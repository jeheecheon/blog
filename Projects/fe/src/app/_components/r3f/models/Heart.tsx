import * as THREE from "three";
import { forwardRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three/addons";

type GLTFResult = GLTF & {
    nodes: {
        heart_teamRed: THREE.Mesh;
    };
    materials: {
        ["Red.015"]: THREE.MeshStandardMaterial;
    };
};

function Model(
    props: JSX.IntrinsicElements["group"],
    modelRef: React.ForwardedRef<THREE.Group>
) {
    const { nodes, materials } = useGLTF(
        "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/heart/model.gltf"
    ) as unknown as GLTFResult;

    useEffect(() => {
        const material = materials["Red.015"] as THREE.MeshStandardMaterial;
        const group = (modelRef as React.MutableRefObject<THREE.Group>).current;
        if (!material || !group) return;

        group.traverse((child) => {
            if (child instanceof THREE.Mesh) child.castShadow = true;
        });

        material.emissive = new THREE.Color(0xff0000);
        material.emissiveIntensity = 4.1;
    }, []);
    return (
        <group ref={modelRef} {...props} dispose={null}>
            <mesh
                geometry={nodes.heart_teamRed.geometry}
                material={materials["Red.015"]}
                rotation={[Math.PI / 2, 0, 0]}
            />
        </group>
    );
}

useGLTF.preload(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/heart/model.gltf"
);

export default forwardRef(Model);
