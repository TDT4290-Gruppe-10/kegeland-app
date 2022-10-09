import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';

import useAppDispatch from '~hooks/useAppDispatch';
import useAppSelector from '~hooks/useAppSelector';
import {setAnchorRoute} from '~state/ducks/app/app.reducer';

const withAuthPortal =
  <P extends object>(Component: React.FC<P>): React.FC<P> =>
  (props) => {
    const navigation = useNavigation();
    const dispatch = useAppDispatch();
    const {anchorRoute} = useAppSelector((state) => state.app);
    const {isSignedIn} = useAppSelector((state) => state.auth);

    const goBack = () => {
      if (anchorRoute) {
        navigation.navigate(anchorRoute);
        dispatch(setAnchorRoute(undefined));
      } else {
        navigation.goBack();
      }
    };

    useFocusEffect(
      useCallback(() => {
        if (isSignedIn) {
          goBack();
        }
      }, [isSignedIn]),
    );

    return <Component {...props} />;
  };

export default withAuthPortal;
