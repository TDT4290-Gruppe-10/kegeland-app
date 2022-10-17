import React from 'react';
import {StyleSheet} from 'react-native';
import {Button, Paragraph} from 'react-native-paper';

import Popup from '~components/Popup';

import {ExerciseScheme} from '../interface';
import {getMaxExerciseScore} from '../utils';

type GameOverDialogProps = {
  score: number;
  exercise: ExerciseScheme;
  visible: boolean;
  onDismiss: () => void;
  goBack: () => void;
};

const GameOverDialog: React.FC<GameOverDialogProps> = ({
  score,
  exercise,
  visible,
  onDismiss,
  goBack,
}) => {
  const handleGoBack = () => {
    onDismiss();
    goBack();
  };
  const maxScore = getMaxExerciseScore(exercise);
  return (
    <Popup
      visible={visible}
      onDismiss={handleGoBack}
      title="Exercise completed!"
      actions={<Button onPress={handleGoBack}>Continue</Button>}>
      <Paragraph
        style={
          styles.text
        }>{`You scored ${score} out of ${maxScore} points`}</Paragraph>
    </Popup>
  );
};

const styles = StyleSheet.create({
  text: {
    marginVertical: 4,
    textAlign: 'center',
  },
});

export default GameOverDialog;
