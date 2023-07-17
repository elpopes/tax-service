export const getUsers = (state) => {
  if (!state.users) return [];
  return Object.values(state.users);
};

export const getUser = (userId) => (state) => {
  if (!state.users) return null;
  return state.users[userId];
};
