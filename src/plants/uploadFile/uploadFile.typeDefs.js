import { gql } from "apollo-server";

export default gql`
  type UploadFileResponse {
    ok: Boolean
    file: String
    error: String
    id: Int
  }

  type Mutation {
    uploadFile(images: [Upload]!): UploadFileResponse!
  }
`;
