export const RECEIVE_DEPENDENTS = "dependents/RECEIVE_DEPENDENTS";
export const receiveDependents = (dependents) => ({
  type: RECEIVE_DEPENDENTS,
  dependents,
});

export const RECEIVE_DEPENDENT = "dependents/RECEIVE_DEPENDENT";
export const receiveDependent = (dependent) => ({
  type: RECEIVE_DEPENDENT,
  dependent,
});

export const REMOVE_DEPENDENT = "dependents/REMOVE_DEPENDENT";
export const removeDependent = (dependentId) => ({
  type: REMOVE_DEPENDENT,
  dependentId,
});
