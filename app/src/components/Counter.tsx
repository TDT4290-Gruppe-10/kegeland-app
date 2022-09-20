import {Button, ButtonGroup, Text} from '@rneui/themed';
import React from 'react';
import {View} from 'react-native';

export type CounterProps = {
  value: number;
  increment: () => void;
  decrement: () => void;
};

const Counter: React.FC<CounterProps> = ({value, increment, decrement}) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      <Text style={{fontSize: 32}}>{value}</Text>
      <ButtonGroup
        buttons={[
          <Button title="decrement" type="clear" onPress={() => decrement()} />,
          <Button title="increment" type="clear" onPress={() => increment()} />,
        ]}
      />
    </View>
  );
};

export default Counter;
