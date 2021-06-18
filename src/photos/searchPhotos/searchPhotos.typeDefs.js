import { gql } from "apollo-server-express";

export default gql`
  type SearchPhotosResult {
    ok: Boolean!
    error: String
    photos: [Photo]
    count: Int!
  }
  type Query {
    searchPhotos(keyword: String!, lastId: Int): SearchPhotosResult
  }
`;
