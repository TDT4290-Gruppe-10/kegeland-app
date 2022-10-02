import AsyncStorage from '@react-native-async-storage/async-storage';
import {reduce} from 'lodash';

import {Token} from '~constants/auth';
import {AuthTokens} from '~state/ducks/auth/auth.interface';

export const storeTokens = async ({
  accessToken,
  idToken,
  refreshToken,
}: AuthTokens) => {
  await AsyncStorage.multiSet(
    [
      ['@access_token', accessToken],
      ['@id_token', idToken],
      ['@refresh_token', refreshToken],
    ],
    (err) => {
      if (err) {
        throw new Error('Failed to set tokens');
      }
    },
  );
};

export const retrieveTokens = async () => {
  let values = null;
  values = await AsyncStorage.multiGet(Object.values(Token), (err) => {
    if (err) {
      throw new Error('Failed to retrieve tokens');
    }
  }).then((res) =>
    reduce(
      res,
      (prev, curr) => {
        const [key, val] = curr;
        if (val) {
          prev[key as Token] = val;
        }
        return prev;
      },
      {} as Record<Token, string>,
    ),
  );
  return values;
};

export const removeTokens = async () => {
  await AsyncStorage.multiRemove(Object.values(Token), (err) => {
    if (err) {
      throw new Error('Failed to remove tokens');
    }
  });
};
