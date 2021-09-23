import client from "../../client";
import bcrypt from "bcrypt";
import { protectedResolver } from "../users.utils";
import { createWriteStream } from "fs";
import { uploadToS3 } from "../../shared/shared.utils";

const resolverFn = async (
  _,
  { firstName, lastName, username, email, password: newPassword, bio, avatar },
  { loggedInUser }
) => {
  let avatarUrl = null;
  if (avatar) {
    avatarUrl = await uploadToS3(avatar, loggedInUser.id, "avatars");

    // //avatar에서 filename, createReadStream 호출
    // const { filename, createReadStream } = await avatar;
    // console.log(filename);
    // // unique한 이름 생성
    // const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
    // //파일 가져오기 createReadStream()
    // const readStream = createReadStream();
    // //보내줄 경로 정의
    // const writeStream = createWriteStream(
    //   process.cwd() + "/uploads/" + newFilename
    // );
    // //파일을 지정해둔 경로로 연결
    // readStream.pipe(writeStream);
    // avatarUrl = `http://localhost:4000/static/${newFilename}`;
  }

  let uglyPassword = null;
  if (newPassword) {
    uglyPassword = await bcrypt.hash(newPassword, 10);
  }

  const existingUsername = await client.user.findFirst({
    where: {
      OR: [
        {
          username,
        },
      ],
    },
  });

  if (existingUsername) {
    if (existingUsername.id !== loggedInUser.id)
      return {
        ok: false,
        error: "동일한 아이디가 존재합니다.",
      };
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
      bio,
      ...(uglyPassword && { password: uglyPassword }),
      ...(avatarUrl && { avatar: avatarUrl }),
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

export default {
  Mutation: {
    editProfile: protectedResolver(resolverFn),
  },
};
