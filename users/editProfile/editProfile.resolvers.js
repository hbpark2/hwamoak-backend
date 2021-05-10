export default {
  Mutation: {
    editProfile: (_, { username, firstName, lastName, email, password }) => {
      console.log(username, firstName, lastName, email, password);
    },
  },
};
