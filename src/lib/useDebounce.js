import { useState, useEffect } from "react";

/**
 * useDebounce — returns a debounced copy of the value (ms).
 * Used for search-as-you-type without firing filters on every keystroke.
 */
export function useDebounce(v, ms) {
  const [d, setD] = useState(v);
  useEffect(() => {
    const i = setTimeout(() => setD(v), ms);
    return () => clearTimeout(i);
  }, [v, ms]);
  return d;
}
