import * as THREE from "three";
import { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three/addons";

type GLTFResult = GLTF & {
    nodes: {
        jackolantern_big: THREE.Mesh;
    };
    materials: {
        ["Orange.005"]: THREE.MeshStandardMaterial;
    };
};

function Model(props: JSX.IntrinsicElements["group"]) {
    const modelRef = useRef<THREE.Group>(null!);
    const { nodes, materials } = useGLTF(
        "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/jack-o-lantern/model.gltf"
    ) as unknown as GLTFResult;

    useEffect(() => {
        const group = (modelRef as React.MutableRefObject<THREE.Group>).current;
        const material = materials["Orange.005"] as THREE.MeshStandardMaterial;
        if (!group || !material) return;

        group.traverse((child) => {
            if (child instanceof THREE.Mesh) child.castShadow = true;
        });

        material.emissiveIntensity = 1;
        material.emissive = new THREE.Color(0xff6600);
    }, []);
    return (
        <group ref={modelRef} {...props} dispose={null}>
            <mesh
                geometry={nodes.jackolantern_big.geometry}
                material={materials["Orange.005"]}
            />
        </group>
    );
}

useGLTF.preload(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/jack-o-lantern/model.gltf"
);

export default Model;
