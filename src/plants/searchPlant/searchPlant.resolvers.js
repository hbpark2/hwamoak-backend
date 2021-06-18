import client from "../../client";

export default {
  Query: {
    searchPlant: async (_, { keyword, lastId }) => {
      console.log(keyword);

      if (keyword.length < 2) {
        return {
          ok: false,
          error: "2글자 이상 입력하세요.",
        };
      }
      const plants = await client.plants.findMany({
        where: {
          caption: {
            contains: keyword,
          },
        },
        take: 5,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      });

      const count = await client.plants.count({
        where: {
          caption: {
            contains: keyword,
          },
        },
      });

      return {
        ok: true,
        plants: plants,
        count: count,
      };
    },
  },
};
