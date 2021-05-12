import bcrypt from "bcrypt";
import client from "../../client";

export default {
  Mutation: {
    createAccount: async (
      _,
      { id, firstName, lastName, username, email, password, bio, avatar }
    ) => {
      try {
        // check if usernam or email are already on DB
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                username,
              },
              {
                email,
              },
            ],
          },
        });

        // existingUser 가 있을 때  error
        if (existingUser) {
          throw new Error("This username/password is already taken.");
        }

        // hash password
        const uglyPassword = await bcrypt.hash(password, 10);

        // save and return  the user
        return client.user.create({
          data: {
            username,
            email,
            firstName,
            lastName,
            bio,
            avatar,
            password: uglyPassword,
          },
        });
      } catch (e) {
        return e;
      }
    },
  },
};
