import React from 'react';
import {Badge as PaperBadge, useTheme} from 'react-native-paper';

export type BadgeProps = React.ComponentProps<typeof PaperBadge>;

const Badge: React.FC<BadgeProps> = (props) => {
  const {colors} = useTheme();
  return (
    <PaperBadge
      {...props}
      style={[
        {backgroundColor: colors.primary, color: colors.text},
        props.style,
      ]}
    />
  );
};

export default Badge;
