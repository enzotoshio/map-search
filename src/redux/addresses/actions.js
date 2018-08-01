import { normalize } from "normalizr";

import { SEARCH_BY_CEP_SUCCEEDED, SEARCH_BY_CEP_REQUESTED } from "./types";
import { address } from "./schema";
import { get } from "../../services/api";

export function search(term) {
  return async dispatch => {
    dispatch(searchRequested(term));

    const address = await get(
      `${process.env.REACT_APP_CEP_API_URL}/${term}/json`
    );
    const { results } = await get(
      `${process.env.REACT_APP_MAPS_API_URL}${term},%20Brazil`
    );
    const {
      geometry: { location }
    } = results[0];

    dispatch(searchSucceeded({ ...address, ...location }));
  };
}

function searchSucceeded(payload) {
  const normalizedPayload = normalize(payload, address);

  return { type: SEARCH_BY_CEP_SUCCEEDED, payload: normalizedPayload };
}

function searchRequested(term) {
  return {
    type: SEARCH_BY_CEP_REQUESTED,
    payload: { term }
  };
}

export default {
  search
};
