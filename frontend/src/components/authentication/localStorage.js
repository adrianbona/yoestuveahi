const setItem = (key, value) => {
  return localStorage.setItem(key, value);
};

const removeItem = key => {
  return localStorage.removeItem(key);
};

const getItem = key => {
  return localStorage.getItem(key);
};

export default { getItem, removeItem, setItem };
