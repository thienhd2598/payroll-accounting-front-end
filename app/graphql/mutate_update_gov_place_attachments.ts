import gql from 'graphql-tag';

export default gql`
  mutation update_gov_place_attachments(
    $where: gov_place_attachments_bool_exp = {}
    $_set: gov_place_attachments_set_input = {}
  ) {
    update_gov_place_attachments(where: $where, _set: $_set) {
      affected_rows
      returning {
        id
      }
    }
  }
`;
