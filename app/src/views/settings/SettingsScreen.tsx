import React from 'react';
import {List} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

import ListItem from '~components/ListItem';
import Section from '~components/Section';
import ThemeSwitch from '~components/ThemeSwitch';
import {SettingsScreenProps} from '~routes/interface';

const SettingsScreen: React.FC<SettingsScreenProps<'Settings'>> = ({
  navigation,
}) => {
  return (
    <SafeAreaView>
      <Section title="Display">
        <List.Section>
          <ListItem
            title="Theme"
            icon="brightness-4"
            render={(props) => <ThemeSwitch {...props} />}
          />
        </List.Section>
      </Section>

      <Section title="Devices">
        <List.Section>
          <ListItem
            title="Connect device"
            icon="bluetooth"
            isRoute
            onPress={() => navigation.navigate('Connect device')}
          />
        </List.Section>
      </Section>
    </SafeAreaView>
  );
};

export default SettingsScreen;
