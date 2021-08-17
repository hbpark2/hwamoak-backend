import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    seeFeed: protectedResolver(async (_, { offset }, { loggedInUser }) => {
      // console.log(offset);
      return client.photo.findMany({
        take: 3,
        skip: offset,
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
        orderBy: {
          createdAt: "desc",
        },
      });
    }),
  },
};
