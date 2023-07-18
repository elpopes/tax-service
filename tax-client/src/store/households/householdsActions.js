export const RECEIVE_HOUSEHOLDS = "households/RECEIVE_HOUSEHOLDS";
export const receiveHouseholds = (households) => ({
  type: RECEIVE_HOUSEHOLDS,
  households,
});

export const RECEIVE_HOUSEHOLD = "households/RECEIVE_HOUSEHOLD";
export const receiveHousehold = (household) => ({
  type: RECEIVE_HOUSEHOLD,
  household,
});

export const REMOVE_HOUSEHOLD = "households/REMOVE_HOUSEHOLD";
export const removeHousehold = (householdId) => ({
  type: REMOVE_HOUSEHOLD,
  householdId,
});
