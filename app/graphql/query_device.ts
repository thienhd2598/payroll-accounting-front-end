import gql from 'graphql-tag';

export default gql`
  query devices($where: devices_bool_exp = {}) {
    devices(where: $where, order_by: {}) {
      id
      name
      state
      status
      serial_number
      productCode {
        name
      }
      subscription {
        end_time
        status
      }
    }
    devices_aggregate {
      aggregate {
        count
      }
    }
  }
`;
