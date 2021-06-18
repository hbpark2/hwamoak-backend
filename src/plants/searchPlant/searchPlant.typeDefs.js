import { gql } from "apollo-server-express";

export default gql`
  type SearchPlantResult {
    ok: Boolean!
    error: String
    plants: [Plants]
    count: Int!
  }

  type Query {
    searchPlant(keyword: String!, lastId: Int): SearchPlantResult
  }
`;
