import { useEffect, useState } from "react";

const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    console.log(lastScrollY, "lastScrollY");

    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      if (Math.abs(currentScrollY - lastScrollY) < 5) return; // Avoid micro scroll
      console.log(currentScrollY, "currentScrollY");

      setScrollDirection(currentScrollY > lastScrollY ? "down" : "up");
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", updateScrollDirection);

    return () => window.removeEventListener("scroll", updateScrollDirection);
  }, []);

  return { scrollDirection, scrollY };
};

export default useScrollDirection;