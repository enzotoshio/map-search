export const getAnimes = state =>
  state.animes.allIds.map(id => state.animes.byId[id]);
export const getIsFetching = state => state.animes.request.isFetching;

export default { getAnimes, getIsFetching };
