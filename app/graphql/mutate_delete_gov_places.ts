import gql from "graphql-tag";

export default gql`
  mutation delete_gov_places($where: gov_places_bool_exp = {}) {
    delete_gov_places(where: $where) {
      affected_rows
    }
  }
`;
