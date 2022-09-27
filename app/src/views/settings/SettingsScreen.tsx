import React from 'react';
import {List, Surface} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

import ThemeSwitch from '~components/ThemeSwitch';
import {SettingsScreenProps} from '~routes/interface';

export const SettingsScreen: React.FC<SettingsScreenProps> = () => {
  return (
    <SafeAreaView>
      <Surface style={{margin: 10, paddingHorizontal: 10, borderRadius: 15}}>
        <List.Section>
          <List.Subheader>Display</List.Subheader>
          <List.Item
            left={(props) => (
              <Icon
                {...props}
                size={20}
                name="brightness-4"
                style={{alignSelf: 'center'}}
              />
            )}
            title="Theme"
            right={(props) => <ThemeSwitch {...props} />}
          />
        </List.Section>
      </Surface>
    </SafeAreaView>
  );
};
