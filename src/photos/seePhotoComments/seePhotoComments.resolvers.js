import client from "../../client";

export default {
  Query: {
    seePhotoComments: async (_, { id, lastId }) => {
      return await client.comment.findMany({
        where: {
          photoId: id,
        },
        take: 5,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
        orderBy: { createdAt: "asc" },
      });
    },
  },
};
