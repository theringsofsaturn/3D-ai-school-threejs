import { Environment, Gltf, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

const Experience = () => {
  return (
    <Canvas className="canvas">
      <OrbitControls />
      <Environment preset="sunset" />
      <ambientLight intensity={0.8} color={"pink"} />
      <Gltf
        src="/models/classroom.glb"
        position={[0, -8, 0]}
        rotation={[0, Math.PI, 0]}
      />
      <Gltf
        src="/models/emilian.glb"
        scale={(7, 7, 7)}
        position={[-11, -7.95, -14]}
        rotation={[0, 0.5, 0]}
      />
    </Canvas>
  );
};

export default Experience;
