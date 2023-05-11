import gql from "graphql-tag";

export default gql`
  query places_by_pk($id: Int = "") {
    places_by_pk (id: $id) {
        address
        code
        avatar_url
        created_at        
        fire_status
        name
        id
    }
  }
`;