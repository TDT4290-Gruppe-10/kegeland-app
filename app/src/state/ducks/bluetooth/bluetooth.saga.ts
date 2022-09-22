import {AnyAction} from '@reduxjs/toolkit';
import {has} from 'lodash';
import {Peripheral} from 'react-native-ble-manager';
import {put, take, fork, cancel, all, cancelled} from 'redux-saga/effects';

import {ProfileKey} from '~constants/bluetooth';

import {sagaActionConstants} from './bluetooth.actions';
import {initDevice} from './bluetooth.helpers';
import {
  createDeviceStreamChannel,
  createNotificationStreamChannel,
} from './bluetooth.channels';

function* handleNotificationRequest(
  deviceId: string,
  _profileKey: ProfileKey,
): any {
  const channel = createNotificationStreamChannel(deviceId);
  try {
    while (true) {
      const bytes = yield take(channel);
      // TODO: convert bytes here
      yield put({
        type: sagaActionConstants.UPDATE_CHARACTERISTICS,
        payload: bytes,
      });
    }
  } catch (err) {
    console.log(err);
  } finally {
    channel.close();
  }
}

function* handleDeviceScan(): Generator<AnyAction, void, Peripheral> {
  const channel = createDeviceStreamChannel();
  try {
    while (true) {
      const peripheral = yield take(channel);
      yield put({
        type: sagaActionConstants.ADD_AVAILABLE_DEVICE,
        payload: initDevice(peripheral, 'femfit'),
      });
    }
  } catch (err) {
    console.log(err);
  } finally {
    if (yield cancelled()) {
      channel.close();
    }
  }
}

export function* watchDeviceScanRequest(): any {
  while (yield take(sagaActionConstants.SCAN_FOR_DEVICE_START)) {
    const task = yield fork(handleDeviceScan);

    yield take(sagaActionConstants.SCAN_FOR_DEVICE_STOP);
    yield cancel(task);
  }
}

export function* watchNotificationStartRequest(): Generator<
  AnyAction,
  void,
  any
> {
  const runningTasks: Record<string, any> = {};
  while (true) {
    const res: any = yield take(
      sagaActionConstants.START_NOTIFICATION_FULFILLED,
    );
    const {id, profileKey} = res.meta.arg;
    if (!has(runningTasks, profileKey)) {
      const task = yield fork(handleNotificationRequest, id, profileKey);
      runningTasks[profileKey] = task;
    }

    const foo = yield take(sagaActionConstants.NOTIFICATION_STOP);
    yield cancel(runningTasks[foo.meta.arg.profileKey]);
  }
}

export function* bluetoothSaga(): any {
  yield all([
    fork(watchDeviceScanRequest),
    fork(watchNotificationStartRequest),
  ]);
}