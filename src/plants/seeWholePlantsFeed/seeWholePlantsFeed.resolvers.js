import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    seeWholePlantsFeed: protectedResolver(
      async (_, { lastId }, { loggedInUser }) => {
        const plant = await client.plants.findMany({
          include: {
            plantLikes: true,
          },
          orderBy: {
            createdAt: "desc",
          },

          // take: 9,

          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }),
        });

        return plant;
      }
    ),
  },
};
