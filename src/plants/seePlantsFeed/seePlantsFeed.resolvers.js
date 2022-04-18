import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    seePlantsFeed: async (_, { lastId }, { loggedInUser }) => {
      const plant = await client.plants.findMany({
        include: {
          plantLikes: true,
        },
        where: {
          plantLikes: { some: { plantsId: { gte: 0 } } },
        },
        orderBy: {
          plantLikes: { count: "desc" },
        },
        take: 9,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      });

      return plant;
    },
  },
};
