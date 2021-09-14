import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    seeFeed: protectedResolver(
      async (_, { offset, username }, { loggedInUser }) => {
        // console.log(offset);
        let photos;
        if (username) {
          photos = await client.photo.findMany({
            take: 2,
            skip: offset || 0,
            where: {
              user: { username },
            },
            include: {
              images: true,
            },
            orderBy: {
              createdAt: "desc",
            },
          });
        } else {
          photos = await client.photo.findMany({
            take: 3,
            skip: offset || 0,
            include: {
              images: true,
            },
            orderBy: {
              createdAt: "desc",
            },
          });
        }

        return photos;
      }
    ),
  },
};

// where: {
//   OR: [
//     {
//       user: {
//         followers: {
//           some: {
//             id: loggedInUser.id,
//           },
//         },
//       },
//     },
//     {
//       userId: loggedInUser.id,
//     },
//   ],
// },
