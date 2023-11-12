export const selectClientById = (state, clientId) =>
  state.clients.byId[clientId];
export const selectClientByUserId = (state, userId) => {
  console.log("All clients:", state.clients.byId);
  console.log("Current userId:", userId);

  // Search for the client whose user_id matches the given userId
  const client = Object.values(state.clients.byId).find(
    (client) => client.user_id === userId
  );

  console.log("Selected client:", client);
  return client || null;
};

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
