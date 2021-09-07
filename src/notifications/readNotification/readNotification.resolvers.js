import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    readNotification: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const exist = await client.notification.findMany({
        where: {
          read: false,
          userId: loggedInUser.id,
        },
      });

      console.log(id);
      if (!exist) {
        return {
          ok: false,
          error: "have no notifications",
        };
      }

      await client.notification.update({
        where: {
          id,
        },
        data: { read: true },
      });

      return {
        ok: true,
      };
    }),
  },
};
