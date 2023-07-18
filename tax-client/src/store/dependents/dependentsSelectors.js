export const getDependents = (state) => {
  if (!state.dependents) return [];
  return Object.values(state.dependents);
};

export const getDependent = (dependentId) => (state) => {
  if (!state.dependents) return null;
  return state.dependents[dependentId];
};
