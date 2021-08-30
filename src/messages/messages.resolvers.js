import client from "../client";
import { protectedResolver } from "../users/users.utils";

export default {
  Room: {
    users: ({ id }) => client.room.findUnique({ where: { id } }).users(),
    // messages: ({ id }, { lastId }) =>
    //   client.message.findMany({
    //     where: {
    //       roomId: id,
    //     },
    //     // take: 5,
    //     // skip: lastId ? 1 : 0,
    //     // ...(lastId && { cursor: { id: lastId } }),
    //     orderBy: {
    //       createdAt: "asc",
    //     },
    //   }),
    messages: ({ id }) =>
      client.message.findMany({
        where: {
          roomId: id,
        },
        orderBy: {
          createdAt: "asc",
        },
      }),

    unreadTotal: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return 0;
      }
      return client.message.count({
        where: {
          read: false,
          roomId: id,
          user: { id: { not: loggedInUser.id } },
        },
      });
    },
  },
  
  Message: {
    user: ({ id }) => client.message.findUnique({ where: { id } }).user(),
    isMine: ({ userId }, _, { loggedInUser }) => userId === loggedInUser.id,
  },
};
