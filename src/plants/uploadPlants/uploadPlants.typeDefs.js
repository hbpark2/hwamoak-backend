import { gql } from "apollo-server";

export default gql`
  type Mutation {
    uploadPlants(
      images: [String]!
      title: String!
      caption: String
      sunlight: Int
      temperature: Int
      water: Int
    ): Plants
  }
`;
