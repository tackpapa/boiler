import mongoose from 'mongoose';
import users from './models/users';
import posts from './models/posts';
import comments from './models/comments';
import markets from './models/markets';
import banners from './models/banners';
import sessions from './models/sessions';
mongoose.set('useCreateIndex', true);

mongoose.connect(process.env.MONGO_URL!, {
  useNewUrlParser: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

const handleOpen = () => console.log('connected to db', process.env.MONGO_URL);

db.once('open', handleOpen);
db.on('error', (error) => console.log(`error on db connection${error}`));

export default { db, users, comments, posts, markets, sessions, banners };
