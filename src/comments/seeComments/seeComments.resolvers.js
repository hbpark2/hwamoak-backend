import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    seeComments: protectedResolver(
      async (_, { id, offset }, { loggedInUser }) => {
        const exist = await client.photo.findUnique({
          where: { id },
        });
        if (!exist) {
          return {
            ok: false,
            error: "Photo Dose not exist",
          };
        }

        const comments = await client.comment.findMany({
          where: { photoId: id },
          include: {
            user: true,
          },
          skip: offset || 0,
          take: 10,
          orderBy: {
            createdAt: "desc",
          },
        });

        // if (!comments) {
        //   return {
        //     ok: false,
        //   };
        // }
        return comments;
      }
    ),
  },
};
