import { gql } from "apollo-server-express";

export default gql`
  type Plants {
    id: Int!
    user: User!
    category: String!
    pot: String!
    soil: String!
    images: [PlantsImage]
    title: String!
    caption: String!
    sunlight: Int
    water: Int
    temperatureMax: Int
    temperatureMin: Int
    plantDivision: String
    plantClass: String
    plantOrder: String
    plantFamily: String
    plantGenus: String
    plantSpecies: String
    plantHome: String
    plantHabitat: String
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
