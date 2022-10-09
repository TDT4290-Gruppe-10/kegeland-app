import React from 'react';
import {StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {List} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

import Accordion from '~components/Accordion';
import BluetoothDeviceItem from '~components/BluetoothDeviceItem';
import Badge from '~components/Badge';
import ListItem from '~components/ListItem';
import Section from '~components/Section';
import ThemeSwitch from '~components/ThemeSwitch';
import useAppDispatch from '~hooks/useAppDispatch';
import useAppSelector from '~hooks/useAppSelector';
import {SettingsScreenProps} from '~routes/interface';
import {setAnchorRoute} from '~state/ducks/app/app.reducer';
import {signOutUser} from '~state/ducks/auth/auth.actions';

const SettingsScreen: React.FC<SettingsScreenProps<'Settings'>> = ({
  navigation,
  route,
}) => {
  const {isSignedIn, authUser, loading} = useAppSelector((state) => state.auth);
  const connectedDevices = useAppSelector((state) =>
    Object.values(state.bluetooth.connectedDevices),
  );
  const dispatch = useAppDispatch();
  return (
    <SafeAreaView>
      <ScrollView style={styles.wrapper}>
        <Section title="Account">
          {isSignedIn && !loading ? (
            <List.Section>
              <ListItem icon="account-circle-outline" title={authUser?.email} />
              <ListItem icon="lock-outline" title="Change password" isRoute />
              <ListItem
                icon="logout"
                title="Sign out"
                isRoute
                onPress={() => dispatch(signOutUser())}
              />
            </List.Section>
          ) : (
            <List.Section>
              <ListItem
                icon="login"
                title="Sign in"
                loading={loading}
                isRoute
                onPress={() => {
                  dispatch(setAnchorRoute(route));
                  navigation.navigate('AuthStack', {screen: 'Login'});
                }}
              />
            </List.Section>
          )}
        </Section>
        <Section title="Display">
          <List.Section>
            <ListItem
              title="Theme"
              icon="brightness-4"
              render={(props) => <ThemeSwitch {...props} />}
            />
          </List.Section>
        </Section>

        <Section title="Devices">
          <List.Section>
            <ListItem
              title="Connect device"
              icon="bluetooth-connect"
              isRoute
              onPress={() => navigation.navigate('Connect device')}
            />
            <Accordion
              title="Connected devices"
              icon={<Badge>{connectedDevices.length}</Badge>}>
              {connectedDevices.map((device) => (
                <BluetoothDeviceItem
                  key={device.id}
                  device={device}
                  icon="battery-bluetooth"
                />
              ))}
            </Accordion>
          </List.Section>
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 10,
  },
});

export default SettingsScreen;
