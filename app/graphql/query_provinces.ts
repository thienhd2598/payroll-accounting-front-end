import gql from "graphql-tag";

export default gql`
  query provinces {
    provinces {
      code
      codename
      name
      districts {
        code
        name
        codename
        wards {
          code
          name
          codename
        }
      }
    }
  }
`;