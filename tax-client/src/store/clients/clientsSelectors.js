export const selectClientById = (state, clientId) =>
  state.clients.byId[clientId];
export const selectClientErrors = (state) => state.clients.errors;
