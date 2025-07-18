import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue = '') {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? item : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, value);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    function syncStorage(event) {
      if (event.key === key) {
        setStoredValue(event.newValue || '');
      }
    }
    window.addEventListener('storage', syncStorage);
    return () => window.removeEventListener('storage', syncStorage);
  }, [key]);

  return [storedValue, setValue];
}

export default useLocalStorage;
