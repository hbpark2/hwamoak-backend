import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Query: {
    me: protectedResolver(
      async (_, __, { loggedInUser }) =>
        await client.user.findUnique({
          where: {
            id: loggedInUser.id,
          },
        })
    ),
  },
};
