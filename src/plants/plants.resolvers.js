import client from "../client";
import { protectedResolver } from "../users/users.utils";

export default {
  Plants: {
    user: ({ userId }) => client.user.findUnique({ where: { id: userId } }),
    hashtags: ({ id }) =>
      client.hashtag.findMany({
        where: {
          plants: {
            some: {
              id,
            },
          },
        },
      }),
    images: ({ id }) =>
      client.plantsImage.findMany({
        where: {
          plantsId: id,
        },
      }),
    plantLikes: ({ id }) => client.plantLike.count({ where: { plantsId: id } }),
    commentNumber: ({ id }) =>
      client.comment.count({ where: { plantsId: id } }),
    comments: ({ id }) =>
      client.comment.findMany({
        where: { plantsId: id },
        include: { user: true },
      }),
    isMine: ({ userId }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return userId === loggedInUser?.id;
    },
    isLiked: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      const ok = await client.like.findUnique({
        where: {
          plantsId_userId: {
            plantsId: id,
            userId: loggedInUser.id,
          },
        },
        select: {
          id: true,
        },
      });
      if (ok) {
        return true;
      }
      return false;
    },
  },

  Hashtag: {
    plants: ({ id }, { lastId }) => {
      return client.plants.findMany({
        where: {
          hashtags: {
            some: { id },
          },
        },
        // take: 5,
        // skip: (page - 1) * 5,
        take: 5,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      });
    },
    totalPlants: ({ id }) =>
      client.plants.count({
        where: {
          hashtags: {
            some: { id },
          },
        },
      }),
  },
};
