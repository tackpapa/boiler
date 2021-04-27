import mongoose from 'mongoose';
import users from './models/users';
import posts from './models/posts';
import comments from './models/comments';
import markets from './models/markets';
import banners from './models/banners';
import sessions from './models/sessions';
import jobs from './models/jobs';
import chats from './models/chats';
import categorys from './models/categorys';
import searches from './models/searches';
import notis from './models/notis';
import fs from 'fs';
import path from 'path';

mongoose.set('useCreateIndex', true);

mongoose.connect(process.env.MONGO_URL!, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
// mongoose
//   .connect(process.env.MONGO_URL!, {
//     useNewUrlParser: true,
//     ssl: true,
//     sslValidate: false,
//     sslCA: fs.readFileSync(
//       path.resolve(__dirname, '..', 'rds-combined-ca-bundle.pem')
//     ) as any,
//   })
//   .then(() => console.log('Connection to DB successful'))
//   .catch((err) => console.error(err, 'Error'));

const db = mongoose.connection;

const handleOpen = () =>
  console.log('♥️♥️♥️♥️♥️  connected to db', process.env.MONGO_URL);

db.once('open', handleOpen);
db.on('error', (error) => console.log(`error on db connection${error}`));

export default {
  users,
  comments,
  notis,
  posts,
  markets,
  sessions,
  chats,
  banners,
  jobs,
  categorys,
  searches,
};
