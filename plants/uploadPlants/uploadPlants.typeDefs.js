import { gql } from "apollo-server";

export default gql`
  type Mutation {
    uploadPlants(
      images: [Upload]!
      title: String!
      caption: String
      sunlight: Int
      temperature: String
      water: String
    ): Plants
  }
`;
