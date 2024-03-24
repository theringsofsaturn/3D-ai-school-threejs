import { Box, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

const Experience = () => {
  return (
    <Canvas className="canvas">
      <OrbitControls />
      <ambientLight />
      <Box>
        <meshStandardMaterial />
      </Box>
    </Canvas>
  );
};

export default Experience;
