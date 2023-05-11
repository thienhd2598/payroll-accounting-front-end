import gql from "graphql-tag";

export default gql`
  query resources_by_pk($id: Int = "") {
    resources_by_pk (id: $id) {
        address
        district {
          name
        }
        district_code
        id
        name
        pos_lat
        pos_lng
        province {
          name
        }
        type
        ward {
          name
        }
        ward_code
    }
  }
`;