import { gql } from "apollo-server";

export default gql`
  type EditProfileResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editProfile(
      username: String
      firstName: String
      lastName: String
      email: String
      password: String
    ): EditProfileResult!
  }
`;
