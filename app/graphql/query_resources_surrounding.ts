import gql from 'graphql-tag';

export default gql`
  query getListResourcesSurrounding($range: Int, $lat: String!, $lng: String!) {
    getListResourcesSurrounding(range: $range, lat: $lat, lng: $lng) {
      success
      message
      data {
        id
        name
        type
        status
        posLat
        posLong
        address
      }
    }
  }
`;
