import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {Title} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

export type PageWrapperProps = {
  title: string;
  contentStyle?: StyleProp<ViewStyle>;
  children: React.ReactNode;
};

const PageWrapper: React.FC<PageWrapperProps> = ({
  title,
  children,
  contentStyle,
}) => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <Title style={styles.title}>{title}</Title>
      <View style={contentStyle}>{children}</View>
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
