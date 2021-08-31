import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    deleteRoom(id: Int, userId: Int): MutationResponse!
  }
`;
