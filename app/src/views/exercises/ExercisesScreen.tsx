import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';

import {ExerciseScreenProps} from '~routes/interface';

const ExercisesScreen: React.FC<ExerciseScreenProps<'Exercises'>> = ({
  navigation,
}) => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <Button onPress={() => navigation.navigate('Femfit')}>Play femfit</Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {flex: 1, position: 'relative'},
});

export default ExercisesScreen;
