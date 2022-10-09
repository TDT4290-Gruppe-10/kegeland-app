import React from 'react';
import {StyleProp, TextStyle} from 'react-native';
import {List, useTheme} from 'react-native-paper';

import Icon from './Icon';
import ListItemSkeleton from './ListItemSkeleton';

type ListItemProps = {
  icon?: string;
  iconSize?: number;
  iconStyle?: StyleProp<TextStyle>;
  title: string | undefined;
  isRoute?: boolean;
  loading?: boolean;
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
  const {colors} = useTheme();
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

  return props.loading ? (
    <ListItemSkeleton />
  ) : (
    <List.Item
      onPress={handleOnPress}
      onLongPress={handleOnLongPress}
      delayLongPress={500}
      left={
        props.icon
          ? () => (
              <Icon
                color={colors.primary}
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

ListItem.defaultProps = {
  iconSize: 24,
};

export default ListItem;
