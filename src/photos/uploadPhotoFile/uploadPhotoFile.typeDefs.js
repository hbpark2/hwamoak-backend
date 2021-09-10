import { gql } from "apollo-server";

export default gql`
  type UploadPhotoFileResponse {
    ok: Boolean
    file: String
    error: String
    id: Int
  }

  type Mutation {
    uploadPhotoFile(images: [Upload]!): UploadPhotoFileResponse!
  }
`;
