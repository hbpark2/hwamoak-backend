import client from "../client";

export default {
  Photo: {
    user: ({ userId }) => client.user.findUnique({ where: { id: userId } }),
    hashtags: ({ id }) =>
      client.hastag.findMany({
        where: {
          photos: {
            some: {
              id,
            },
          },
        },
      }),
  },
};
