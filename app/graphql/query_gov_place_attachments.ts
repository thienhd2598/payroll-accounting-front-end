import gql from 'graphql-tag';

export default gql`
  query gov_place_attachments(
    $limit: Int
    $offset: Int = 0
    $where: gov_place_attachments_bool_exp = {}
  ) {
    gov_place_attachments(
      limit: $limit
      offset: $offset
      where: $where
      order_by: { id: asc }
    ) {
      id
      name
      path
      created_at
    }
    gov_place_attachments_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`;
