import { gql } from "apollo-server-express";

export default gql`
  type Photo {
    id: Int!
    user: User!
    images: [PhotoImage]!
    caption: String!
    likes: Int
    commentNumber: Int!
    comments: [Comment]
    hashtags: [Hashtag]
    createdAt: String!
    updatedAt: String!
    isMine: Boolean!
    isLiked: Boolean!
    Notification: [Notification]
  }

  type Hashtag {
    id: Int!
    hashtag: String!
    photos(lastId: Int): [Photo]
    totalPhotos: Int!
    createdAt: String!
    updatedAt: String!
  }

  type Like {
    id: Int!
    photo: Photo!
    createdAt: String!
    updatedAt: String!
  }

  type PhotoImage {
    id: Int!
    file: String!
    photo: Photo!
    createdAt: String!
    updatedAt: String!
  }
`;
