import gql from "graphql-tag";

export default gql`
    mutation loginAuthority($code: String!, $password: String!) {
        loginAuthority(code: $code, password: $password) {
            info {
                address
                email
                name
                id
                phone
            }
            message
            success
            token
        }
    }
`;
