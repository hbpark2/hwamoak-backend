import { gql } from "apollo-server-express";

export default gql`
  type Query {
    seeWholePlantsFeed(lastId: Int): [Plants]
  }
`;
