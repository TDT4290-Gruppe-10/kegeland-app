import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

import SettingsSection from '~components/SettingsSection';
import ThemeSwitch from '~components/ThemeSwitch';
import {SettingsScreenProps} from '~routes/interface';

const Setting = SettingsSection.Item;

export const SettingsScreen: React.FC<SettingsScreenProps<'Settings'>> = () => {
  return (
    <SafeAreaView>
      <SettingsSection title="Display">
        <SettingsSection.Item
          title="Theme"
          icon="brightness-4"
          render={(props) => <ThemeSwitch {...props} />}
        />
      </SettingsSection>

      <SettingsSection title="Devices">
        <Setting
          title="Connect device"
          icon="bluetooth"
          route="Connect device"
        />
      </SettingsSection>
    </SafeAreaView>
  );
};
