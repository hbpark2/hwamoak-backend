import { gql } from "apollo-server-express";

export default gql`
  type Query {
    seePhotoComments(id: Int!, lastId: Int): [Comment]
  }
`;
