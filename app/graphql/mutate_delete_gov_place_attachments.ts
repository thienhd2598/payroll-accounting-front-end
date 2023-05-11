import gql from 'graphql-tag';

export default gql`
  mutation delete_gov_place_attachments(
    $where: gov_place_attachments_bool_exp = {}
  ) {
    delete_gov_place_attachments(where: $where) {
      affected_rows
    }
  }
`;
