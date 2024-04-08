import { useGLTF, MeshTransmissionMaterial } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useRef } from "react";
import { useControls } from "leva";

interface Props {
  isHovered: boolean;
  setIsHovered: React.Dispatch<React.SetStateAction<boolean>>;
}

const Model2: React.FC<Props> = ({ isHovered, setIsHovered }) => {
  const { viewport } = useThree();
  const { nodes } = useGLTF("/Statue.glb");
  const mesh = useRef(null);
  const scale = viewport.width / 40;
  const materialProps = useControls({
    thickness: { value: 3, min: 0, max: 3, step: 0.05 },
    roughness: { value: 0.2, min: 0, max: 1, step: 0.1 },
    transmission: { value: 1, min: 0, max: 1, step: 0.1 },
    ior: { value: 0.4, min: 0, max: 3, step: 0.1 },
    chromaticAberration: { value: 0.6, min: 0, max: 1 },
    backside: { value: true },
    transparent: { value: false },
    opacity: { value: 0, min: 0, max: 1, step: 0.05 },
  });

  return (
    <group
      scale={[scale, scale, scale]}
      dispose={null}
      rotation={[0, 2.25, 0]}
      onDoubleClick={() => setIsHovered(!isHovered)}
    >
      <mesh ref={mesh} {...nodes.Statue}>
        <MeshTransmissionMaterial {...materialProps} />
      </mesh>
    </group>
  );
};

export default Model2;
