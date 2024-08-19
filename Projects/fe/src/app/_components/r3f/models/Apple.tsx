import * as THREE from "three";
import { forwardRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three/addons";

type GLTFResult = GLTF & {
    nodes: {
        Mesh_apple: THREE.Mesh;
        Mesh_apple_1: THREE.Mesh;
        Mesh_apple_2: THREE.Mesh;
    };
    materials: {
        red: THREE.MeshStandardMaterial;
        brown: THREE.MeshStandardMaterial;
        green: THREE.MeshStandardMaterial;
    };
};

const Model = (
    props: JSX.IntrinsicElements["group"],
    modelRef: React.ForwardedRef<THREE.Group>
) => {
    const { nodes, materials } = useGLTF(
        "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/apple/model.gltf"
    ) as unknown as GLTFResult;

    useEffect(() => {
        const group = (modelRef as React.MutableRefObject<THREE.Group>).current;
        if (!group) return;

        group.traverse((child) => {
            if (child instanceof THREE.Mesh) child.castShadow = true;
        });

        materials.red.emissive = new THREE.Color(0xff0000);
        materials.red.emissiveIntensity = 5.0;
    }, []);

    return (
        <group ref={modelRef} {...props} dispose={null}>
            <mesh
                geometry={nodes.Mesh_apple.geometry}
                material={materials.red}
            />
            <mesh
                geometry={nodes.Mesh_apple_1.geometry}
                material={materials.brown}
            />
            <mesh
                geometry={nodes.Mesh_apple_2.geometry}
                material={materials.green}
            />
        </group>
    );
};

useGLTF.preload(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/apple/model.gltf"
);

export default forwardRef(Model);
