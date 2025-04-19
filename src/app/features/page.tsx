"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  FileEdit,
  Trash2,
  Moon,
  Sun,
  Clock,
  Move,
} from "lucide-react";

export default function FeaturesPage() {
  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "AI Presentation Creation",
      description:
        "Generate complete presentations instantly with AI. Just provide a prompt and get professional slides in seconds.",
      color: "from-purple-500 to-indigo-500",
    },
    {
      icon: <FileEdit className="w-6 h-6" />,
      title: "From Scratch or Templates",
      description:
        "Start with a blank canvas or choose from beautiful templates. Full customization for every element.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Trash2 className="w-6 h-6" />,
      title: "Smart Trash System",
      description:
        "Deleted items go to trash for 30 days. Restore or permanently delete anytime.",
      color: "from-rose-500 to-pink-500",
    },
    {
      icon: <Moon className="w-6 h-6" />,
      title: "Dark/Light Theme",
      description:
        "Beautiful themes with system detection. Easy toggle for comfortable viewing.",
      color: "from-amber-500 to-yellow-500",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Recently Opened",
      description:
        "Quick access to recent projects with visual previews. Continue where you left off.",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: <Move className="w-6 h-6" />,
      title: "Drag & Drop Editor",
      description:
        "Intuitive slide reordering with smooth animations. Add images and content easily.",
      color: "from-fuchsia-500 to-purple-500",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-white mb-8 text-center"
      >
        Vivid{" "}
        <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Features
        </span>
      </motion.h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="group relative overflow-hidden rounded-xl bg-gradient-to-br p-[2px] hover:shadow-lg transition-all duration-300"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
            />
            <div className="relative h-full bg-gray-900/80 rounded-[10px] p-6 flex flex-col backdrop-blur-sm group-hover:bg-gray-900/90 transition-all duration-300">
              <div
                className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center bg-gradient-to-br ${feature.color} text-white`}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-300 group-hover:text-gray-100 transition-colors duration-300">
                {feature.description}
              </p>
              <div className="mt-4 pt-4 border-t border-gray-800 group-hover:border-gray-700 transition-colors duration-300">
                <button className="text-sm font-medium text-gray-400 hover:text-white transition-colors duration-300">
                  Learn more →
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
