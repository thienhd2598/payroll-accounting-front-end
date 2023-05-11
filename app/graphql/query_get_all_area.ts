import gql from "graphql-tag";

export default gql`
  query get_all_provinces {
    provinces {
        code
        codename
        name
      }      
  }
`;