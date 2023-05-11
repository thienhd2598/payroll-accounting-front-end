import gql from "graphql-tag";

export default gql`
  query incident_tickets($where: incident_tickets_bool_exp = {}) {
    incident_tickets_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`;