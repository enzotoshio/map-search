import _ from 'lodash';
import deepMapKeys from 'deep-map-keys';
import fetchJsonp from 'fetch-jsonp';

function mountError({ response, data }) {
  const errorMessage = `${response.status} - 
        ${data.error_description}`;

  return Promise.reject(new Error(errorMessage));
}

function formatResponsePayload(payload) {
  return deepMapKeys(payload, _.camelCase);
}

async function handleResponse(response) {
  const responseData = await response.json();

  if (response.ok) {
    return formatResponsePayload(responseData);
  }

  return mountError({ response, data: responseData });
}

export async function getJsonP(url) {
  const response = await fetchJsonp(url);

  return handleResponse(response);
}

export async function get(url) {
  const response = await fetch(url, { method: 'GET' });

  return handleResponse(response);
}

export default Object.freeze({
  getJsonP,
  get
});
