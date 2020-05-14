import gql from 'graphql-tag';

// eslint-disable-next-line
export const currentUser = gql`
  query currentUser {
    currentUser {
      id
      email
    }
  }
`;
