import React from 'react';
import {StyleProp, TextStyle} from 'react-native';
import {List} from 'react-native-paper';

import Icon from './Icon';

type ListItemProps = {
  icon?: string;
  iconSize?: number;
  iconStyle?: StyleProp<TextStyle>;
  title: string;
  isRoute?: boolean;
  onPress?: () => void;
  onLongPress?: () => void;
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
  const handleOnPress =
    props.onPress || props.onLongPress
      ? () => {
          if (props.onLongPress) return () => null;
          return props.onPress && props.onPress();
        }
      : undefined;

  const handleOnLongPress = props.onLongPress
    ? () => {
        return props.onLongPress && props.onLongPress();
      }
    : undefined;

  return (
    <List.Item
      onPress={handleOnPress}
      onLongPress={handleOnLongPress}
      delayLongPress={500}
      left={
        props.icon
          ? ({color}) => (
              <Icon
                color={color}
                icon={props.icon as string}
                size={props.iconSize}
                style={props.iconStyle}
              />
            )
          : undefined
      }
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
