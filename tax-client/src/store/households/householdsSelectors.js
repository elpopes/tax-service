export const getHouseholds = (state) => {
  if (!state.households) return [];
  return Object.values(state.households);
};

export const getHousehold = (householdId) => (state) => {
  if (!state.households) return null;
  return state.households[householdId];
};
