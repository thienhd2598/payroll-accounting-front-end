import gql from "graphql-tag";

export default gql`
  mutation update_gov_places($where: gov_places_bool_exp = {}, $_set: gov_places_set_input = {}) {
    update_gov_places(where: $where, _set: $_set) {
      affected_rows
      returning {
        id
      }
    }
  }
`;
