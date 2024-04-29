"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ReactLenis } from "@studio-freight/react-lenis";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

export default function Home() {
  gsap.registerPlugin(ScrollTrigger);

  const [showText, setShowText] = useState(false);
  const tl = useRef(null);
  const image1 = useRef(null);
  const image2 = useRef(null);
  const image3 = useRef(null);
  const image4 = useRef(null);
  const text = useRef(null);

  useGSAP(() => {
    (tl.current as any) = gsap.timeline({
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".main",
        start: "top top",
        end: "+=250%",
        scrub: true,
        pin: true,
        onUpdate: function () {
          if ((tl.current as any).progress() >= 0.575) {
            setShowText(true);
            (tl.current as any)
              .to(
                text.current as any,
                {
                  opacity: 0,
                },
                "start"
              )
              .to(
                text.current as any,
                {
                  opacity: 1,
                },
                "end"
              );
          } else {
            setShowText(false);
          }
        },
      },
    });

    (tl.current as any)
      .to(
        image1.current as any,
        {
          ease: "power1.in",
          y: -1080,
          x: 0,
          z: 0,
        },
        "start"
      )
      .to(
        image2.current as any,
        {
          y: -1250,
          x: 0,
          z: 0,
        },
        "start"
      )
      .to(
        image2.current as any,
        {
          y: -2000,
          x: 0,
          z: 0,
        },
        "end"
      )
      .to(
        image3.current as any,
        {
          y: -1050,
          x: 0,
          z: 0,
        },
        "start"
      )
      .to(
        image4.current as any,
        {
          y: -1150,
          x: 0,
          z: 0,
        },
        "start"
      )
      .to(
        image4.current as any,
        {
          y: -2250,
          x: 0,
          z: 0,
        },
        "end"
      );
  }, []);

  const [dropdown, setDropdown] = useState(false);
  const projectsRef = useRef(null);

  useEffect(() => {
    if (dropdown) {
      gsap.to(projectsRef.current, {
        height: "auto",
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.to(projectsRef.current, {
            visibility: "visible",
            opacity: 1,
            duration: 0.5,
            ease: "power2.inOut",
          });
        },
      });
    } else if (!dropdown) {
      gsap.to(projectsRef.current, {
        height: 0,
        duration: 0.5,
        ease: "power2.inOut",
        onStart: () => {
          gsap.to(projectsRef.current, {
            visibility: "hidden",
            opacity: 0,
            duration: 0.25,
            ease: "power2.inOut",
          });
        },
      });
    }
  }, [dropdown]);

  const handleDropdown = () => {
    setDropdown(!dropdown);
  };

  return (
    <ReactLenis root>
      <main>
        <div className="nav">
          <Link href="/">
            <h1>Danilo Scarpati</h1>
          </Link>
          <div className="projects-list">
            <button onClick={() => handleDropdown()}>Projects</button>
            <ul className="projects" ref={projectsRef}>
              <li style={{ marginTop: "0.6rem" }}>
                <Link href="/">Tuscan Quarries - 2022</Link>
              </li>
            </ul>
          </div>
          <Link href="/biography">Biography</Link>
        </div>

        <div
          className="main"
          style={{
            width: "100%",
            minHeight: "100vh",
            position: "relative",
          }}
        >
          <div
            className="background"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              id="fade"
              src="/image7.jpg"
              width={771}
              height={1000}
              alt=""
              ref={image1}
              style={{
                objectFit: "contain",
                height: "80vh",
              }}
            />
          </div>

          <div
            className="background"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
              height: "200vh",
            }}
          >
            <Image
              src="/image1.jpg"
              width={721}
              height={932}
              alt=""
              ref={image2}
              style={{
                width: "25%",
                height: "400px",
                objectFit: "cover",
                position: "absolute",
                left: "15%",
                bottom: "5%",
                zIndex: "2",
              }}
            />
            <Image
              src="/image2.jpg"
              width={563}
              height={853}
              alt=""
              ref={image3}
              style={{
                width: "25%",
                height: "650px",
                objectFit: "cover",
                position: "absolute",
              }}
            />
            <Image
              src="/image3.jpg"
              width={1000}
              height={772}
              alt=""
              ref={image4}
              style={{
                width: "25%",
                height: "300px",
                objectFit: "cover",
                position: "absolute",
                right: "15%",
                bottom: "0%",
              }}
            />
          </div>

          <div className="container-holder" style={{ zIndex: "3" }}>
            <div className="container" style={{ width: "35%" }}>
              {showText && (
                <div ref={text}>
                  <h2>Tuscan Quarries</h2>
                  <p>2022</p>
                  <br />
                  <p>Danilo Scarpati - Port Magazine</p>
                  <Link
                    href="https://www.daniloscarpati.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="italics"
                  >
                    daniloscarpati.com
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </ReactLenis>
  );
}
