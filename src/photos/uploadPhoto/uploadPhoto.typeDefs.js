import { gql } from "apollo-server";

export default gql`
  type Mutation {
    uploadPhoto(images: [String]!, caption: String): Photo
  }
`;
