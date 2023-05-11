import gql from "graphql-tag";

export default gql`
  query places_aggregate($where: places_bool_exp = {}) {    
    places_aggregate (where: $where) {
        aggregate {
          count
        }
    }
  }
`;