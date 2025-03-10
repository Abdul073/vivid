"use client";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import React, { useState } from "react";

type Props = {
  onAddcard: () => void;
};

const AddCardButton = ({ onAddcard }: Props) => {
  const [showGap, setShowGap] = useState(false);
  return (
    <motion.div
      className="w-full relative overflow-hidden"
      initial={{ height: "0.5rem" }}
      animate={{
        height: showGap ? "2rem" : "0.5rem",
        transition: { duration: 0.3, ease: "easeInOut" },
      }}
      onHoverStart={() => setShowGap(true)}
      onHoverEnd={() => setShowGap(false)}
    >
      <AnimatePresence>
        {showGap && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="flex items-center w-full max-w-md">
              <div className="w-[40%] h-[1px] bg-primary" />
              <Button
                variant="outline"
                size="sm"
                className="rounded-full h-8 w-8 p-0 mx-2 bg-primary hover:bg-primary/90 focus:ring-2 focus:ring-primary focus:ring-offset-2 shadow-sm"
                onClick={onAddcard}
                aria-label="Add new card"
              >
                <Plus className="h-4 w-4 text-black" />
              </Button>
              <div className="w-[40%] h-[1px] bg-primary" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AddCardButton;
