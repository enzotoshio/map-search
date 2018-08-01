import { normalize } from 'normalizr';

import {
  SEARCH_BY_CEP_SUCCEEDED,
  SEARCH_BY_CEP_REQUESTED,
  SEARCH_BY_CEP_FAILED
} from './types';
import { address as addressSchema } from './schema';
import { get, getJsonP } from '../../services/api';

function searchRequested() {
  return {
    type: SEARCH_BY_CEP_REQUESTED
  };
}

function searchFailed(errorMessage) {
  return {
    type: SEARCH_BY_CEP_FAILED,
    payload: { errorMessage }
  };
}

function searchSucceeded(payload) {
  const normalizedPayload = normalize(payload, addressSchema);

  return { type: SEARCH_BY_CEP_SUCCEEDED, payload: normalizedPayload };
}

export function search(term) {
  return async dispatch => {
    dispatch(searchRequested(term));

    const address = await getJsonP(
      `${process.env.REACT_APP_CEP_API_URL}/${term}/json`
    );

    if (address.erro) {
      dispatch(searchFailed('CEP não encontrado'));
      return;
    }

    const { results } = await get(
      `${process.env.REACT_APP_MAPS_API_URL}${term},%20Brazil`
    );
    const {
      geometry: { location }
    } = results[0];

    dispatch(searchSucceeded({ ...address, ...location }));
  };
}

export default {
  search
};
