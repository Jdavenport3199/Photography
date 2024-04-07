"use client";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import Model from "./Model";

interface Props {
  isHovered: boolean;
  setIsHovered: React.Dispatch<React.SetStateAction<boolean>>;
  test1: boolean;
  setTest1: React.Dispatch<React.SetStateAction<boolean>>;
  test2: boolean;
  setTest2: React.Dispatch<React.SetStateAction<boolean>>;
}

const Scene: React.FC<Props> = ({
  isHovered,
  setIsHovered,
  test1,
  setTest1,
  test2,
  setTest2,
}) => {
  return (
    <Canvas>
      <directionalLight intensity={2} position={[0, 2, 4]} />
      <Environment preset="city" />
      <OrbitControls enablePan={false} enableZoom={false}/>
      <Model
        isHovered={isHovered}
        setIsHovered={setIsHovered}
        test1={test1}
        setTest1={setTest1}
        test2={test2}
        setTest2={setTest2}
      />
    </Canvas>
  );
};

export default Scene;
