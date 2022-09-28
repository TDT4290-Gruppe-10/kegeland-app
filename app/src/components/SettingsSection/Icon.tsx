import React from 'react';
import {StyleSheet} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const Icon: React.FC<{color: string; icon: string}> = (props) => {
  return (
    <MaterialIcon
      color={props.color}
      size={20}
      name={props.icon}
      style={styles.icon}
    />
  );
};

const styles = StyleSheet.create({
  icon: {alignSelf: 'center'},
});

export default Icon;
