import gql from "graphql-tag";

export default gql`
  query get_all_districts($where: districts_bool_exp = {}) {
    districts(where: $where) {
        code
        codename
        name
      }      
  }
`;