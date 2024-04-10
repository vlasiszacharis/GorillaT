import { useState, useEffect } from "react";

export const useCalculateScreen = () => {
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkIfTablet = () => {
      const width = window.innerWidth;
      setIsTablet(width >= 700 && width <= 1000);
    };

    window.addEventListener("resize", checkIfTablet);
    // Check immediately on mount
    checkIfTablet();

    return () => window.removeEventListener("resize", checkIfTablet);
  }, []);

  return isTablet;
};
