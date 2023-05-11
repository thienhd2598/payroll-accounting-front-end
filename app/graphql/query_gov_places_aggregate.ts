import gql from 'graphql-tag';

export default gql`
  query gov_places_aggregate($where: gov_places_bool_exp = {}) {
    gov_places_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`;
