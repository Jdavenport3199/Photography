import { useGLTF, MeshTransmissionMaterial } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useRef } from "react";
import { useControls } from "leva";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  test1: boolean;
  setTest1: React.Dispatch<React.SetStateAction<boolean>>;
  test2: boolean;
  setTest2: React.Dispatch<React.SetStateAction<boolean>>;
}

const Model3: React.FC<Props> = ({ test1, setTest1, test2, setTest2 }) => {
  const { viewport } = useThree();
  const { nodes } = useGLTF("/Statue.glb");
  const mesh = useRef(null);
  const scale = viewport.width / 40;
  const tl = useRef(null);
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

  useFrame(() => {
    if (mesh.current) {
      if ((mesh.current as any).rotation.y < 1) {
        setTest1(false);
        setTest2(false);
      } else if (
        (mesh.current as any).rotation.y > 1 &&
        (mesh.current as any).rotation.y < 4
      ) {
        setTest1(true);
        setTest2(false);
      } else {
        setTest1(false);
        setTest2(true);
      }
    }
  });

  useGSAP(() => {
    (tl.current as any) = gsap.timeline({
      // ease: "power2.inOut",
      scrollTrigger: {
        trigger: ".main",
        start: "top top",
        end: "+=250%",
        scrub: true,
        pin: true,
      },
    });

    (tl.current as any).to(
      (mesh.current as any).rotation,
      {
        y: 6.25,
        x: 0,
        z: 0,
      },
      "start"
    );
    // .to(
    //   (mesh.current as any).rotation,
    //   {
    //     y: 6.25,
    //     x: 0,
    //     z: 0,
    //   },
    //   "end"
    // );
  }, []);

  return (
    <group scale={[scale, scale, scale]} dispose={null} rotation={[0, 2.25, 0]}>
      <mesh ref={mesh} {...nodes.Statue}>
        <MeshTransmissionMaterial {...materialProps} />
      </mesh>
    </group>
  );
};

export default Model3;
