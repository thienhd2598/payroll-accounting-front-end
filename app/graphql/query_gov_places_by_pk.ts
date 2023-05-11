import gql from 'graphql-tag';

export default gql`
  query gov_places_by_pk($id: bigint = "") {
    gov_places_by_pk(id: $id) {
      id
      name
      district_code
      address
      ward_code
      province_code
      pos_lat
      pos_lng
      placeMappeds {
        place {
          name
          fire_status
          pos_lat
          pos_long
        }
      }
      province {
        name
      }
      ward {
        name
      }
      district {
        name
      }
    }
  }
`;
