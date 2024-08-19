import { useGLTF } from "@react-three/drei";
import { forwardRef, useEffect } from "react";
import * as THREE from "three";
import { GLTF } from "three/addons";

interface GLTFResult extends GLTF {
    nodes: {
        sword_uncommon: THREE.Group;
    };
    materials: {
        "BrownDark.073": THREE.MeshStandardMaterial;
        "Metal.102": THREE.MeshStandardMaterial;
        "Stone.037": THREE.MeshStandardMaterial;
        [key: string]: THREE.MeshStandardMaterial;
    };
}

function Model(props: JSX.IntrinsicElements["group"], modelRef: React.ForwardedRef<THREE.Group>) {
    const { nodes, materials } = useGLTF(
        "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/sword-1/model.gltf"
    ) as unknown as GLTFResult;

    useEffect(() => {
        const group = (modelRef as React.MutableRefObject<THREE.Group>).current;
        if (!group) return;

        group.traverse((child) => {
            if (child instanceof THREE.Mesh) child.castShadow = true;
        });

        for (const material in materials) {
            materials[material].emissive = new THREE.Color(0x0f2022);
        }

        materials["BrownDark.073"].emissiveIntensity = 10;
        materials["Metal.102"].emissiveIntensity = 59;
        materials["Stone.037"].emissiveIntensity = 10;
    }, []);

    return (
        <primitive ref={modelRef} object={nodes.sword_uncommon} {...props} />
    );
}

useGLTF.preload(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/sword-1/model.gltf"
);

export default forwardRef(Model);
