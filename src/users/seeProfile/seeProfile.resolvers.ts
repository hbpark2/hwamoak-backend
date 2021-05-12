import { Resolvers } from "../../type";

const resolvers:Resolvers = {
  Query: {
    seeProfile: (_, { username },{ client }) =>
    client.user.findUnique({
      where: { username },
    }),
  },
};
export default resolvers
