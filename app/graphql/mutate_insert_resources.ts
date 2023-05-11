import gql from "graphql-tag";

export default gql`
  mutation insert_resources($objects: [resources_insert_input!] = {}) {
    insert_resources(objects: $objects) {
      affected_rows
    }
  }
`;
