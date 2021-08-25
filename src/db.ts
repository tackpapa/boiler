import mongoose from 'mongoose';
import users from './models/users';
import posts from './models/posts';
import comments from './models/comments';
import questions from './models/questions';
import banners from './models/banners';
import sessions from './models/sessions';
import tips from './models/tips';
import categorys from './models/categorys';
import searches from './models/searches';
import notis from './models/notis';

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
  notis,
  posts,
  questions,
  sessions,
  banners,
  tips,
  categorys,
  searches,
};
