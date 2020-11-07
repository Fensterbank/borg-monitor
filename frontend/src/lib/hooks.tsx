import { useEffect, useState } from 'react';

import { isClient } from '.';

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export const useConfirmationParameter = () => {
  const search = isClient() ? window.location.search : undefined;
  if (search) return search.split('?c=')[1];
  return null;
};

export const useConfirmed = () => {
  const search = isClient() ? window.location.search : undefined;
  return search === '?bestaetigt';
};
