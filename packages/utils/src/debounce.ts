export const debounce = (func: (...args: any) => void, wait = 500) => {
  let timeout: ReturnType<typeof setTimeout>;

  const debounced = function (this: any, ...args: any) {
    const later = () => {
      func.apply(this, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };

  debounced.clear = () => {
    clearTimeout(timeout);
  };

  return debounced;
};
