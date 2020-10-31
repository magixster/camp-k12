import 'whatwg-fetch';
import { merge } from 'lodash';
import { BASE_API_URL } from '../constants';

function getPathFromUrl(url) {
  return url.substring(0, url.indexOf('?') || url.length);
}

const POST_OPTIONS = {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-CSRFToken': window.__CSRF_TOKEN__,
  },
  credentials: 'same-origin',
};

const PUT_OPTIONS = {
  method: 'PUT',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-CSRFToken': window.__CSRF_TOKEN__,
  },
  credentials: 'same-origin',
};

const PATCH_OPTIONS = {
  method: 'PATCH',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-CSRFToken': window.__CSRF_TOKEN__,
  },
  credentials: 'same-origin',
};

const OPTIONS_OPTIONS = {
  method: 'OPTIONS',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  credentials: 'same-origin',
};

const DELETE_OPTIONS = {
  method: 'DELETE',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-CSRFToken': window.__CSRF_TOKEN__,
  },
  credentials: 'same-origin',
};

const GET_OPTIONS = {
  method: 'GET',
  credentials: 'same-origin',
};

function checkRequestStatus(response, url, method) {

  if (response.status === 401 || response.status === 403) {
    if (localStorage.getItem('token')) {
      // force logout to ensure clean cookies
      window.location = '/logout';
      return null;
    }
  }
  if (response.status >= 500) {
    const error = new Error(url);
    error.errorStatus = response.status;
    error.errorMessage = response.statusText;

    throw error;
  }

  // no content, json method will break if called so return empty string here
  if (response.status === 204) {
    return '';
  }

  const json = response.json();

  if (response.status >= 200 && response.status < 300) {
    return json;
  }

  return json.then((err) => {
    const error = new Error(`${response.statusText}:\n$`, err);
    error.body = err;
    error.errorStatus = response.status;
    error.errorMessage = response.statusText;

    throw error;
  });
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {Promise<object>}           The response data
 */
function request(url, method, options, errorHandler) {
  let newErrorHandler = errorHandler;
  if (newErrorHandler === undefined) {
    newErrorHandler = (result) => {
      throw result;
    };
  }
  let bakedOptions;
  const meth = typeof method === 'string' ? method : '';
  switch ((meth || '').toUpperCase()) {
    case 'PUT':
      bakedOptions = PUT_OPTIONS;
      break;
    case 'POST':
      bakedOptions = POST_OPTIONS;
      break;
    case 'PATCH':
      bakedOptions = PATCH_OPTIONS;
      break;
    case 'OPTIONS':
      bakedOptions = OPTIONS_OPTIONS;
      break;
    case 'DELETE':
      bakedOptions = DELETE_OPTIONS;
      break;
    default:
      bakedOptions = GET_OPTIONS;
  }

  let origin = window.location.origin;
  if (!origin) {
    const port = window.location.port ? `:${window.location.port}` : '';
    origin = `${window.location.protocol}//${window.location.hostname}${port}`;
  }

  return fetch(`${BASE_API_URL}/${url}`, merge({}, bakedOptions, options))
    .then((response) => checkRequestStatus(response, getPathFromUrl(url), meth))
    .catch(newErrorHandler);
}

/**
 * Throws error only if not a 404, could be modified to handle curried list of error codes to ignore
*/
export const throwIfNot404 = (e) => {
  if (e.errorStatus === 404) {
    return {};
  }
  throw e;
};

const REQUEST_CACHE = {};

export const fetchRequest = (
  url,
  { method, errorHandler, cacheOptions, ...options } = {}
) => {
  if (cacheOptions && cacheOptions.enabled) {
    const { cacheKey = url } = cacheOptions;
    const cachedResult = REQUEST_CACHE[cacheKey];
    if (cachedResult) {
      return Promise.resolve(cachedResult);
    }
    return request(url, method, options, errorHandler).then((result) => {
      REQUEST_CACHE[cacheKey] = result;
      return result;
    });
  }
  return request(url, method, options, errorHandler);
};

export default request;