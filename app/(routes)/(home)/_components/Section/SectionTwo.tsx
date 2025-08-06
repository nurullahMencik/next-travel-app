"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import React from "react";
import { TypeAnimation } from "react-type-animation";
const SectionTwo = () => {
  return (
    <div className="bg-orange-100 mt-12 ">
      <div className="mx-auto container text-center py-16 px-6 lg:px-28">
        <TypeAnimation
          sequence={[
            // Same substring at the start will only be typed out once, initially
            "WELCOME TO TRENDY TRAVEL",
            2000, // wait 1s before replacing "Mice" with "Hamsters"
            "SEYEHATE HOŞGELDİNİZ",
            2000,
            "WILLKOMMEN BEI TRENDY TRAVEL",
            2000,
          ]}
          wrapper="span"
          speed={50}
          className="text-2xl lg:text-4xl font-bold text-blue-600"
          repeat={Infinity}
        />

        <div className="flex justify-center items-center">
          <div className="flex justify-center items-center w-1/5">
            <hr className="border-gray-400 w-1/5" />
            <span className="mx-3 text-gray-400 text-xl">&#128064;</span>
            <hr className="border-gray-400 w-1/5" />
          </div>
        </div>
        <p className="tetx-gray-600 mb-8 max-w-3xl mx-auto">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis porro
          temporibus nisi. Voluptatum, nulla cupiditate facere ex dicta soluta
          mollitia magnam odit sunt tenetur perspiciatis est amet voluptatibus
          vero dolor enim, sit autem molestias itaque exercitationem repellat,
          debitis beatae quo. Inventore nostrum itaque voluptates magnam
          repellendus delectus accusamus a soluta!
        </p>
      </div>
      <div className="flex justify-center gap-4 pb-8">
        <motion.div
          whileHover={{
            scale: 1.2,
            transition: { duration: 1 },
          }}
          whileTap={{ scale: 0.9 }}
        >
          <Button className="bg-blue-500 hover:bg-blue-600 py-6 px-8 cursor-pointer">
            Detail
          </Button>
        </motion.div>
        <motion.div
          whileHover={{
            scale: 1.2,
            rotate:10,
            transition: { duration: 0.5 },
          }}
          whileTap={{ scale: 0.9 ,}}
        >
          <Button className="bg-green-500 hover:bg-green-600 py-6 px-8 cursor-pointer">
            Search
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default SectionTwo;
