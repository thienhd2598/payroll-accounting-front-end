import { store } from 'app';
import { showAlert } from 'utils/helper';
import _ from 'lodash';
export class ResponseError extends Error {
  public response: Response;

  constructor(response: Response) {
    super(response.statusText);
    this.response = response;
  }
}
/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response: Response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */

const requestLogOut = _.throttle(
  () => {
    // Logout action
    showAlert.error('Token hết hạn, vui lòng đăng nhập lại')
  }, 3000, { 'trailing': false }
)

function checkStatus(response: Response, isLogoutRequest: boolean) {
  if ((response.status >= 200 && response.status < 500) || isLogoutRequest) {
    return response;
  }

  if (response.status == 401) {
    requestLogOut();
  }

  const error = new ResponseError(response);
  error.response = response;
  throw error;
}

const URL_API = {
  "CUSTOMER": process.env.URL_API_CUSTOMER,
  "PRODUCT": process.env.URL_API_PRODUCT,
  "BANKGATE": process.env.URL_API_BANKGATE,
  "ASSET": process.env.URL_API_ASSET,
  "P2P": process.env.URL_API_P2P,
  "NOTIFICATION": process.env.URL_API_NOTIFICATION
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default async function request(
  url: string,
  method?: string,
  access_token?: string | undefined,
  typeUrl: string = '',
  options?: any,
): Promise<{} | { err: ResponseError }> {
  const lastOptions = Object.assign({}, options, {
    method: method,
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(!!access_token ? { Authorization: `JWT ${access_token}`, } : {})
    },
  });    
  const fetchResponse = await fetch(`${URL_API[typeUrl]}/${url}`, lastOptions);
  const response = await checkStatus(fetchResponse, url.includes('/api/auth/logout'));

  return parseJSON(response);
}
