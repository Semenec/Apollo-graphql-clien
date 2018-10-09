import gql from 'graphql-tag';

export const registrationMutation = gql `
    mutation registrationMutation($input: UserInput!) {
        registration(input: $input) {
            id,
            firstName,
            lastName,
            email
        }
    }
`;