import { normalize } from "normalizr";

import { SEARCH_SUCCEEDED, SEARCH_REQUESTED } from "./types";
import { arrayOfAnimes } from "./schema";
import { get } from "../../services/api";

export function search(term) {
  return dispatch => {
    dispatch(searchRequested(term));

    return get({ route: `/search/manga/${term}` }).then(response =>
      dispatch(searchSucceeded(response.result))
    );
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
