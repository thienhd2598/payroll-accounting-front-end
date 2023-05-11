import gql from "graphql-tag";

export default gql`
  query resources($limit: Int, $offset: Int = 0, $where: resources_bool_exp = {}) {
    resources (limit: $limit, offset: $offset, where: $where, order_by: { id: asc }) {
        address
        district {
          name
        }
        district_code
        id
        name
        status
        pos_lat
        pos_lng
        province_code
        province {
          name
        }
        type
        ward {
          name
        }
        ward_code
    }   
    
    resources_aggregate (where: $where) {
      aggregate {
        count
      }
    }
  }
`;
