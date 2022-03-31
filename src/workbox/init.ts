export let initTimestamp = Date.now();
export let calledChachesInThisInit: Record<string, boolean> = {};

export const resetVariables = () => {
  initTimestamp = Date.now();
  calledChachesInThisInit = {};
};
