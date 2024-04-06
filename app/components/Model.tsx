import { useGLTF, MeshTransmissionMaterial } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { useControls } from "leva";

interface Props {
  isHovered: boolean;
  setIsHovered: React.Dispatch<React.SetStateAction<boolean>>;
}

const Model: React.FC<Props> = ({ isHovered, setIsHovered }) => {
  const { viewport } = useThree();
  const { nodes } = useGLTF("/test.glb");
  const mesh = useRef(null);
  const ref = useRef(null);
  const tl = useRef(null);
  const scale = viewport.width / 25;
  const materialProps = useControls({
    thickness: { value: 0, min: 0, max: 3, step: 0.05 },
    roughness: { value: 0.3, min: 0, max: 1, step: 0.1 },
    transmission: { value: 1, min: 0, max: 1, step: 0.1 },
    ior: { value: 2.3, min: 0, max: 3, step: 0.1 },
    chromaticAberration: { value: 0.14, min: 0, max: 1 },
    backside: { value: false },
    transparent: { value: false },
    opacity: { value: 0, min: 0, max: 1, step: 0.05 },
  });

  useFrame(() => {
    if (mesh.current && !isHovered) {
      (mesh.current as any).rotation.x += 0.001;
      (mesh.current as any).rotation.y += 0.001;
      (mesh.current as any).rotation.z += 0.001;
    }
  });

  return (
    <group
      ref={ref}
      scale={[scale, scale, scale]}
      dispose={null}
      position={[0, 0, 0]}
      onDoubleClick={() => setIsHovered(!isHovered)}
    >
      <mesh ref={mesh} {...nodes.Icosphere}>
        <MeshTransmissionMaterial {...materialProps} />
      </mesh>
    </group>
  );
};

export default Model;
