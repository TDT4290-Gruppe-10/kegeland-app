import {PermissionsAndroid} from 'react-native';

const checkAndroidPermission = async (permission: string) => {
  return PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS[permission],
  ).then((result) => {
    if (result) {
      console.log(`Permission ${permission} is OK`);
    } else {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS[permission],
      ).then(() => {
        if (result) {
          console.log('User accepted');
        } else {
          console.log('User refused');
        }
      });
    }
  });
};

export default checkAndroidPermission;
