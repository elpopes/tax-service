export const selectResidenceForClient = (state, clientId) =>
  state.residences.byClientId[clientId] || null;

export const selectResidencesError = (state) => state.residences.error;

export const selectResidencesLoading = (state) => state.residences.loading;
