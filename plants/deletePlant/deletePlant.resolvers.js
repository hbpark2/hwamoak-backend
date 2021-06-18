import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deletePlant: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const plants = await client.plants.findFirst({
        where: {
          id,
          userId: loggedInUser.id,
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
          plantsId: id,
        },
      });

      await client.plants.delete({
        where: { id },
      });
      return {
        ok: true,
      };
    }),
  },
};
