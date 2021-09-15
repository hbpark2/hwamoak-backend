import { gql } from "apollo-server";

export default gql`
  type Mutation {
    uploadPlants(
      category: String
      pot: String
      soil: String
      images: [Upload]!
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
