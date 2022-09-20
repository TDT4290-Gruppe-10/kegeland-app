import * as React from 'react';
import {Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {Provider as ReduxProvider} from 'react-redux';
import {store} from '@state/store';
import WithBluetooth from '@hoc/WithBluetooth';
import ConnectDeviceContainer from '@containers/ConnectDeviceContainer';

function HomeScreen() {
  return (
    <SafeAreaView>
      <ConnectDeviceContainer />
    </SafeAreaView>
  );
}

function SettingsScreen() {
  return (
    <SafeAreaView>
      <Text>Settings!</Text>
    </SafeAreaView>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <ReduxProvider store={store}>
      <WithBluetooth>
        <SafeAreaProvider>
          <NavigationContainer>
            <Tab.Navigator>
              <Tab.Screen name="Home" component={HomeScreen} />
              <Tab.Screen name="Settings" component={SettingsScreen} />
            </Tab.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </WithBluetooth>
    </ReduxProvider>
  );
}
