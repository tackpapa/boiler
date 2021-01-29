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

mongoose.set('useCreateIndex', true);

mongoose.connect(process.env.MONGO_URL!, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const db = mongoose.connection;

const handleOpen = () =>
  console.log('♥️♥️♥️♥️♥️  connected to db', process.env.MONGO_URL);

db.once('open', handleOpen);
db.on('error', (error) => console.log(`error on db connection${error}`));

export default {
  users,
  comments,
  posts,
  markets,
  sessions,
  chats,
  banners,
  jobs,
  categorys,
};
