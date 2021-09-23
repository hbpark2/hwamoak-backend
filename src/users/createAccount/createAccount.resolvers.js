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
        const existingEmail = await client.user.findFirst({
          where: {
            OR: [
              {
                email,
              },
            ],
          },
        });
        const existingUsername = await client.user.findFirst({
          where: {
            OR: [
              {
                username,
              },
            ],
          },
        });

        // existingUser 가 있을 때  error
        if (existingEmail) {
          // throw new Error("This username/password is already taken.");
          return {
            ok: false,
            error: "동일한 이메일이 존재합니다.",
          };
        }

        if (existingUsername) {
          return {
            ok: false,
            error: "동일한 아이디가 존재합니다.",
          };
        }
        // hash password
        const uglyPassword = await bcrypt.hash(password, 10);

        // save and return  the user
        await client.user.create({
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
        return {
          ok: true,
        };
      } catch (e) {
        // console.log(e);
        return {
          ok: false,
          error: "Can't create account.",
        };
      }
    },
  },
};
