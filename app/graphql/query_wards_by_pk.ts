import gql from "graphql-tag";

export default gql`
  query wards_by_pk($id: Int = "") {
    wards_by_pk (id: $id) {
        code
        codename
        name
    }
  }
`;