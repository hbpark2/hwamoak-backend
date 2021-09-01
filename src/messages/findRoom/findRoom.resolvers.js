import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    findRoom: protectedResolver(
      async (_, { talkingToId }, { loggedInUser }) => {
        // console.log(talkingToId);

        const roomData = await client.room.findFirst({
          where: {
            users: {
              some: {
                id: talkingToId,
              },
            },
          },
          include: {
            users: true,
          },
        });

        if (roomData !== null) {
          const exist = roomData?.users?.some((item) => {
            if (item?.id === loggedInUser.id) {
              return roomData;
            }
          });

          if (exist) {
            return {
              ok: true,
              id: roomData.id,
            };
          } else {
            return {
              ok: false,
              error: "The room dosen't exist",
            };
          }
        } else {
          return {
            ok: false,
            error: "The room dosen't exist",
          };
        }
      }
    ),
  },
};
