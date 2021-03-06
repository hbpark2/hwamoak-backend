import client from "../../client";
import { NEW_MESSAGE } from "../../constants";
import pubsub from "../../pubsub";
import { protectedResolver } from "../../users/users.utils";

// export default {
//   Mutation: {
//     sendMessage: protectedResolver(
//       async (_, { payload, roomId, userId }, { loggedInUser }) => {
//         //if문으로 문자보낼수 있는 권한 설정 가능

//         let room = null;
//         if (userId) {
//           const user = await client.user.findUnique({
//             where: { id: userId },
//             select: { id: true },
//           });
//           if (!user) {
//             return {
//               ok: false,
//               error: "User dose not exist.",
//             };
//           }
//           ///////////////////////////////////////////////
//           // 룸 있으면 생성 x
//           const existRoom = await client.room.findFirst({
//             where: {
//               users: {
//                 some: {
//                   id: userId,
//                 },
//               },
//             },
//             select: {
//               id: true,
//             },
//           });
//           if (existRoom) {
//             return {
//               ok: false,
//               error: "The Room already exist!",
//             };
//           }
//           // 룸 있으면 생성 x
//           ///////////////////////////////////////////////
//           room = await client.room.create({
//             data: {
//               users: {
//                 connect: [
//                   {
//                     id: userId,
//                   },
//                   {
//                     id: loggedInUser.id,
//                   },
//                 ],
//               },
//             },
//           });
//         } else if (roomId) {
//           room = await client.room.findUnique({
//             where: { id: roomId },
//             select: { id: true },
//           });
//           if (!room) {
//             return {
//               ok: false,
//               error: "Room not found.",
//             };
//           }
//         }
//         const message = await client.message.create({
//           data: {
//             payload,
//             room: { connect: { id: room.id } },
//             user: {
//               connect: { id: loggedInUser.id },
//             },
//           },
//         });
//         pubsub.publish(NEW_MESSAGE, { roomUpdates: { ...message } });
//         return {
//           ok: true,
//         };
//       }
//     ),
//   },
// };

export default {
  Mutation: {
    sendMessage: protectedResolver(
      async (_, { payload, roomId, userId }, { loggedInUser }) => {
        let room = null;

        if (userId) {
          const user = await client.user.findUnique({
            where: {
              id: userId,
            },
            select: {
              id: true,
            },
          });

          if (!user) {
            return {
              ok: false,
              error: "This user does not exist.",
            };
          }

          room = await client.room.create({
            data: {
              users: {
                connect: [
                  {
                    id: userId,
                  },
                  {
                    id: loggedInUser.id,
                  },
                ],
              },
            },
          });
        } else if (roomId) {
          room = await client.room.findUnique({
            where: {
              id: roomId,
            },
            select: {
              id: true,
            },
          });
          if (!room) {
            return {
              ok: false,
              error: "Room not found.",
            };
          }
        }
        const message = await client.message.create({
          data: {
            payload,
            room: {
              connect: {
                id: room.id,
              },
            },
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
          },
        });
        // console.log(message);
        pubsub.publish(NEW_MESSAGE, { roomUpdates: { ...message } });
        return {
          ok: true,
          id: message.id,
        };
      }
    ),
  },
};
