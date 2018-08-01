export const getAddressesByCEP = state => state.addresses.byCEP;
export const getIsFetching = state => state.addresses.request.isFetching;
export const getSucceeded = state => state.addresses.request.succeeded;

export default { getAddressesByCEP, getIsFetching };
