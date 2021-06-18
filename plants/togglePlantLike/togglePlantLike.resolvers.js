import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    togglePlantLike: protectedResolver(async (_, { id }, { loggedInUser }) => {
      console.log(id);
      // 1. If it does not meet the criteria it will return false
      const plants = await client.plants.findUnique({
        where: {
          id,
        },
      });
      if (!plants) {
        return {
          ok: false,
          error: "Plant not found",
        };
      }

      // 2. LOOKIN FOR TARGET TO LIKE
      const likeWhere = {
        plantsId_userId: {
          userId: loggedInUser.id,
          plantsId: id,
        },
      };
      const like = await client.plantLike.findUnique({
        where: likeWhere,
      });

      // 3. like이 존재하면 delete, 존재하지 않으면 create
      if (like) {
        await client.plantLike.delete({
          where: likeWhere,
        });
      } else {
        await client.plantLike.create({
          data: {
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            plants: {
              connect: {
                id,
              },
            },
          },
        });
      }
      return {
        ok: true,
      };
    }),
  },
};
