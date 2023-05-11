import gql from "graphql-tag";

export default gql`
  query districts_by_pk($id: Int = "") {
    districts_by_pk (id: $id) {
        code
        codename
        name
    }
  }
`;