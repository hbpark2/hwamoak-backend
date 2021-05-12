import client from "../../client";
import * as bcrypt from 'bcrypt';
import { protectedResolver } from "../users.utils";
import { Resolver, Resolvers } from "../../type";

const resolverFn:Resolver = async (
  _,
  { firstName, lastName, username, email, password: newPassword },
  { loggedInUser }
) => {
  let uglyPassword = null;
  if (newPassword) {
    uglyPassword = await bcrypt.hash(newPassword, 10);
  }
  const updatedUser = await client.user.update({
    where: {
      id: loggedInUser.id,
    },
    data: {
      firstName,
      lastName,
      username,
      email,
      ...(uglyPassword && { password: uglyPassword }),
    },
  });
  if (updatedUser.id) {
    return {
      ok: true,
    };
  } else {
    return {
      ok: false,
      error: "Could not update profile.",
    };
  }
};

const resolvers:Resolvers = {
  Mutation: {
    editProfile: protectedResolver(resolverFn),
  },
};

export default resolvers
