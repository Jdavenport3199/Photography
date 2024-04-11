"use client";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import Model2 from "./Model2";

interface Props {
  isHovered: boolean;
  setIsHovered: React.Dispatch<React.SetStateAction<boolean>>;
}

const Scene2: React.FC<Props> = ({ isHovered, setIsHovered }) => {
  return (
    <Canvas>
      <directionalLight intensity={2} position={[0, 2, 4]} />
      <Environment preset="city" />
      <OrbitControls enablePan={false} enableZoom={false} />
      <Model2 isHovered={isHovered} setIsHovered={setIsHovered} />
    </Canvas>
  );
};

export default Scene2;
