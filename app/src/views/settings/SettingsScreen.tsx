import React from 'react';
import {Card, List} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

import {SettingsScreenProps} from '~routes/interface';

export const SettingsScreen: React.FC<SettingsScreenProps> = () => {
  return (
    <SafeAreaView>
      <Card style={{margin: 10, paddingHorizontal: 10, borderRadius: 15}}>
        <List.Section>
          <List.Subheader>Display</List.Subheader>
          <List.Item title="Theme" />
        </List.Section>
      </Card>
    </SafeAreaView>
  );
};
