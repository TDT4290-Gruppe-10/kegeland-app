import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import {Text} from 'react-native-paper';

import useAppSelector from '~hooks/useAppSelector';

const HomeScreen: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const {auth} = useAppSelector((state) => state);
  useEffect(() => {
    setData(auth);
  }, [auth]);
  return (
    <SafeAreaView>
      <Text style={{color: 'black'}}>{JSON.stringify(data, undefined, 2)}</Text>
    </SafeAreaView>
  );
};

export default HomeScreen;
