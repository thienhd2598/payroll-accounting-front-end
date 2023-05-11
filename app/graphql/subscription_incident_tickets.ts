import gql from "graphql-tag";

export default gql`
    subscription incident_tickets {
        incident_tickets (where: { status: { _in: [0, 1] } }, order_by: { id: asc }) {
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
          processAuthority {
            name
          }
        }
      }
`;