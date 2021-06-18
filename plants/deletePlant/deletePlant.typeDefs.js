import { gql } from "apollo-server";

export default gql`

  type Mutation {
    deletePlant(id: Int!): MutationResponse!
  }
`;
