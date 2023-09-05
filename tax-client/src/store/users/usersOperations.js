import {
  receiveUser,
  receiveUsers,
  removeUser,
  registrationError,
} from "./usersActions";
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

export const createUser = (user) => async (dispatch) => {
  try {
    const response = await fetch(`${config.API_BASE_URL}/users`, {
      method: "POST",
      body: JSON.stringify({ user: user }),
      headers: { "Content-Type": "application/json" },
    });

    const json = await response.json();

    if (!response.ok) {
      const errorMessage = json.errors
        ? json.errors.join(", ")
        : "Registration failed";
      dispatch(registrationError(errorMessage));
      throw new Error(errorMessage);
    } else {
      dispatch(receiveUser(json.user));
      // Close modal and redirect to dashboard
    }
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
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

export const fetchUserProfile = () => async (dispatch, getState) => {
  const token = getState().sessions.token;

  const res = await fetch(`${config.API_BASE_URL}/users/profile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    const profile = await res.json();
    dispatch(receiveUser(profile));
  }
};
