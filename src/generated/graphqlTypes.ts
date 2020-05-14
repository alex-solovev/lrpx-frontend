export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  dummyQuery: Scalars['String'];
  user?: Maybe<User>;
  users: Array<User>;
  currentUser?: Maybe<User>;
};

export type QueryUserArgs = {
  id: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  dummyMutation: Scalars['String'];
  signUp?: Maybe<User>;
  logIn?: Maybe<User>;
  logOut?: Maybe<User>;
};

export type MutationSignUpArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type MutationLogInArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};
