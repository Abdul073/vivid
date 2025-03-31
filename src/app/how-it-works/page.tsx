"use client";

import { motion } from "framer-motion";
import {
  Wand2,
  FileInput,
  LayoutTemplate,
  MousePointerClick,
  Sparkles,
  Download,
  Image as ImageIcon,
  Edit3,
  Sliders,
} from "lucide-react";
import Image from "next/image";

// Replace these imports with your actual images
import step1Image from "@/lib/how-it-works/setpone.jpg";
import step2Image from "@/lib/how-it-works/two.jpg";
import step3Image from "@/lib/how-it-works/three.jpg";
import step4Image from "@/lib/how-it-works/four.jpg";
import step5Image from "@/lib/how-it-works/five.jpg";
import step6Image from "@/lib/how-it-works/six.jpg";

export default function HowItWorksPage() {
  const steps = [
    {
      icon: <Wand2 className="w-6 h-6" />,
      title: "Start with AI or From Scratch",
      description:
        "Either enter your topic/prompt for AI generation or begin with a blank canvas",
      color: "from-purple-500 to-indigo-500",
      animation: { scale: [1, 1.05, 1] },
      image: step1Image,
      alt: "Vivid AI prompt input screen",
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "AI Generates Layouts",
      description:
        "Our AI creates multiple presentation layouts based on your prompt in seconds",
      color: "from-blue-500 to-cyan-500",
      animation: { y: [0, -5, 0] },
      image: step2Image,
      alt: "AI generated layout options",
    },
    {
      icon: <LayoutTemplate className="w-6 h-6" />,
      title: "Pick Your Theme",
      description:
        "Choose from beautifully designed templates that match your content",
      color: "from-amber-500 to-yellow-500",
      animation: { rotate: [0, 5, -5, 0] },
      image: step3Image,
      alt: "Theme selection interface",
    },
    {
      icon: <Edit3 className="w-6 h-6" />,
      title: "Edit Your Slides",
      description:
        "Customize text, rearrange slides, and perfect your presentation flow",
      color: "from-emerald-500 to-teal-500",
      animation: { x: [0, 5, 0] },
      image: step4Image,
      alt: "Slide editing interface",
    },
    {
      icon: <ImageIcon className="w-6 h-6" />,
      title: "Add Visual Elements",
      description:
        "Drag & drop images, charts, and media to enhance your slides",
      color: "from-fuchsia-500 to-purple-500",
      animation: { scale: [1, 1.1, 1] },
      image: step5Image,
      alt: "Media insertion interface",
    },
    {
      icon: <Sliders className="w-6 h-6" />,
      title: "Fine-tune & Present",
      description:
        "Adjust transitions, animations, and export in multiple formats",
      color: "from-rose-500 to-pink-500",
      animation: { y: [0, 5, 0] },
      image: step6Image,
      alt: "Presentation settings and export options",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-white mb-4 text-center"
      >
        How{" "}
        <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Vivid Works
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-xl text-gray-300 mb-12 text-center max-w-3xl mx-auto"
      >
        Create stunning presentations in minutes with our AI-powered workflow
      </motion.p>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-1/2 h-full w-1 bg-gradient-to-b from-purple-500 to-pink-500 hidden lg:block"></div>

        <div className="space-y-12 lg:space-y-0">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative group lg:flex lg:items-center lg:justify-between lg:odd:flex-row-reverse ${
                index !== steps.length - 1 ? "mb-24 lg:mb-12" : ""
              }`}
            >
              {/* Step content */}
              <div className="lg:w-5/12 mb-6 lg:mb-0">
                <motion.div
                  animate={step.animation}
                  transition={{ duration: 2, repeat: Infinity }}
                  className={`w-14 h-14 rounded-2xl mb-4 flex items-center justify-center bg-gradient-to-br ${step.color} text-white mx-auto lg:mx-0`}
                >
                  {step.icon}
                </motion.div>
                <h3 className="text-2xl font-semibold text-white mb-2 text-center lg:text-left">
                  {step.title}
                </h3>
                <p className="text-gray-300 text-center lg:text-left">
                  {step.description}
                </p>
              </div>

              {/* Step number (mobile) */}
              <div className="lg:hidden absolute -left-2 top-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                {index + 1}
              </div>

              {/* Step number (desktop) */}
              <div className="hidden lg:flex w-12 h-12 rounded-full bg-gray-900 border-2 border-purple-500 absolute left-1/2 transform -translate-x-1/2 items-center justify-center text-white font-bold z-10">
                {index + 1}
              </div>

              {/* Image preview */}
              <div
                className={`lg:w-5/12 rounded-xl overflow-hidden border border-gray-700 transition-all duration-300 group-hover:border-purple-500 ${
                  index % 2 === 0 ? "lg:mr-8" : "lg:ml-8"
                }`}
              >
                <div className="aspect-video relative">
                  <Image
                    src={step.image}
                    alt={step.alt}
                    fill
                    className="object-cover"
                    placeholder="blur" // Remove if you don't want blur placeholders
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <button className="text-white bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded-md text-sm transition-colors">
                      View Example
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        viewport={{ once: true }}
        className="mt-20 text-center"
      >
        <button className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300">
          Start Creating Now
        </button>
      </motion.div>
    </div>
  );
}
