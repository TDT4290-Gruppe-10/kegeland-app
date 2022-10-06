import {every, values} from 'lodash';

import {Token} from '~constants/auth';

export const allTokensExist = (tokens: Record<Token, string>): boolean => {
  const tokenKeys = values(Token);
  return every(
    Object.entries(tokens),
    ([key, val]) => tokenKeys.includes(key as Token) && val !== null,
  );
};

export const clearSignedInState = () => {
  return {
    isSignedIn: false,
    authUser: undefined,
    userDetails: undefined,
  };
};
