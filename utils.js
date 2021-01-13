import React from "react";

export const clone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

// inspired by: https://usehooks.com/useLocalStorage/
export function useLocalStorage(key, initialValue) {
  const [storage, setStorage] = React.useState(() => {
    const item = window.localStorage.getItem(key);
    if (!item) {
      return initialValue;
    }
    return JSON.parse(item);
  });

  const setValue = (value) => {
    setStorage(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  return [storage, setValue];
}