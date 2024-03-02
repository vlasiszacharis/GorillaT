import React from "react";
import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1 }}
        style={{
          width: 50,
          height: 50,
          borderRadius: "50%",
          border: "5px solid #e9e9e9",
          borderTopColor: "#3498db",
        }}
      />
    </div>
  );
};

export default LoadingSpinner;
