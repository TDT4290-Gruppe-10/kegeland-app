import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import type {StackScreenProps} from '@react-navigation/stack';
/**
 * Navigation interface for auth routes
 */
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  'Forgot password': undefined;
};

/**
 * Base navigation interface
 */
export type RootTabParamList = {
  Home: undefined;
  Auth: NavigatorScreenParams<AuthStackParamList>;
};

/**
 * Interface for screens on root-level
 */
export type RootScreenProps<
  RouteName extends keyof RootTabParamList = keyof RootTabParamList,
> = BottomTabScreenProps<RootTabParamList, RouteName>;

/**
 * Interface for screens under the auth-stack
 */
export type AuthScreenProps<
  RouteName extends keyof AuthStackParamList = keyof AuthStackParamList,
> = CompositeScreenProps<
  StackScreenProps<AuthStackParamList, RouteName>,
  BottomTabScreenProps<RootTabParamList>
>;
