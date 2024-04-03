import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NavigationHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleNavigateTo = (event: CustomEvent) => {
      navigate(event.detail);
    };

    // Listen for custom navigation events
    window.addEventListener("navigateTo", handleNavigateTo as EventListener);

    // Cleanup
    return () => {
      window.removeEventListener(
        "navigateTo",
        handleNavigateTo as EventListener
      );
    };
  }, [navigate]);

  return null; // This component does not render anything
}

export default NavigationHandler;
