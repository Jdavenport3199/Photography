import { useGLTF, MeshTransmissionMaterial } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useRef } from "react";
import { useControls } from "leva";
import { gsap } from "gsap";

interface Props {
  test1: boolean;
  setTest1: React.Dispatch<React.SetStateAction<boolean>>;
  test2: boolean;
  setTest2: React.Dispatch<React.SetStateAction<boolean>>;
}

const Model: React.FC<Props> = ({ test1, setTest1, test2, setTest2 }) => {
  const { viewport } = useThree();
  const { nodes } = useGLTF("/Statue.glb");
  const mesh = useRef(null);
  const scale = viewport.width / 40;
  const tl1 = useRef(null);
  const tl2 = useRef(null);
  const tl3 = useRef(null);
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
        (mesh.current as any).rotation.y < 2
      ) {
        setTest1(true);
        setTest2(false);
      } else {
        setTest1(false);
        setTest2(true);
      }
    }
  });

  useLayoutEffect(() => {
    (tl1.current as any) = gsap.timeline({ paused: true });
    (tl2.current as any) = gsap.timeline({ paused: true });
    (tl3.current as any) = gsap.timeline({ paused: true });

    (tl1.current as any).to(
      (mesh.current as any).rotation,
      {
        ease: "back.inOut",
        duration: 2,
        y: 1.5,
        x: 0,
        z: 0,
      },
      0
    );

    (tl1.current as any).to(
      (mesh.current as any).scale,
      {
        ease: "power2.inOut",
        duration: 2,
        y: 0.2,
        x: 0.2,
        z: 0.2,
      },
      0
    );

    (tl2.current as any).to(
      (mesh.current as any).rotation,
      {
        ease: "back.inOut",
        duration: 2,
        y: 4,
        x: 0,
        z: 0,
      },
      0
    );

    (tl2.current as any).to(
      (mesh.current as any).scale,
      {
        ease: "power2.inOut",
        duration: 2,
        y: 0.25,
        x: 0.25,
        z: 0.25,
      },
      0
    );

    (tl3.current as any).to(
      (mesh.current as any).rotation,
      {
        ease: "back.inOut",
        duration: 2,
        y: 8,
        x: 0,
        z: 0,
      },
      0
    );

    (tl3.current as any).to(
      (mesh.current as any).scale,
      {
        ease: "power2.inOut",
        duration: 2,
        y: 0.25,
        x: 0.25,
        z: 0.25,
      },
      0
    );
  }, []);

  const handleScroll = (event: WheelEvent | TouchEvent) => {
    const deltaY =
      "deltaY" in event
        ? (event as WheelEvent).deltaY
        : (event as TouchEvent).changedTouches[0].pageY;
    // const handleScroll = (event: any) => {
    //   const deltaY = event.deltaY;

    if (deltaY > 0) {
      (tl1.current as any).play();
    } else if (deltaY < 0 && (tl2.current as any).time() === 0) {
      (tl1.current as any).reverse();
    }

    if (
      deltaY > 0 &&
      (tl1.current as any).time() === (tl1.current as any).totalDuration()
    ) {
      (tl2.current as any).play();
    } else if (deltaY < 0 && (tl3.current as any).time() === 0) {
      (tl2.current as any).reverse();
    }

    if (
      deltaY > 0 &&
      (tl2.current as any).time() === (tl2.current as any).totalDuration()
    ) {
      (tl3.current as any).play();
    } else {
      (tl3.current as any).reverse();
    }
  };

  useEffect(() => {
    window.addEventListener("wheel", handleScroll);
    window.addEventListener("touchstart", handleScroll);
    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchstart", handleScroll);
    };
  }, []);

  // useEffect(() => {
  //   window.addEventListener("wheel", handleScroll);
  //   return () => {
  //     window.removeEventListener("wheel", handleScroll);
  //   };
  // }, []);

  return (
    <group scale={[scale, scale, scale]} dispose={null} rotation={[0, 2.25, 0]}>
      <mesh ref={mesh} {...nodes.Statue}>
        <MeshTransmissionMaterial {...materialProps} />
      </mesh>
    </group>
  );
};

export default Model;
