"use client";
import { motion, Transition, Easing } from "framer-motion"; // Easing'i import ettik
import Image from "next/image";
import React from "react";

const fadeInVariants = {
  hidden: { y: -50, opacity: 0 },
  visible: (index: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: index * 0.5,
      duration: 0.8,
      ease: "easeOut" as Easing,
    } as Transition,
  }),
};
const SectionOne = () => {
  return (
    <div className="mx-auto container lg:mt-8 md:mt-44 mt-64">
      <div className="flex flex-col md:flex-row gap-8 px-3 lg:px-28">
        <motion.div
          className="group overflow-hidden relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          transition={{ delay: 0.1 }}
          variants={fadeInVariants}
          custom={0}
        >
          <Image
            alt=""
            height={1260}
            width={590}
            src={"/home/1.jpg"}
            className="rounded-xl transition-transform duration-300 group-hover:scale-110"
          />
        </motion.div>
        <motion.div
          className="group overflow-hidden relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          transition={{ delay: 0.1 }}
          variants={fadeInVariants}
          custom={1}
        >
          <Image
            alt=""
            height={1260}
            width={590}
            src={"/home/2.jpg"}
            className="rounded-xl transition-transform duration-300 group-hover:scale-110"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default SectionOne;
