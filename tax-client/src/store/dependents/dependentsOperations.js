import {
  receiveDependent,
  receiveDependents,
  removeDependent,
} from "./dependentsActions";

export const fetchDependents = () => async (dispatch) => {
  const res = await fetch("api/dependents");
  if (res.ok) {
    const dependents = await res.json();
    dispatch(receiveDependents(dependents));
  }
};

export const fetchDependent = (dependentId) => async (dispatch) => {
  const res = await fetch(`api/dependents/${dependentId}`);
  if (res.ok) {
    const dependent = await res.json();
    dispatch(receiveDependent(dependent));
  }
};

export const createDependent = (dependent) => (dispatch) => {
  return fetch("/api/dependents", {
    method: "POST",
    body: JSON.stringify(dependent),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((dependent) => dispatch(receiveDependent(dependent)));
};

export const updateDependent = (dependent) => (dispatch) => {
  return fetch(`/api/dependents/${dependent.id}`, {
    method: "PATCH",
    body: JSON.stringify(dependent),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((dependent) => dispatch(receiveDependent(dependent)));
};

export const deleteDependent = (dependentId) => (dispatch) => {
  return fetch(`/api/dependents/${dependentId}`, {
    method: "DELETE",
  }).then(() => dispatch(removeDependent(dependentId)));
};
