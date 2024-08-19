import * as THREE from "three";
import { forwardRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three/addons";

type GLTFResult = GLTF & {
    nodes: {
        star: THREE.Mesh;
    };
    materials: {
        ["Yellow.030"]: THREE.MeshStandardMaterial;
    };
};

function Model(
    props: JSX.IntrinsicElements["group"],
    modelRef: React.ForwardedRef<THREE.Group>
) {
    const { nodes, materials } = useGLTF(
        "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/star/model.gltf"
    ) as unknown as GLTFResult;

    useEffect(() => {
        const material = materials["Yellow.030"] as THREE.MeshStandardMaterial;
        const model = (modelRef as React.MutableRefObject<THREE.Group>).current;
        if (!material || !model) return;

        model.traverse((child) => {
            if (child instanceof THREE.Mesh) child.castShadow = true;
        });

        material.emissive = new THREE.Color(0xd5af50);
        material.emissiveIntensity = 1.4;
    }, []);

    return (
        <group ref={modelRef} {...props} dispose={null}>
            <mesh
                geometry={nodes.star.geometry}
                material={materials["Yellow.030"]}
                rotation={[Math.PI / 2, 0, 0]}
            />
        </group>
    );
}

useGLTF.preload(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/star/model.gltf"
);

export default forwardRef(Model);
