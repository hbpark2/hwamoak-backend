import { gql } from "apollo-server";

export default gql`
  type Mutation {
    uploadPlants(
      images: [String]!
      title: String!
      caption: String
      sunlight: Int
      temperatureMax: Int
      temperatureMin: Int
      water: Int
      plantDivision: String
      plantClass: String
      plantOrder: String
      plantFamily: String
      plantGenus: String
      plantSpecies: String
      plantHome: String
      plantHabitat: String
    ): Plants
  }
`;
