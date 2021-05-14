import { gql } from "apollo-server-express";

export default gql`
  type Photo {
    id: Int!
    user: User!
    file: String!
    caption: String!
    hashtags: [Hashtag]
    createdAt: String!
    updatedAt: String!
    likes: Int
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
`;
