import * as bcrypt from 'bcrypt';
import { Resolver } from '../../type';

const createAccountFn:Resolver = async (
  _,
  { firstName, lastName, username, email, password }
  , { client }
) => {
  try {
    // check if usernam or email are already on DB
    const existingUser:any = await client.user.findFirst({
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
    console.log(existingUser)

    // existingUser 가 있을 때  error
    if (existingUser) {
      throw new Error('This username/password is already taken.');
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
        password: uglyPassword,
      },
    });
  } catch (e) {
    return e;
  }
}


const resolvers = {
  Mutation: {
    createAccount: createAccountFn
  }
}

export default resolvers
