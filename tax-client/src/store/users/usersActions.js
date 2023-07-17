export const RECEIVE_USERS = "users/RECEIVE_USERS";
export const RECEIVE_USER = "users/RECEIVE_USER";
export const REMOVE_USER = "users/REMOVE_USER";

export const receiveUsers = (users) => ({
  type: RECEIVE_USERS,
  users,
});

export const receiveUser = (user) => ({
  type: RECEIVE_USER,
  user,
});

export const removeUser = (userId) => ({
  type: REMOVE_USER,
  userId,
});
