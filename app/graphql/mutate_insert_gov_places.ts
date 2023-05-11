import gql from "graphql-tag";

export default gql`
  mutation insert_gov_places($objects: [gov_places_insert_input!] = {}) {
    insert_gov_places(objects: $objects) {
      affected_rows
    }
  }
`;
