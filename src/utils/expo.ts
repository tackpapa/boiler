import { Expo, ExpoPushMessage } from 'expo-server-sdk';
import db from 'db';
import { UserDocument } from 'models/users';

const expo = new Expo();

const push = async (
  tos: UserDocument[],
  body: string,
  post?: string,
  PostModel?: string,
  type?: string
) => {
  const item = await db.notis.create({
    from: undefined,
    target: tos.map((to) => `${to._id}`),
    isNotice: false,
    isRead: false,
    type: type,
    title: undefined,
    text: body,
    url: undefined,
    post: post,
    PostModel: PostModel,
  });

  tos.forEach(async (to) => {
    const author: any = await db.users.findOne({ _id: to._id });
    await author.Noti.push(item?._id);
    author?.save();
  });

  const messages: ExpoPushMessage[] = tos
    .map((to) => to.expotoken)
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
        console.log(ticketChunk);
      } catch (error) {
        console.error(error);
      }
    }
  })();
};

export default push;
