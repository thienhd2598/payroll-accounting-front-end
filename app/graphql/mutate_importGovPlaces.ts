import gql from "graphql-tag";

export default gql`
  mutation importGovPlace($path: String = "") {
    importGovPlace(path: $path) {
      errors {
        index
        message
      }
      message
      success
    }
  }
`;
