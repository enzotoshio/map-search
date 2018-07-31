import { normalize } from "normalizr";

import { SEARCH_SUCCEEDED, SEARCH_REQUESTED } from "./types";
import { arrayOfAnimes } from "./schema";

export function search(term) {
  return dispatch => {
    dispatch(searchRequested(term));

    return fetch(`https://api.jikan.moe/search/manga/${term}`)
      .then(response => response.json())
      .then(json => dispatch(searchSucceeded(json)));
  };
}

function searchSucceeded(payload) {
  const normalizedPayload = normalize(payload, arrayOfAnimes);

  return {
    type: SEARCH_SUCCEEDED,
    payload: normalizedPayload
  };
}

function searchRequested(term) {
  return {
    type: SEARCH_REQUESTED,
    payload: { term }
  };
}

export default {
  search
};
