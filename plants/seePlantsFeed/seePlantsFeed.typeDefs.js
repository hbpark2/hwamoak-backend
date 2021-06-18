import { gql } from "apollo-server-express";

export default gql`
  type Query {
    seePlantsFeed(lastId: Int): [Plants]
  }
`;
