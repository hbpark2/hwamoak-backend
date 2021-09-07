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

      const notificationWhere = {
        photoId_userId: {
          userId: photo.userId,
          photoId: id,
        },
      };

      const like = await client.like.findUnique({
        where: likeWhere,
      });

      const notification = await client.notification.findUnique({
        where: notificationWhere,
      });

      // 3. like이 존재하면 delete, 존재하지 않으면 create
      if (like) {
        // like 삭제
        await client.like.delete({
          where: likeWhere,
        });
        //notification 삭제
        if (notification) {
          await client.notification.delete({
            where: notificationWhere,
          });
        }
      } else {
        // notification 생성
        if (photo.userId !== loggedInUser.id) {
          await client.notification.create({
            data: {
              user: {
                connect: {
                  id: photo.userId,
                },
              },
              photo: {
                connect: {
                  id,
                },
              },
              sendUser: {
                connect: {
                  id: loggedInUser.id,
                },
              },
              notificationType: "like",
            },
          });
        }

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
