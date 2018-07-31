import _ from "lodash";
import deepMapKeys from "deep-map-keys";

function mountError({ response, data }) {
  const errorMessage = `${response.status} - 
        ${data.error_description}`;

  return Promise.reject(new Error(errorMessage));
}

function formatRequestPayload(payload) {
  return deepMapKeys(payload, _.snakeCase);
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

function mountUrl(route, query = "") {
  return `${process.env.REACT_APP_API_URL}${route}?${query}`;
}

export async function get({ route, query }) {
  const url = mountUrl(route, query);

  const response = await fetch(url, {
    method: "GET"
  });

  return handleResponse(response);
}

export default Object.freeze({
  get
});
