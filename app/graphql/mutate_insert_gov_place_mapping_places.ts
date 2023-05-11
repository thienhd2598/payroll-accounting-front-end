import gql from 'graphql-tag';

export default gql`
  mutation insert_gov_place_mapping_places(
    $objects: [gov_place_mapping_places_insert_input!] = {}
  ) {
    insert_gov_place_mapping_places(objects: $objects) {
      affected_rows
    }
  }
`;
