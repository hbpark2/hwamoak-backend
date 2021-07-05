import client from "../../client";
import { uploadToS3 } from "../../shared/shared.utils";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    uploadFile: protectedResolver(async (_, { images }, { loggedInUser }) => {
      console.log(images);

      let fileUrl;
      let plantImageData;
      for (let i = 0; i < images.length; i++) {
        fileUrl = await uploadToS3(images[i], loggedInUser.id, "plants");
        plantImageData = await client.plantsImage.create({
          data: {
            file: fileUrl,
          },
        });
      }

      return {
        ok: true,
        file: fileUrl,
        id: plantImageData.id,
      };
    }),
  },
};
