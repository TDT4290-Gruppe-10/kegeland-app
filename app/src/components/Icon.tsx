import React from 'react';
import {StyleProp, StyleSheet, TextStyle} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

type IconProps = {
  color?: string;
  icon: string;
  size?: number;
  style?: StyleProp<TextStyle>;
};

const Icon: React.FC<IconProps> = (props) => {
  return (
    <MaterialIcon
      color={props.color}
      size={props.size || 20}
      name={props.icon}
      style={[styles.icon, props.style]}
    />
  );
};

const styles = StyleSheet.create({
  icon: {alignSelf: 'center'},
});

export default Icon;
