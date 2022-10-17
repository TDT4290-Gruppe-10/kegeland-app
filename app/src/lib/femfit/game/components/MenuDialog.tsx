import React from 'react';
import {StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';

import Popup from '~components/Popup';

type MenuDialogProps = {
  visible: boolean;
  onDismiss: () => void;
  goBack: () => void;
};

const MenuDialog: React.FC<MenuDialogProps> = ({
  visible,
  onDismiss,
  goBack,
}) => {
  const handleGoBack = () => {
    onDismiss();
    goBack();
  };
  return (
    <Popup visible={visible} onDismiss={onDismiss} title="Game paused">
      <Button style={styles.button} onPress={onDismiss}>
        Continue
      </Button>
      <Button style={styles.button} onPress={handleGoBack}>
        Quit game
      </Button>
    </Popup>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 4,
  },
});

export default MenuDialog;
