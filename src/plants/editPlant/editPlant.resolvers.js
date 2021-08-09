import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { processHashtags } from "../plants.utils";
import { uploadToS3 } from "../../shared/shared.utils";

export default {
  Mutation: {
    editPlant: protectedResolver(
      async (
        _,
        {
          id,
          images,
          title,
          caption,
          water,
          sunlight,
          temperatureMax,
          temperatureMin,
          plantDivision,
          plantClass,
          plantOrder,
          plantFamily,
          plantGenus,
          plantSpecies,
          plantHome,
          plantHabitat,
        },
        { loggedInUser }
      ) => {
        const oldPlant = await client.plants.findFirst({
          where: {
            id,
            // userId: loggedInUser.id,
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
            error: "Not Authorized",
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
            await client.plantsImage.create({
              data: {
                file: images[i],
                plantsId: id,
              },
            });
          }
        }

        await client.plants.update({
          where: { id },
          data: {
            title,
            caption,
            water,
            sunlight,
            temperatureMax,
            temperatureMin,
            plantDivision,
            plantClass,
            plantOrder,
            plantFamily,
            plantGenus,
            plantSpecies,
            plantHome,
            plantHabitat,
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
