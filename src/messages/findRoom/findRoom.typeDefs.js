import { gql } from "apollo-server-express";

export default gql`
  # type findRoomResult {
  #   ok: Boolean!
  #   error: String
  #   room: Room
  # }

  type Query {
    findRoom(talkingToId: Int): MutationResponse!
  }
`;
