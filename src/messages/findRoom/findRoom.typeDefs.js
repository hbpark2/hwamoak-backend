import { gql } from "apollo-server-express";

export default gql`
  type Query {
    findRoom(talkingToId: Int): MutationResponse!
  }
`;
