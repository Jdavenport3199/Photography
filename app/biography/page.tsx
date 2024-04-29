"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ReactLenis } from "@studio-freight/react-lenis";
import { gsap } from "gsap";
import Link from "next/link";

export default function Biography() {
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
          className="container-holder"
          style={{
            position: "relative",
            height: "100vh",
            justifyContent: "center",
          }}
        >
          <div
            className="container"
            style={{
              width: "60%",
              display: "flex",
              alignItems: "center",
              gap: "2rem",
            }}
          >
            <Image
              id="fade"
              src="/image6.jpg"
              width={1000}
              height={668}
              alt=""
              style={{
                width: "60%",
                height: "400px",
                objectFit: "cover",
              }}
            />
            <div>
              <h2>Biography</h2>
              <br />
              <p>
                Danilo was born and raised in Naples, Italy. After graduating
                from the local Royal Academy of Fine Arts, he moved to New York
                City and assisted several top photographers in the industry. A
                few years later he began shooting on his own. He now lives in
                Italy and continues to travel world wide shooting for various
                international publications such as The New York Times, The
                Telegraph and Elle. His work has also appeared in Ten Magazine,
                Dazed and Confused, Wallpaper*, W Magazine, Vanity Fair and
                Vogue UK amongst others and it has been exhibited in several
                shows in the United States as well as in Europe.
              </p>
            </div>
          </div>
        </div>
      </main>
    </ReactLenis>
  );
}
