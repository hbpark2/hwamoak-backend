import { gql } from "apollo-server";

export default gql`
  type Notification {
    id: Int!
    notificationType: String
    photo: Photo
    user: User
    photoId: Int
    userId: Int
    createdAt: String!
    updatedAt: String!
  }
`;
