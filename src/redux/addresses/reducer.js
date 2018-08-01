import { combineReducers } from 'redux';
import {
  SEARCH_BY_CEP_REQUESTED,
  SEARCH_BY_CEP_SUCCEEDED,
  SEARCH_BY_CEP_FAILED
} from './types';

const byIdInitialState = null;

export function byCEP(state = byIdInitialState, action) {
  switch (action.type) {
    case SEARCH_BY_CEP_SUCCEEDED: {
      const { address } = action.payload.entities;

      return { ...state, ...address };
    }

    default:
      return state;
  }
}

const allIdsInitialState = [];

export function allIds(state = allIdsInitialState, action) {
  switch (action.type) {
    case SEARCH_BY_CEP_SUCCEEDED: {
      const ids = action.payload.result;

      return [...ids];
    }

    default:
      return state;
  }
}

export const requestInitialState = { isFetching: false, succeeded: false };

export function request(state = requestInitialState, action) {
  switch (action.type) {
    case SEARCH_BY_CEP_REQUESTED:
      return { isFetching: true, succeeded: false };
    case SEARCH_BY_CEP_SUCCEEDED:
      return { isFetching: false, succeeded: true };
    case SEARCH_BY_CEP_FAILED:
      return { isFetching: false, succeeded: false };
    default:
      return state;
  }
}

const searchReducer = combineReducers({ byCEP, allIds, request });

export default searchReducer;
