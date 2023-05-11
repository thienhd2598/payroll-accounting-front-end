import gql from "graphql-tag";

export default gql`
  mutation delete_resources($where: resources_bool_exp = {}) {
    delete_resources(where: $where) {
      affected_rows
    }
  }
`;
