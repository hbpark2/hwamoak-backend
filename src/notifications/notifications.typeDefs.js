import { gql } from "apollo-server";

export default gql`
  type Notification {
    id: Int!
    read: Boolean
    notificationType: String
    photo: Photo
    user: User
    sendUser: User
    comment: Comment
    like: Like
    likeId: Int
    commentId: Int
    sendUserId: Int
    photoId: Int
    userId: Int
    createdAt: String!
    updatedAt: String!
  }
`;
