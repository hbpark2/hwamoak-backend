import client from "../../client";
import { uploadToS3 } from "../../shared/shared.utils";
import { protectedResolver } from "../../users/users.utils";
import { processHashtags } from "../plants.utils";

export default {
  Mutation: {
    uploadPlants: protectedResolver(
      async (
        _,
        { images, title, caption, sunlight, temperature, water },
        { loggedInUser }
      ) => {
        console.log(images);
        let hashtagObj = [];
        /// parse caption
        if (caption) {
          hashtagObj = processHashtags(caption);
        }

        const plantsData = await client.plants.create({
          data: {
            title,
            caption,
            sunlight,
            temperature,
            water,
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            ...(hashtagObj.length > 0 && {
              hashtags: {
                connectOrCreate: hashtagObj,
              },
            }),
          },
        });

        for (let i = 0; i < images.length; i++) {
          const fileUrl = await uploadToS3(
            images[i],
            loggedInUser.id,
            "plants"
          );
          await client.plantsImage.create({
            data: {
              file: fileUrl,
              plantsId: plantsData.id,
            },
          });
        }

        console.log(plantsData);
        return plantsData;
      }
    ),
  },
};
