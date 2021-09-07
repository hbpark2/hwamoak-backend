import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createComment: protectedResolver(
      async (_, { photoId, payload }, { loggedInUser }) => {
        const photo = await client.photo.findUnique({
          where: {
            id: photoId,
          },
        });
        if (!photo) {
          return {
            ok: false,
            error: "Photo not found.",
          };
        }

        const newComment = await client.comment.create({
          data: {
            payload,
            photo: {
              connect: {
                id: photoId,
              },
            },
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
          },
        });

        // notification 생성
        if (photo.userId !== loggedInUser.id) {
          await client.notification.create({
            data: {
              comment: {
                connect: {
                  id: newComment.id,
                },
              },
              photo: {
                connect: {
                  id: photoId,
                },
              },
              user: {
                connect: {
                  id: photo.userId,
                },
              },
              sendUser: {
                connect: {
                  id: loggedInUser.id,
                },
              },
              notificationType: "comment",
            },
          });
        }

        return {
          ok: true,
          id: newComment.id,
        };
      }
    ),
  },
};
