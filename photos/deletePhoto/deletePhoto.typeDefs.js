import { gql } from "apollo-server-express";

export default gql`
  type DeletePhotoResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    deletePhoto(id: Int): DeletePhotoResult!
  }
`;
