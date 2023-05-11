import gql from "graphql-tag";

export default gql`
  query places($limit: Int = 10, $offset: Int = 0, $where: places_bool_exp = {}) {
    places (limit: $limit, offset: $offset, where: $where, order_by: { id: asc }) {
        address
        code
        avatar_url
        created_at
        district_code
        fire_status
        name
        id        
    }   
    
    places_aggregate (where: $where) {
        aggregate {
          count
        }
    }
  }
`;