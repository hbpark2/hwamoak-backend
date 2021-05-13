import client from "../../client";

export default {
  Query: {
    searchUsers: async (_, { keyword, lastId }) => {
      if (keyword.length < 2) {
        return {
          ok: false,
          error: "2글자 이상 입력하세요.",
        };
      }
      const searchedUser = await client.user.findMany({
        where: {
          username: {
            startsWith: keyword.toLowerCase(),
          },
        },
        take: 5,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      });
      return {
        ok: true,
        searchedUser: searchedUser,
      };
    },
  },
};
