import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import ExercisesScreen from '~views/exercises/ExercisesScreen';
import FemfitScreen from '~views/exercises/FemfitScreen';

import {ExerciseStackParamList} from './interface';

const ExerciseStack = createStackNavigator<ExerciseStackParamList>();

const ExerciseRoutes: React.FC = () => {
  return (
    <ExerciseStack.Navigator
      initialRouteName="Exercises"
      screenOptions={{
        headerShown: false,
      }}>
      <ExerciseStack.Screen name="Exercises" component={ExercisesScreen} />
      <ExerciseStack.Screen name="Femfit" component={FemfitScreen} />
    </ExerciseStack.Navigator>
  );
};

export default ExerciseRoutes;
