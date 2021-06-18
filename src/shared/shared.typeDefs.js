import { gql } from "apollo-server-express";

export default gql`
  scalar Upload

  type MutationResponse {
    ok: Boolean!
    id: Int
    error: String
  }
`;
