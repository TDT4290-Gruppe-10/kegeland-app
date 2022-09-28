import React from 'react';
import {StyleSheet} from 'react-native';
import {List, Surface} from 'react-native-paper';

import Item from './Item';

type SettingsSectionProps = {
  title: string;
  children?: React.ReactNode;
};

type SettingsSectionComponents = {
  Item: typeof Item;
};

export const SettingsSection: React.FC<SettingsSectionProps> &
  SettingsSectionComponents = ({title, children}) => {
  return (
    <Surface style={styles.surface}>
      <List.Section>
        <List.Subheader>{title}</List.Subheader>
        {children}
      </List.Section>
    </Surface>
  );
};

const styles = StyleSheet.create({
  surface: {margin: 10, paddingHorizontal: 10, borderRadius: 15},
});

SettingsSection.Item = Item;
export default SettingsSection;
