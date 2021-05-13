import client from "../../client";

export default {
  Query: {
    seeProfile: (_, { username }) =>
      client.user.findUnique({
        where: { username },
        include: {
          followers: true,
          followers: true,
        },
      }),
  },
};
