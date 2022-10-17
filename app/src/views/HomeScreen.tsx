import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';

const HomeScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <Text>Halla</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {flex: 1, position: 'relative'},
});

export default HomeScreen;
