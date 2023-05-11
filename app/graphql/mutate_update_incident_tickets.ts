import gql from "graphql-tag";

export default gql`
  mutation update_incident_tickets($where: incident_tickets_bool_exp = {}, $_set: incident_tickets_set_input = {}) {
    update_incident_tickets(where: $where, _set: $_set) {
      affected_rows
    }
  }
`;
