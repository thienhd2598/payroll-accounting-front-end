import gql from 'graphql-tag';

export default gql`
  mutation insert_gov_place_attachments(
    $objects: [gov_place_attachments_insert_input!] = {}
  ) {
    insert_gov_place_attachments(objects: $objects) {
      affected_rows
    }
  }
`;
