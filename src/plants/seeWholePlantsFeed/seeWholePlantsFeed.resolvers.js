import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    seeWholePlantsFeed: protectedResolver(
      async (_, { offset }, { loggedInUser }) => {
        const plants = client.plants.findMany({
          take: 9,
          skip: offset || 0,
          include: {
            plantLikes: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });

        return plants;
      }
    ),
  },
};
