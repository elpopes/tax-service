import { createSelector } from "reselect";

export const getUsers = (state) => {
  if (!state.users) return [];
  return Object.values(state.users);
};

export const getUser = createSelector(
  (state, userId) => state.users[userId],
  (user) => user
);
