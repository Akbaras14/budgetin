"use client";

import { motion } from "framer-motion";
import HeroText from "./HeroText";
import ParallaxText from "./ParallaxText";
import HeroGraphic from "./HeroGraphic";
export default function Hero() {
  return (
    <motion.section
      id="hero"
      className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center"
      initial="initial"
      animate="animate"
    >
      <HeroGraphic />
      <HeroText />
      <div className="mt-10 w-full overflow-hidden">
        <ParallaxText direction={500} baseVelocity={-1}>
          UNIVERSITAS PAMULANG
        </ParallaxText>
        <ParallaxText direction={-500} baseVelocity={1}>
          TEKNIK INFORMATIKA
        </ParallaxText>
      </div>
    </motion.section>
  );
}
