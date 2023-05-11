import gql from "graphql-tag";

export default gql`
  mutation update_resources($where: resources_bool_exp = {}, $_set: resources_set_input = {}) {
    update_resources(where: $where, _set: $_set) {
      affected_rows      
    }
  }
`;
