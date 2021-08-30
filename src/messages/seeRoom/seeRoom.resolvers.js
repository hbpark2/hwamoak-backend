import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    seeRoom: protectedResolver(async (_, { id, userId }, { loggedInUser }) => {
      if (id) {
        return await client.room.findFirst({
          where: {
            id,
            users: {
              some: {
                id: loggedInUser.id,
              },
            },
          },
        });
      } else {
        if (userId) {
          const user = await client.user.findUnique({
            where: {
              id: userId,
            },
            select: {
              id: true,
            },
          });

          if (!user) {
            return {
              ok: false,
              error: "This user does not exist.",
            };
          }

          const room = await client.room.create({
            data: {
              users: {
                connect: [
                  {
                    id: userId,
                  },
                  {
                    id: loggedInUser.id,
                  },
                ],
              },
            },
          });

          return await client.room.findFirst({
            where: {
              id: room.id,
              users: {
                some: {
                  id: loggedInUser.id,
                },
              },
            },
          });
        }
      }
    }),
  },
};
