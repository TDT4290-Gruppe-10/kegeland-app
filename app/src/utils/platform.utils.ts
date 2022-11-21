import {Platform} from 'react-native';

/**
 * Checks if the current platform is android
 * @returns true if platform is Android
 */
export const isAndroid = () => Platform.OS === 'android';
