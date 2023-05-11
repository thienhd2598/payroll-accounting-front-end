import gql from 'graphql-tag';

export default gql`
  query incident_tickets_by_pk($id: Int = "") {
    incident_tickets_by_pk(id: $id) {
      address
      authority_code
      created_at
      district_code
      id
      location_lat
      location_lng
      name
      province_code
      status
      time_begin
      type
      updated_at
      ward_code
      province {
        name
      }
      ward {
        name
      }
      district {
        name
      }
      place {
        customer {
          name
          phone
        }
        name
      }
      processAuthority {
        name
      }
    }
  }
`;
