import React from "react";

export const useOutsideClick = <T extends HTMLElement>(callback: (event: React.MouseEvent<T>) => void) => {
  const ref = React.useRef<T | null>(null);
  React.useEffect(() => {
    const handleClick = (event: any) => {
      if (ref.current && !ref.current.contains(event.target  as Node)) {
        callback(event);
      }
    };

    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [ref, callback]);

  return ref;
};
