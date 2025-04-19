"use client";

import { motion } from "framer-motion";
import {
  Presentation,
  Sparkles,
  LayoutTemplate,
  Image,
  Sliders,
  Download,
} from "lucide-react";

const templateExamples = [
  {
    title: "Startup Pitch Deck",
    category: "Business",
    description:
      "Perfect for founders seeking investment with clean, modern slides",
    preview: "/previews/pitch-deck.jpg", // Replace with actual paths
    colors: ["from-blue-500 to-cyan-500", "bg-blue-500"],
    pages: 12,
  },
  {
    title: "Academic Research",
    category: "Education",
    description:
      "Professional layout for thesis defenses and research presentations",
    preview: "/previews/academic.jpg",
    colors: ["from-emerald-500 to-teal-500", "bg-emerald-500"],
    pages: 18,
  },
  {
    title: "Marketing Report",
    category: "Marketing",
    description: "Data-heavy presentations with beautiful chart integrations",
    preview: "/previews/marketing.jpg",
    colors: ["from-fuchsia-500 to-purple-500", "bg-fuchsia-500"],
    pages: 15,
  },
  {
    title: "Creative Portfolio",
    category: "Design",
    description: "Showcase your work with visually stunning slides",
    preview: "/previews/portfolio.jpg",
    colors: ["from-amber-500 to-yellow-500", "bg-amber-500"],
    pages: 10,
  },
];

export default function ExamplesPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold text-white mb-4">
          See What{" "}
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Vivid Can Do
          </span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Explore these examples created with Vivid's AI or browse our template
          gallery
        </p>
      </motion.div>

      {/* Interactive Demo */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mb-20"
      >
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-1 shadow-xl">
          <div className="bg-gray-900 rounded-xl p-8">
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              <div className="lg:w-1/2">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="text-purple-400" />
                  <span className="font-medium text-purple-400">
                    AI Generator Demo
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Try It Yourself
                </h2>
                <p className="text-gray-300 mb-6">
                  Enter any topic and see how Vivid transforms it into a
                  presentation:
                </p>

                <div className="flex gap-2 mb-6">
                  <input
                    type="text"
                    placeholder="e.g. 'Blockchain Technology Overview'"
                    className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all">
                    Generate
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button className="px-4 py-2 rounded-full bg-gray-800 text-gray-300 text-sm hover:bg-gray-700 transition-colors">
                    Startup Pitch
                  </button>
                  <button className="px-4 py-2 rounded-full bg-gray-800 text-gray-300 text-sm hover:bg-gray-700 transition-colors">
                    Sales Report
                  </button>
                  <button className="px-4 py-2 rounded-full bg-gray-800 text-gray-300 text-sm hover:bg-gray-700 transition-colors">
                    Product Launch
                  </button>
                </div>
              </div>

              <div className="lg:w-1/2 relative">
                <div className="aspect-video bg-gray-800/50 rounded-lg border border-gray-700 flex items-center justify-center">
                  <div className="text-center p-6">
                    <Presentation className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">
                      AI-generated preview will appear here
                    </p>
                    <p className="text-gray-500 text-sm mt-2">
                      Try entering a topic above
                    </p>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                  Live Demo
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Template Gallery */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">Popular Templates</h2>
          <button className="text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors">
            Browse all templates <span>→</span>
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {templateExamples.map((template, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-xl bg-gray-900/80 hover:bg-gray-900 transition-all duration-300 border border-gray-800 hover:border-gray-700"
            >
              <div className="relative aspect-video bg-gray-800 overflow-hidden">
                <div
                  className={`absolute inset-0 ${template.colors[0]} opacity-10`}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Presentation className="w-16 h-16 text-gray-600" />
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${template.colors[1]} text-white`}
                  >
                    {template.category}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {template.pages} slides
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">
                  {template.title}
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  {template.description}
                </p>

                <div className="flex justify-between items-center">
                  <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                    Preview →
                  </button>
                  <button className="text-sm px-3 py-1 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
                    Use Template
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="mt-20 text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-4">
          Ready to Create Your Masterpiece?
        </h2>
        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
          Join thousands of professionals who use Vivid to create stunning
          presentations in minutes
        </p>
        <button className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 text-lg">
          Start Free Trial
        </button>
      </motion.div>
    </div>
  );
}
