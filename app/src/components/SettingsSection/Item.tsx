import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {List} from 'react-native-paper';

import {SettingsStackParamList} from '~routes/interface';

import Icon from './Icon';

type ItemProps = {
  icon: string;
  title: string;
  route?: keyof SettingsStackParamList;
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

const Item: React.FC<ItemProps> = (props) => {
  const nav = useNavigation<any>();

  console.log(nav);
  if (!props.render && !props.route) {
    throw new Error(
      "'Item' in component SettingsSection must have either a 'render'- or 'route'-prop defined",
    );
  }

  return (
    <List.Item
      onPress={
        props.route
          ? () => nav.navigate(props.route as keyof SettingsStackParamList)
          : undefined
      }
      left={({color}) => <Icon color={color} icon={props.icon} />}
      title={props.title}
      right={
        props.route
          ? ({color}) => <Icon color={color} icon="chevron-right" />
          : props.render
      }
    />
  );
};

export default Item;
