import gql from 'graphql-tag';

export default gql`
  query gov_places(
    $limit: Int
    $offset: Int = 0
    $where: gov_places_bool_exp = {}
  ) {
    gov_places(
      limit: $limit
      offset: $offset
      where: $where
      order_by: { id: asc }
    ) {
      id
      name
      district_code
      address
      ward_code
      province_code
      placeMappeds {
        place {
          fire_status
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

    gov_places_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`;
