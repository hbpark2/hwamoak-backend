import client from "../client";
import { protectedResolver } from "../users/users.utils";

export default {
  Photo: {
    user: ({ userId }) => client.user.findUnique({ where: { id: userId } }),
    hashtags: ({ id }) =>
      client.hashtag.findMany({
        where: {
          photos: {
            some: {
              id,
            },
          },
        },
      }),
    images: ({ id }) =>
      client.photoImage.findMany({
        where: {
          photoId: id,
        },
      }),
    likes: ({ id }) => client.like.count({ where: { photoId: id } }),
    commentNumber: ({ id }) => client.comment.count({ where: { photoId: id } }),
    comments: ({ id }) =>
      client.comment.findMany({
        where: { photoId: id },
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
          photoId_userId: {
            photoId: id,
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
    photos: ({ id }, { lastId }) => {
      return client.photo.findMany({
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
    totalPhotos: ({ id }) =>
      client.photo.count({
        where: {
          hashtags: {
            some: { id },
          },
        },
      }),
  },
};
