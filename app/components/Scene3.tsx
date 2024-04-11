"use client";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import Model from "./Model3";

interface Props {
  test1: boolean;
  setTest1: React.Dispatch<React.SetStateAction<boolean>>;
  test2: boolean;
  setTest2: React.Dispatch<React.SetStateAction<boolean>>;
}

const Scene3: React.FC<Props> = ({ test1, setTest1, test2, setTest2 }) => {
  return (
    <Canvas>
      <directionalLight intensity={2} position={[0, 2, 4]} />
      <Environment preset="city" />
      <Model
        test1={test1}
        setTest1={setTest1}
        test2={test2}
        setTest2={setTest2}
      />
    </Canvas>
  );
};

export default Scene3;
