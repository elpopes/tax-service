export const selectResidenceForClient = (state, clientId) =>
  state.residences.byClientId[clientId] || null;

export const selectResidenceById = (state, clientId, residenceId) => {
  const residencesForClient = selectResidenceForClient(state, clientId);
  return (
    residencesForClient?.find((residence) => residence.id === residenceId) ||
    null
  );
};

export const selectResidencesError = (state) => state.residences.error;

export const selectResidencesLoading = (state) => state.residences.loading;
