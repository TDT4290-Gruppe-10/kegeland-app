import React from 'react';
import {StyleSheet} from 'react-native';
import {Surface, Title, useTheme} from 'react-native-paper';

type SectionProps = {
  title: string;
  children?: React.ReactNode;
};

export const Section: React.FC<SectionProps> = ({title, children}) => {
  const {colors} = useTheme();
  return (
    <Surface style={styles.surface}>
      <Title style={[{color: colors.placeholder}, styles.title]}>{title}</Title>
      {children}
    </Surface>
  );
};

const styles = StyleSheet.create({
  surface: {
    margin: 10,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  title: {fontSize: 14, paddingHorizontal: 10},
});

export default Section;
