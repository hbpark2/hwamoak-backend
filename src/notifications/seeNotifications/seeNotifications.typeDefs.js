import { gql } from "apollo-server-express";

export default gql`
  type Query {
    seeNotifications(id: Int, userId: Int): [Notification]
  }
`;
