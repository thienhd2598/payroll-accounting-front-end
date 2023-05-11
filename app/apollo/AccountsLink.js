import { setContext } from '@apollo/client/link/context';

export const accountHeaders = async (prevHeaders = {}) => {
  let jwt_authorities = localStorage.getItem('jwt_authorities');
  console.log({
    headers: {
      ...prevHeaders,
      ...(!!jwt_authorities
        ? { authorization: `Bearer ${jwt_authorities}` }
        : {}),
    }
  })
  return {
    headers: {
      ...prevHeaders,
      ...(!!jwt_authorities
        ? { authorization: `Bearer ${jwt_authorities}` }
        : {}),
    },
  };
};

export const asyncAuthLink = setContext(
  async (_, { headers }) => await accountHeaders(headers),
);
