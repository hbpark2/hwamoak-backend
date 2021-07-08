import { gql } from "apollo-server-express";

export default gql`
  type Plants {
    id: Int!
    user: User!
    images: [PlantsImage]
    title: String!
    caption: String!
    sunlight: Int
    water: Int
    temperatureMax: Int
    temperatureMin: Int
    plantLikes: Int
    commentNumber: Int!
    comments: [Comment]
    hashtags: [Hashtag]
    createdAt: String!
    updatedAt: String!
    isMine: Boolean!
    isLiked: Boolean!
  }

  type Hashtag {
    id: Int!
    hashtag: String!
    plants(lastId: Int): [Plants]
    totalPlants: Int!
    createdAt: String!
    updatedAt: String!
  }

  type PlantLike {
    id: Int!
    plants: Plants!
    createdAt: String!
    updatedAt: String!
  }

  type PlantsImage {
    id: Int!
    file: String!
    plants: Plants!
    createdAt: String!
    updatedAt: String!
  }
`;
