import { gql } from "apollo-server-express";

export default gql`
  type seePhotoCommentsResult {
    ok: Boolean!
    error: String
  }

  type Query {
    seePhotoComments(photoId: Int!, lastId: Int): [Comment]
  }
`;
