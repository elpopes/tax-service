import { receiveUser, receiveUsers, removeUser } from "./usersActions";

export const fetchUsers = () => async (dispatch) => {
  const res = await fetch("api/users");
  if (res.ok) {
    const users = await res.json();
    dispatch(receiveUsers(users));
  }
};

export const fetchUser = (userId) => async (dispatch) => {
  const res = await fetch(`api/users/${userId}`);
  if (res.ok) {
    const user = await res.json();
    dispatch(receiveUser(user));
  }
};

export const createUser = (user) => (dispatch) => {
  return fetch("/api/users", {
    method: "POST",
    body: JSON.stringify(user),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((user) => dispatch(receiveUser(user)));
};

export const updateUser = (user) => (dispatch) => {
  return fetch(`/api/users/${user.id}`, {
    method: "PATCH",
    body: JSON.stringify(user),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((user) => dispatch(receiveUser(user)));
};

export const deleteUser = (userId) => (dispatch) => {
  return fetch(`/api/users/${userId}`, {
    method: "DELETE",
  }).then(() => dispatch(removeUser(userId)));
};
