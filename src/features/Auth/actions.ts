import { MutationLogInArgs, MutationSignUpArgs } from 'generated/graphqlTypes';
import { createAction } from '@reduxjs/toolkit';

export const logIn = createAction<MutationLogInArgs>('auth/logIn');
export const signUp = createAction<MutationSignUpArgs>('auth/signUp');
export const logOut = createAction<void>('auth/logOut');
