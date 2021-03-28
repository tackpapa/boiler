import { Expo, ExpoPushMessage } from 'expo-server-sdk';
import db from 'db';

const expo = new Expo();
const push = async (
  tos: any,
  body: string,
  post?: string,
  PostModel?: string,
  type?: string
) => {
  const item = await db.notis.create({
    from: undefined,
    target: tos._id,
    isNotice: false,
    isRead: false,
    type: type,
    title: undefined,
    text: body,
    url: undefined,
    post: post,
    PostModel: PostModel,
  });
  const author: any = await db.users.findOne({ _id: tos._id });
  await author.Noti.push(item?._id);
  author?.save();
  const messages: ExpoPushMessage[] = [tos?.expotoken]
    .filter((to) => Expo.isExpoPushToken(to))
    .map((to) => ({
      to,
      sound: 'default',
      body,
    }));
  let chunks = expo.chunkPushNotifications(messages);
  (async () => {
    for (let chunk of chunks) {
      try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        // console.log(ticketChunk);
      } catch (error) {
        // console.error(error);
      }
    }
  })();
};

export default push;
