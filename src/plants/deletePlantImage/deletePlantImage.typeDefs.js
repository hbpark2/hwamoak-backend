import { gql } from "apollo-server";

export default gql`
  type Mutation {
    deletePlantImage(id: Int!): MutationResponse!
  }
`;


