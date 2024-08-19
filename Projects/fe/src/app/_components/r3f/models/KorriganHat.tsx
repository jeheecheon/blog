import * as THREE from "three";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTF } from "three/addons";

type GLTFResult = GLTF & {
    nodes: {
        Chapeau: THREE.SkinnedMesh;
        root: THREE.Bone;
    };
    materials: {
        ["color_main.014"]: THREE.MeshStandardMaterial;
    };
};

const Model = forwardRef<THREE.Group, JSX.IntrinsicElements["skinnedMesh"]>(
    (props, groupRef) => {
        const internalRef = useRef<THREE.Group>(null!);
        const { nodes, materials, animations } = useGLTF(
            "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/korrigan-hat/model.gltf"
        ) as unknown as GLTFResult;

        const { actions } = useAnimations(animations, internalRef);

        useImperativeHandle(
            groupRef,
            () => internalRef.current as THREE.Group,
            []
        );

        useEffect(() => {
            materials["color_main.014"].emissive = new THREE.Color("#333333");
            materials["color_main.014"].emissiveIntensity = 0.1;

            const playAnimations = (isFirstAni: boolean) => {
                const action1 = actions.course_chapeau;
                const action2 = actions.pose_chapeau;

                if (!action1 || !action2) {
                    return;
                }

                if (isFirstAni) {
                    action1.play().crossFadeFrom(action2, 0.5, true);
                    setTimeout(() => action2.stopFading().stop(), 2000);
                } else {
                    action2.play().crossFadeFrom(action1, 0.5, true);
                    setTimeout(() => action1.stopFading().stop(), 2000);
                }

                setTimeout(() => playAnimations(!isFirstAni), 3000);
            };

            playAnimations(true);
        }, [actions, materials]);

        return (
            <group ref={internalRef} castShadow>
                <primitive object={nodes.root} />
                <skinnedMesh
                    {...props}
                    geometry={nodes.Chapeau.geometry}
                    material={materials["color_main.014"]}
                    skeleton={nodes.Chapeau.skeleton}
                />
            </group>
        );
    }
);

useGLTF.preload(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/korrigan-hat/model.gltf"
);

export default Model;
