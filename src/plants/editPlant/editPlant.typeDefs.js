import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    editPlant(
      id: Int!
      images: [String]
      title: String
      caption: String
      water: Int
      sunlight: Int
      temperatureMax: Int
      temperatureMin: Int
    ): MutationResponse!
  }
`;
