import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    seePlantsFeed: protectedResolver(async (_, { lastId }, { loggedInUser }) =>
      client.plants.findMany({
        orderBy: {
          createdAt: "desc",
          // plantLikes: "desc",
        },
        take: 9,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      })
    ),
  },
};
