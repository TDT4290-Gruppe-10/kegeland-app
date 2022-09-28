import React from 'react';
import {List} from 'react-native-paper';

import Icon from './Icon';

type ListItemProps = {
  icon: string;
  title: string;
  isRoute?: boolean;
  onPress?: () => void;
  render?: (props: {
    color: string;
    style?:
      | {
          marginRight: number;
          marginVertical?: number | undefined;
        }
      | undefined;
  }) => React.ReactNode;
};

const ListItem: React.FC<ListItemProps> = (props) => {
  if (!props.render && !props.isRoute) {
    throw new Error(
      "'Item' in component SettingsSection must have either a 'render'- or 'isRoute'=true defined",
    );
  }

  return (
    <List.Item
      onPress={props.onPress}
      left={({color}) => <Icon color={color} icon={props.icon} />}
      title={props.title}
      right={
        props.isRoute
          ? ({color}) => <Icon color={color} icon="chevron-right" />
          : props.render
      }
    />
  );
};

export default ListItem;
