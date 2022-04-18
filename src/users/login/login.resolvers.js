import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import client from "../../client";

export default {
	Mutation: {
		login: async (_, { email, password }) => {
			console.log(email);
			// find user with args.username
			const user = await client.user.findFirst({ where: { email } });
			if (!user) {
				return {
					ok: false,
					error: "일치하는 가입정보가 없습니다.",
				};
			}

			// check password with args.password
			const passwordOk = await bcrypt.compare(password, user.password);
			if (!passwordOk) {
				return {
					ok: false,
					error: "비밀번호가 일치하지 않습니다.",
				};
			}

			// issue a token and send it to the user
			const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY);
			return {
				ok: true,
				token: token,
			};
		},
	},
};
