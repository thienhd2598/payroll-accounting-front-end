import gql from "graphql-tag";

export default gql`
  mutation importResources($path: String = "") {
    importResources(path: $path) {
      errors {
        index
        message
      }
      message
      success
    }
  }
`;
