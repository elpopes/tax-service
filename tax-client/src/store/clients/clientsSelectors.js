export const selectClientById = (state, clientId) =>
  state.clients.byId[clientId];
export const selectClientErrors = (state) => state.clients.errors;
export const selectAllClients = (state) => Object.values(state.clients.byId);
export const selectCurrentClient = (state) => state.clients.currentClient;
export const selectClientStatus = (state) => state.clients.status;
export const selectSpouseByClientId = (state, clientId) => {
  const spouse = state.clients.byId[clientId]?.spouse || null;
  console.log(`Spouse for clientId ${clientId}:`, spouse);
  return spouse;
};
export const selectSpouseErrors = (state) => state.clients.spouseErrors;
