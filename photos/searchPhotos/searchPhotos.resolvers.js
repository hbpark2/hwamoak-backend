import client from "../../client";

export default {
  Query: {
    searchPhotos: async (_, { keyword, lastId }) => {
      console.log(lastId);
      if (keyword.length < 2) {
        return {
          ok: false,
          error: "2글자 이상 입력하세요.",
        };
      }

      const photos = await client.photo.findMany({
        where: {
          caption: {
            contains: keyword,
          },
        },
        take: 5,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      });

      const count = await client.photo.count({
        where: {
          caption: {
            contains: keyword,
          },
        },
      });

      return {
        ok: true,
        photos: photos,
        count: count,
      };
    },
  },
};
