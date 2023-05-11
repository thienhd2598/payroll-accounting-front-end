import gql from "graphql-tag";

export default gql`
  query provinces_by_pk($id: Int = "") {
    provinces_by_pk (id: $id) {
        code
        codename
        name
    }
  }
`;