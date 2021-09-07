import { withFilter } from "apollo-server-express";
import client from "../../client";
import { NEW_MESSAGE, NEW_NOTIFICATION } from "../../constants";
import pubsub from "../../pubsub";

export default {
  Subscription: {
    notificationUpdates: {
      subscribe: async (root, args, context, info) => {
        const room = await client.notification.findFirst({
          where: {
            id: args.id,
            users: { some: { id: context.loggedInUser.id } },
          },
          select: { id: true },
        });
        if (!room) {
          throw new Error("You shall not see this");
        }

        return withFilter(
          () => pubsub.asyncIterator(NEW_NOTIFICATION),
          async ({ notificationUpdates }, { id }, { loggedInUser }) => {
            if (notificationUpdates.id === id) {
              const room = await client.notification.findFirst({
                where: {
                  id,
                  users: { some: { id: loggedInUser.id } },
                },
                select: {
                  id: true,
                },
              });
              if (!room) {
                return false;
              } else {
                return true;
              }
            }
          }
        )(root, args, context, info);
      },
    },
  },
};
