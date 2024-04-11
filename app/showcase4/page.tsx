"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { ReactLenis } from "@studio-freight/react-lenis";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

export default function Showcase4() {
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

  const projectDiv = useRef<HTMLDivElement>(null);
  const bioDiv = useRef<HTMLDivElement>(null);
  const contactDiv = useRef<HTMLDivElement>(null);
  const scrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <ReactLenis root>
      <main>
        <div className="nav">
          <button onClick={() => scrollTo(projectDiv)}>Project</button>
          <button onClick={() => scrollTo(bioDiv)}>Biography</button>
          <button onClick={() => scrollTo(bioDiv)}>Contact</button>
        </div>

        <div
          className="main"
          style={{
            width: "100%",
            minHeight: "100vh",
            position: "relative",
          }}
          ref={projectDiv}
        >
          <div
            className="background"
            style={{ display: "flex", alignItems: "center" }}
          >
            <Image
              src="/image7.jpg"
              width={1920}
              height={1080}
              alt=""
              ref={image1}
              style={{
                objectFit: "contain",
                width: "100%",
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
              width={1920}
              height={400}
              alt=""
              ref={image2}
              style={{
                width: "25%",
                objectFit: "cover",
                position: "absolute",
                left: "15%",
                bottom: "5%",
                zIndex: "2",
              }}
            />
            <Image
              src="/image2.jpg"
              width={1920}
              height={650}
              alt=""
              ref={image3}
              style={{
                width: "25%",
                objectFit: "cover",
                position: "absolute",
              }}
            />
            <Image
              src="/image3.jpg"
              width={1920}
              height={300}
              alt=""
              ref={image4}
              style={{
                width: "25%",
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

        <div
          className="container-holder"
          style={{
            position: "relative",
            height: "100vh",
            justifyContent: "center",
          }}
          ref={bioDiv}
        >
          <div className="container" style={{ width: "80%", display: "flex", alignItems: "center", gap: "2rem"}}>
          <Image
              src="/image6.jpg"
              width={1920}
              height={450}
              alt=""
              style={{
                width: "25%",
                objectFit: "cover",
                // position: "absolute",
                // right: "15%",
                // bottom: "0%",
              }}
            />
            <div>
            <h2>Biography</h2>
            <br />
            <p>
              Danilo was born and raised in Naples, Italy. After graduating from
              the local Royal Academy of Fine Arts, he moved to New York City
              and assisted several top photographers in the industry. A few
              years later he began shooting on his own. He now lives in Italy
              and continues to travel world wide shooting for various
              international publications such as The New York Times, The
              Telegraph and Elle. His work has also appeared in Ten Magazine,
              Dazed and Confused, Wallpaper*, W Magazine, Vanity Fair and Vogue
              UK amongst others and it has been exhibited in several shows in
              the United States as well as in Europe.
            </p>
            </div>
          </div>
        </div>
      </main>
    </ReactLenis>
  );
}
