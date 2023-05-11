import gql from 'graphql-tag';

export default gql`
  query incident_tickets(
    $limit: Int
    $offset: Int = 0
    $where: incident_tickets_bool_exp = {}
  ) {
    incident_tickets(
      limit: $limit
      offset: $offset
      where: $where
      order_by: { time_begin: desc }
    ) {
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
      processAuthority {
        name
      }
    }

    incident_tickets_aggregate {
      aggregate {
        count
      }
    }
  }
`;
