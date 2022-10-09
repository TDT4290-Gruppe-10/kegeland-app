import React from 'react';
import {Badge as PaperBadge, useTheme} from 'react-native-paper';

type BadgeProps = React.ComponentProps<typeof PaperBadge>;

const Badge: React.FC<BadgeProps> = (props) => {
  const {colors} = useTheme();
  return (
    <PaperBadge
      {...props}
      style={[
        {backgroundColor: colors.primary, color: colors.onPrimary},
        props.style,
      ]}
    />
  );
};

export default Badge;
