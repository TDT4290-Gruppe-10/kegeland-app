import {PermissionsAndroid} from 'react-native';

const checkAndroidPermission = async (permission: string) => {
  return PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS[permission],
  ).then((result) => {
    if (result) {
      console.warn(`Permission ${permission} is OK`);
    } else {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS[permission],
      ).then(() => {
        if (result) {
          console.warn('User accepted');
        } else {
          console.warn('User refused');
        }
      });
    }
  });
};

export default checkAndroidPermission;
