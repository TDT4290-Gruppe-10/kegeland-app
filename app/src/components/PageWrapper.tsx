import React from 'react';
import {StyleSheet} from 'react-native';
import {Title} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

export type PageWrapperProps = {
  title: string;
  children: React.ReactNode;
};

const PageWrapper: React.FC<PageWrapperProps> = ({title, children}) => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <Title style={styles.title}>{title}</Title>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    width: '100%',
    paddingHorizontal: 30,
    marginTop: 30,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
  },
});

export default PageWrapper;
