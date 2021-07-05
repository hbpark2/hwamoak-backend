import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deletePlantImage: protectedResolver(async (_, { id }) => {
      const plants = await client.plantsImage.findFirst({
        where: {
          id,
        },
      });

      if (!plants) {
        return {
          ok: false,
          error: "Plant doesn't Exist",
        };
      }

      await client.plantsImage.deleteMany({
        where: {
          id,
        },
      });

      return {
        ok: true,
      };
    }),
  },
};
