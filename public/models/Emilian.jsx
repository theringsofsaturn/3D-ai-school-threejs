import { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import modelPath from "./emilian-avatar.glb";

export function Emilian(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(modelPath);
  const { actions, mixer } = useAnimations(animations, group);
  console.log("ANIMATIONS", animations);

  useEffect(() => {
    mixer
      .clipAction(animations.find((a) => a.name === "IdleV4.2(maya_head)"))
      .play();
  }, [mixer, animations]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="emilian-kasemi">
          <skinnedMesh
            name="avaturn_body"
            geometry={nodes.avaturn_body.geometry}
            material={materials.avaturn_body_material}
            skeleton={nodes.avaturn_body.skeleton}
          />
          <skinnedMesh
            name="avaturn_hair_0"
            geometry={nodes.avaturn_hair_0.geometry}
            material={materials.avaturn_hair_0_material}
            skeleton={nodes.avaturn_hair_0.skeleton}
          />
          <skinnedMesh
            name="avaturn_look_0"
            geometry={nodes.avaturn_look_0.geometry}
            material={materials.avaturn_look_0_material}
            skeleton={nodes.avaturn_look_0.skeleton}
          />
          <skinnedMesh
            name="avaturn_shoes_0"
            geometry={nodes.avaturn_shoes_0.geometry}
            material={materials.avaturn_shoes_0_material}
            skeleton={nodes.avaturn_shoes_0.skeleton}
          />
          <primitive object={nodes.Hips} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(modelPath);
