import {
  receiveHousehold,
  receiveHouseholds,
  removeHousehold,
} from "./householdsActions";

export const fetchHouseholds = () => async (dispatch) => {
  const res = await fetch("api/households");
  if (res.ok) {
    const households = await res.json();
    dispatch(receiveHouseholds(households));
  }
};

export const fetchHousehold = (householdId) => async (dispatch) => {
  const res = await fetch(`api/households/${householdId}`);
  if (res.ok) {
    const household = await res.json();
    dispatch(receiveHousehold(household));
  }
};

export const createHousehold = (household) => (dispatch) => {
  return fetch("/api/households", {
    method: "POST",
    body: JSON.stringify(household),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((household) => dispatch(receiveHousehold(household)));
};

export const updateHousehold = (household) => (dispatch) => {
  return fetch(`/api/households/${household.id}`, {
    method: "PATCH",
    body: JSON.stringify(household),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((household) => dispatch(receiveHousehold(household)));
};

export const deleteHousehold = (householdId) => (dispatch) => {
  return fetch(`/api/households/${householdId}`, {
    method: "DELETE",
  }).then(() => dispatch(removeHousehold(householdId)));
};
