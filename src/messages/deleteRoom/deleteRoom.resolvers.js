import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deleteRoom: protectedResolver(
      async (_, { id, userId }, { loggedInUser }) => {
        if (id) {
          const oldRoom = await client.room.findFirst({
            where: {
              id,
              users: {
                some: {
                  id: loggedInUser.id,
                },
              },
            },
            include: {
              users: true,
            },
          });

          await client.room.update({
            where: {
              id,
            },
            data: {
              users: {
                disconnect: {
                  id: userId,
                },
              },
            },
          });

          return {
            ok: true,
          };
        }
      }
    ),
  },
};
