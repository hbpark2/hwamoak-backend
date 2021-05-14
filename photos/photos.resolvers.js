import client from "../client";

export default {
  Photo: {
    user: ({ userId }) => client.user.findUnique({ where: { id: userId } }),
    hashtags: ({ id }) =>
      client.hashtag.findMany({
        where: {
          photos: {
            some: {
              id,
            },
          },
        },
      }),
    likes: ({ id }) => client.like.count({ where: { photoId: id } }),
  },
  Hashtag: {
    photos: ({ id }, { lastId }) => {
      return client.photo.findMany({
        where: {
          hashtags: {
            some: { id },
          },
        },
        // take: 5,
        // ...(page && { skip: (page - 1) * 5 }),
        take: 5,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      });
    },
    totalPhotos: ({ id }) =>
      client.photo.count({
        where: {
          hashtags: {
            some: { id },
          },
        },
      }),
  },
};
