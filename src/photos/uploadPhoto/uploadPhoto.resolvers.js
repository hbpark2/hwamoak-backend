import client from "../../client";
import { UploadToAzure, uploadToS3 } from "../../shared/shared.utils";
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
      async (_, { file, caption }, { loggedInUser }) => {
        let hashtagObj = [];
        if (caption) {
          hashtagObj = processHashtags(caption);
        }
        const fileUrl = await uploadToS3(file, loggedInUser.id, "uploads");
        return client.photo.create({
          data: {
            file: fileUrl,
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
      }
    ),
  },
};