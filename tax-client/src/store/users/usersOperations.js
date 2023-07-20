import { receiveUser, receiveUsers, removeUser } from "./usersActions";
import config from "../../config";

export const fetchUsers = () => async (dispatch) => {
  const res = await fetch(`${config.API_BASE_URL}/users`);
  if (res.ok) {
    const users = await res.json();
    dispatch(receiveUsers(users));
  }
};

export const fetchUser = (userId) => async (dispatch) => {
  const res = await fetch(`${config.API_BASE_URL}/users/${userId}`);
  if (res.ok) {
    const user = await res.json();
    dispatch(receiveUser(user));
  }
};

export const createUser = (user) => (dispatch) => {
  return fetch(`${config.API_BASE_URL}/users`, {
    method: "POST",
    body: JSON.stringify({ user: user }),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => {
      if (!res.ok) {
        return res.json().then((json) => {
          if (json.errors) {
            const error = json.errors.join(", ");
            throw new Error(error);
          }
          throw new Error(res.statusText);
        });
      }
      return res.json();
    })
    .then((user) => dispatch(receiveUser(user)))
    .catch((error) => console.log(error));
};

export const updateUser = (user) => (dispatch) => {
  return fetch(`${config.API_BASE_URL}/users/${user.id}`, {
    method: "PATCH",
    body: JSON.stringify(user),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((user) => dispatch(receiveUser(user)));
};

export const deleteUser = (userId) => (dispatch) => {
  return fetch(`${config.API_BASE_URL}/users/${userId}`, {
    method: "DELETE",
  }).then(() => dispatch(removeUser(userId)));
};
