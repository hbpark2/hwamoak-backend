import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { processHashtags } from "../plants.utils";
import { uploadToS3 } from "../../shared/shared.utils";

export default {
  Mutation: {
    editPlant: protectedResolver(
      async (_, { id, images, title, caption }, { loggedInUser }) => {
        const oldPlant = await client.plants.findFirst({
          where: {
            id,
            userId: loggedInUser.id,
          },
          include: {
            hashtags: {
              select: {
                hashtag: true,
              },
            },
          },
        });
        if (!oldPlant) {
          return {
            ok: false,
            error: "User not found.",
          };
        }

        // UPDATE PLANTIMAGES
        if (images) {
          // 1. delete original plantsImage
          await client.plantsImage.deleteMany({
            where: {
              plants: {
                id,
              },
            },
          });

          // 2. update new plantsImage
          for (let i = 0; i < images.length; i++) {
            const fileUrl = await uploadToS3(
              images[i],
              loggedInUser.id,
              "plants"
            );
            await client.plantsImage.create({
              data: {
                file: fileUrl,
                plantsId: id,
              },
            });
          }
        }

        await client.plants.update({
          where: { id },
          data: {
            caption,
            hashtags: {
              disconnect: oldPlant.hashtags,
              connectOrCreate: processHashtags(caption),
            },
          },
        });

        return {
          ok: true,
        };
      }
    ),
  },
};