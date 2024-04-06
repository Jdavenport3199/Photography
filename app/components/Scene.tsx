"use client";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import Model from "./Model";

interface Props {
  isHovered: boolean;
  setIsHovered: React.Dispatch<React.SetStateAction<boolean>>;
}

const Scene: React.FC<Props> = ({ isHovered, setIsHovered }) => {
  return (
    <Canvas>
      <directionalLight intensity={2} position={[0, 2, 4]} />
      <Environment preset="city" />
      <OrbitControls enablePan={false} />
      <Model isHovered={isHovered} setIsHovered={setIsHovered} />
    </Canvas>
  );
};

export default Scene;
