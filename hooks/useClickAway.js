import { useEffect } from "react";

export default function useClickAway(ref, callback) {
  useEffect(() => {
    const handleClick = (e) => {
      const currentRef = ref.current;

      if (e && currentRef && !currentRef.contains(e.target)) callback(e);
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [ref, callback]);
}
