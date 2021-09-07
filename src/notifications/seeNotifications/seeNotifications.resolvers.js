import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    seeNotifications: protectedResolver(
      async (_, { id, userId }, { loggedInUser }) => {
        const notifications = await client.notification.findMany({
          where: {
            userId: loggedInUser.id,
          },
          include: {
            sendUser: true,
            photo: true,
          },
        });

        return notifications;
      }
    ),
  },
};
