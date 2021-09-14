import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    editPlant(
      id: Int!
      images: [Upload]
      originalImages: [String]
      title: String
      caption: String
      water: Int
      sunlight: Int
      temperatureMax: Int
      temperatureMin: Int
      plantDivision: String
      plantClass: String
      plantOrder: String
      plantFamily: String
      plantGenus: String
      plantSpecies: String
      plantHome: String
      plantHabitat: String
    ): MutationResponse!
  }
`;
