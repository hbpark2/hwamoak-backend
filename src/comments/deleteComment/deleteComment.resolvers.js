import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deleteComment: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const comment = await client.comment.findUnique({
        where: { id },
        select: { userId: true },
      });

      // const photo = await client.photo.findFirst({
      //   where: {
      //     comments: {
      //       id,
      //     },
      //   },
      // });
      // console.log(photo);

      // const notificationWhere = {
      //   photoId_userId: {
      //     userId: photo.userId,
      //     photoId: id,
      //   },
      // };

      // const notification = await client.notification.findUnique({
      //   where: notificationWhere,
      // });

      if (!comment) {
        return {
          ok: false,
          error: "Comment not found.",
        };
      } else if (comment.userId !== loggedInUser.id) {
        return {
          ok: false,
          error: "Not Authorized",
        };
      } else {
        // if (notification) {
        //   await client.notification.delete({
        //     where: notificationWhere,
        //   });
        // }

        await client.comment.delete({ where: { id } });
      }
      return {
        ok: true,
      };
    }),
  },
};
