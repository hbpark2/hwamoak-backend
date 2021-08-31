import { gql } from "apollo-server-express";

export default gql`
  type Query {
    seeWholePlantsFeed(offset: Int): [Plants]
  }
`;
