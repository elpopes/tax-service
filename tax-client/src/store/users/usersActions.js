export const RECEIVE_USERS = "users/RECEIVE_USERS";
export const RECEIVE_USER = "users/RECEIVE_USER";
export const REMOVE_USER = "users/REMOVE_USER";
export const RECEIVE_USER_PROFILE = "users/RECEIVE_USER_PROFILE";
export const REGISTRATION_ERROR = "REGISTRATION_ERROR";
export const CLEAR_REGISTRATION_ERROR = "CLEAR_REGISTRATION_ERROR";

export const clearRegistrationError = () => ({
  type: CLEAR_REGISTRATION_ERROR,
});

export const registrationError = (error) => ({
  type: REGISTRATION_ERROR,
  error,
});

export const receiveUserProfile = (profile) => ({
  type: RECEIVE_USER_PROFILE,
  profile,
});

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
