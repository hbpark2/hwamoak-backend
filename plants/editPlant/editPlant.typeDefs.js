import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    editPlant(
      id: Int!
      images: [Upload]
      title: String
      caption: String
    ): MutationResponse!
  }
`;
