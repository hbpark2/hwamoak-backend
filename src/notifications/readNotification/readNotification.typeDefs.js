import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    readNotification(id: Int!): MutationResponse
  }
`;
