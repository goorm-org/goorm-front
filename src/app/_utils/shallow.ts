export const shallowPush = (path: string) => {
  window.history.pushState(null, "", path);
};

export const shallowReplace = (path: string) => {
  window.history.replaceState(null, "", path);
};

export const shallowBack = () => {
  window.history.back();
};
