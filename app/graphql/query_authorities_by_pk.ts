import gql from "graphql-tag";

export default gql`
  query authorities_by_pk($id: Int = "") {
    authorities_by_pk (id: $id) {
        id
        name
        province_code
        ward_code
        district_code
    }
  }
`;