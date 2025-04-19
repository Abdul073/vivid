"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FileText, Sparkles } from "lucide-react";
import { FloatingPaper } from "@/components/floating-paper";
import Link from "next/link";
import { RoboAnimation } from "./robo-animation";

export default function Hero() {
  return (
    <div className="relative min-h-[calc(100vh-76px)] flex items-center">
      {/* Floating papers background */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingPaper count={6} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Make your <span>Presentation</span> with{" "}
              <div className="inline-block relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 relative text-vivid">
                  AI Power
                  <motion.span
                    className="absolute -bottom-2 left-0 w-full h-1 block"
                    style={{
                      background: "transparent",
                      borderBottom: "3px solid", // Changed from 2px to 3px
                      borderImage:
                        "linear-gradient(to right, #c084fc, #db2777) 1",
                      borderRadius: "50% 50% 0 0",
                    }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </span>
              </div>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 text-xl mb-8 max-w-2xl mx-auto"
          >
            Give your presentation promot to our AI and it will create the
            layout in just a second.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg"
            >
              <FileText className="mr-2 h-5 w-5" />

              <Link href="sign-in">Get started</Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Animated robot */}
      <div className="absolute bottom-0 right-0 w-96 h-96">
        <RoboAnimation />
      </div>
    </div>
  );
}
