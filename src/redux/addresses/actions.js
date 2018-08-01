import { normalize } from 'normalizr';

import {
  SEARCH_BY_CEP_SUCCEEDED,
  SEARCH_BY_CEP_REQUESTED,
  SEARCH_BY_CEP_FAILED
} from './types';
import { address as addressSchema } from './schema';
import { get, getJsonP } from '../../services/api';

export function searchByCEPRequested() {
  return {
    type: SEARCH_BY_CEP_REQUESTED
  };
}

export function searchByCEPFailed(errorMessage) {
  return {
    type: SEARCH_BY_CEP_FAILED,
    payload: { errorMessage }
  };
}

export function searchByCEPSucceeded(payload) {
  const normalizedPayload = normalize(payload, addressSchema);

  return { type: SEARCH_BY_CEP_SUCCEEDED, payload: normalizedPayload };
}

export function searchByCEP(term) {
  return async dispatch => {
    dispatch(searchByCEPRequested(term));

    const address = await getJsonP(
      `${process.env.REACT_APP_CEP_API_URL}/${term}/json`
    );

    if (address.erro) {
      dispatch(searchByCEPFailed('CEP não encontrado'));
      return;
    }

    const { results } = await get(
      `${process.env.REACT_APP_MAPS_API_URL}${term},%20Brazil`
    );
    const {
      geometry: { location }
    } = results[0];

    dispatch(searchByCEPSucceeded({ ...address, ...location }));
  };
}

export default {
  searchByCEP,
  searchByCEPRequested
};
