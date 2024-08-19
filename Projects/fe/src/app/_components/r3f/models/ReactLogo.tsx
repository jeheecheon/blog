import * as THREE from "three";
import { forwardRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three/addons";

type GLTFResult = GLTF & {
    nodes: {
        Cube: THREE.Mesh;
        Torus003: THREE.Mesh;
        Torus001: THREE.Mesh;
        Torus002: THREE.Mesh;
    };
    materials: {
        ["default"]: THREE.MeshStandardMaterial;
        [key: string]: THREE.MeshStandardMaterial;
    };
};

function Model(
    props: JSX.IntrinsicElements["group"],
    modelRef: React.ForwardedRef<THREE.Group>
) {
    const { nodes, materials } = useGLTF(
        "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/react-logo/model.gltf"
    ) as unknown as GLTFResult;

    useEffect(() => {
        const group = (modelRef as React.MutableRefObject<THREE.Group>).current;
        const material = materials.default as THREE.MeshStandardMaterial;
        if (!group || !material) return;

        group.traverse((child) => {
            if (child instanceof THREE.Mesh) child.castShadow = true;
        });

        material.emissive = new THREE.Color(0x2491d5);
        material.color = new THREE.Color(0x2491d5);
        material.emissiveIntensity = 4.1;
    }, []);

    return (
        <group ref={modelRef} {...props} dispose={null}>
            <mesh
                geometry={nodes.Cube.geometry}
                material={nodes.Cube.material}
                position={[0, 1.31, 0]}
                rotation={[0, Math.PI / 2, 0]}
                scale={0.27}
            >
                <mesh
                    geometry={nodes.Torus003.geometry}
                    material={nodes.Cube.material}
                    position={[-0.04, -0.11, 0]}
                    rotation={[0.89, 0, -Math.PI / 2]}
                    scale={[3.75, 1.47, 3]}
                />
                <mesh
                    geometry={nodes.Torus001.geometry}
                    material={nodes.Cube.material}
                    position={[0.34, -0.08, 0.02]}
                    rotation={[-0.16, 0, -Math.PI / 2]}
                    scale={[3.75, 1.47, 3]}
                />
                <mesh
                    geometry={nodes.Torus002.geometry}
                    material={nodes.Cube.material}
                    position={[-0.52, -0.1, 0.16]}
                    rotation={[-1.18, 0, -Math.PI / 2]}
                    scale={[3.75, 1.47, 3]}
                />
            </mesh>
        </group>
    );
}

useGLTF.preload(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/react-logo/model.gltf"
);

export default forwardRef(Model);
