import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    seePhotoLikes: async (_, { id }) => {
      const likes = await client.like.findMany({
        where: {
          photoId: id,
        },
        select: {
          user: true,
        },
      });
      console.log(likes);
      return likes.map((like) => like.user);
    },
  },
};

// include는 결과에 relationship을 추가해주고,
// select는 받고싶은 data를 선택하는 것
// 동시에 사용할 수없다.
