import { gql } from "apollo-server-express";

export default gql`
  type Query {
    seeRoom(id: Int, userId: Int): Room
  }
`;
