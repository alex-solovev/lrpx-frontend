import gql from 'graphql-tag';

export const logIn = gql`
  mutation logIn($email: String!, $password: String!) {
    logIn(email: $email, password: $password) {
      id
      email
    }
  }
`;

export const signUp = gql`
  mutation signUp($email: String!, $password: String!) {
    signUp(email: $email, password: $password) {
      id
      email
    }
  }
`;

export const logOut = gql`
  mutation logOut {
    logOut {
      id
      email
    }
  }
`;
