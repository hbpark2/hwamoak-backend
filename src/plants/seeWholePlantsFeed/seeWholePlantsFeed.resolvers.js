import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    seeWholePlantsFeed: protectedResolver(
      async (_, { offset }, { loggedInUser }) => {
        console.log(offset);
        const plant = await client.plants.findMany({
          include: {
            plantLikes: true,
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 9,
          skip: offset ? offset : 0,
          // skip: lastId ? lastId : 0,
          // skip: lastId ? 1 : 0,
          // ...(lastId && { cursor: { id: lastId } }),
        });
        return plant;
      }
    ),
  },
};
