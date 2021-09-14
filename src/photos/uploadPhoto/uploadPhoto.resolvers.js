import client from "../../client";
import { uploadToS3 } from "../../shared/shared.utils";
import { protectedResolver } from "../../users/users.utils";
import { processHashtags } from "../photos.utils";

// export default {
//   Mutation: {
//     uploadPhoto: protectedResolver(
//       async (_, { file, caption }, { loggedInUser, headers }) => {
//         let hashtagObj = [];
//         /// parse caption
//         if (caption) {
//           hashtagObj = processHashtags(caption);
//         }
//         // console.log("headers : ", headers["content-length"]);
//         const fileUrl = await uploadToS3(file, loggedInUser.id, "uploads");
//         // const fileUrl = await UploadToAzure(
//         //   file,
//         //   loggedInUser.id,
//         //   "uploads",
//         //   headers
//         // );

//         // get or create Hashtags
//         return client.photo.create({
//           data: {
//             file: fileUrl,
//             caption,
//             user: {
//               connect: {
//                 id: loggedInUser.id,
//               },
//             },
//             ...(hashtagObj.length > 0 && {
//               hashtags: {
//                 connectOrCreate: hashtagObj,
//               },
//             }),
//           },
//         });

//         // save the photo WITH the parsed hashtags
//         // add the photo to the hashtags
//       }
//     ),
//   },
// };

export default {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { images, caption }, { loggedInUser }) => {
        let hashtagObj = [];
        if (caption) {
          hashtagObj = processHashtags(caption);
        }

        const photoData = await client.photo.create({
          data: {
            caption,
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

        let fileUrl;
        let photoImageData;
        for (let i = 0; i < images.length; i++) {
          fileUrl = await uploadToS3(images[i], loggedInUser.id, "plants");
          photoImageData = await client.photoImage.create({
            data: {
              file: fileUrl,
              photoId: photoData.id,
            },
          });
        }

        // for (let i = 0; i < images.length; i++) {
        //   await client.photoImage.create({
        //     data: {
        //       file: images[i],
        //       photoId: photoData.id,
        //     },
        //   });
        // }

        return photoData;
      }
    ),
  },
};
