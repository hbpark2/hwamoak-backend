import client from "../../client";

export default {
  Query: {
    seeHashtag: async (_, { hashtag }) => {
      return client.hashtag.findUnique({
        where: {
          hashtag,
        },
      });
    },
  },
};
