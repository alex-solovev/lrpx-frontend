import { Query } from 'generated/graphqlTypes';

export type AppState = {
  readonly user: Query['currentUser'];
  readonly loading: boolean;
  readonly error: string | string[] | null;
};
