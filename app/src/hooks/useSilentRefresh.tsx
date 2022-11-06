import {useEffect, useState} from 'react';

import {REFRESH_INTERVAL_MS} from '~constants/auth';
import {silentRefresh} from '~state/ducks/auth/auth.actions';

import useAppDispatch from './useAppDispatch';
import useAppSelector from './useAppSelector';

const useSilentRefresh = () => {
  const dispatch = useAppDispatch();
  const {isSignedIn} = useAppSelector((state) => state.auth);
  const [timer, setTimer] = useState<NodeJS.Timer | null>(null);
  useEffect(() => {
    if (isSignedIn) {
      dispatch(silentRefresh());
    }
  }, []);

  useEffect(() => {
    if (isSignedIn) {
      const interval = setInterval(() => {
        dispatch(silentRefresh());
      }, REFRESH_INTERVAL_MS);
      setTimer(interval);
    } else {
      if (timer) {
        clearInterval(timer);
        setTimer(null);
      }
    }
    return () => {
      if (timer) {
        clearInterval(timer);
        setTimer(null);
      }
    };
  }, [isSignedIn]);

  return true;
};

export default useSilentRefresh;
