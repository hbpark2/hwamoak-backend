import { gql } from "apollo-server";

export default gql`
  type Mutation {
    uploadPhoto(images: [Upload]!, caption: String): Photo
  }
`;
