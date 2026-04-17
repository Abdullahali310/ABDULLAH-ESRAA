import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export function ParticlesBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) return null;

  return (
    <>
      {/* Rose Petals */}
      <Particles
        id="tsparticles-petals"
        className="absolute inset-0 z-0 pointer-events-none"
        options={{
          background: { color: { value: "transparent" } },
          fpsLimit: 60,
          particles: {
            color: { value: ["#5e1e24", "#C5A059", "#4a1c1c"] }, // Deep dark red/rose, plus some gold
            move: {
              direction: "bottom",
              enable: true,
              outModes: { default: "out" },
              random: true,
              speed: 0.8, // Very slow falling
              straight: false,
            },
            number: {
              density: { enable: true },
              value: 15,
            },
            opacity: {
              value: { min: 0.1, max: 0.4 },
              animation: { enable: true, speed: 0.2, sync: false },
            },
            shape: {
              type: "polygon",
              polygon: { sides: 5 } // Basic petal-like 
            },
            size: {
              value: { min: 4, max: 8 },
            },
            rotate: {
              value: { min: 0, max: 360 },
              direction: "random",
              animation: { enable: true, speed: 2 }
            },
            wobble: {
              enable: true,
              distance: 5,
              speed: 1
            }
          },
          detectRetina: true,
        }}
      />
      
      {/* Gold Dust */}
      <Particles
        id="tsparticles-dust"
        className="absolute inset-0 z-0 mix-blend-screen pointer-events-none"
        options={{
          background: { color: { value: "transparent" } },
          fpsLimit: 120,
          particles: {
            color: { value: ["#C5A059", "#F8F4E6"] },
            move: {
              direction: "none",
              enable: true,
              outModes: { default: "out" },
              random: true,
              speed: 0.3,
              straight: false,
            },
            number: { density: { enable: true }, value: 20 },
            opacity: {
              value: { min: 0.05, max: 0.2 },
              animation: { enable: true, speed: 0.4, sync: false },
            },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 2 } },
          },
          detectRetina: true,
        }}
      />
    </>
  );
}
