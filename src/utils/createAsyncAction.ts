import { createAction, PayloadActionCreator } from '@reduxjs/toolkit';

type AsyncAction<R, S, F> = {
  request: PayloadActionCreator<R, string>;
  success: PayloadActionCreator<S, string>;
  failure: PayloadActionCreator<F, string>;
};

export default function createAsyncAction<R = void, S = void, F = void>(
  actionName: string,
): AsyncAction<R, S, F> {
  return {
    request: createAction<R>(`${actionName}/request`),
    success: createAction<S>(`${actionName}/success`),
    failure: createAction<F>(`${actionName}/failure`),
  };
}
