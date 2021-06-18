import client from "../../client";

export default {
  Query: {
    seePlant: (_, { id }) =>
      client.plants.findUnique({
        where: { id },
      }),
  },
};
