import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    toggleLike: protectedResolver(async (_, { id }, { loggedInUser }) => {
      // 1. If it does not meet the criteria it will return false
      const photo = await client.photo.findUnique({
        where: {
          id,
        },
      });
      if (!photo) {
        return {
          ok: false,
          error: "Photo not found",
        };
      }

      // 2. LOOKIN FOR TARGET TO LIKE
      const likeWhere = {
        photoId_userId: {
          userId: loggedInUser.id,
          photoId: id,
        },
      };
      const like = await client.like.findUnique({
        where: likeWhere,
      });

      // 3. like이 존재하면 delete, 존재하지 않으면 create
      if (like) {
        await client.like.delete({
          where: likeWhere,
        });
      } else {
        await client.like.create({
          data: {
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            photo: {
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
