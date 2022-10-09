import {AsyncThunk} from '@reduxjs/toolkit';
import {AnyAction} from 'redux';

type GenericAsyncThunk = AsyncThunk<unknown, unknown, {rejectedMeta: Error}>;

type PendingAction = ReturnType<GenericAsyncThunk['pending']>;

type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;

type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;

export function isPendingAction(action: AnyAction): action is PendingAction {
  return action.type.endsWith('/pending');
}

export function isRejectedAction(action: AnyAction): action is RejectedAction {
  return action.type.endsWith('/rejected');
}

export function isFulfilledAction(
  action: AnyAction,
): action is FulfilledAction {
  return action.type.endsWith('/fulfilled');
}
