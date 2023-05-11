import gql from "graphql-tag";

export default gql`
  query get_all_wards($where: wards_bool_exp = {}) {
    wards(where: $where) {
        code
        codename
        name
      }      
  }
`;