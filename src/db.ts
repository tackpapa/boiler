import mongoose from 'mongoose';
import users from 'models/users';


mongoose.connect(
    process.env.MONGO_URL!,
    {
        useNewUrlParser: true,
        useFindAndModify: false,

    }
)

const db = mongoose.connection;

const handleOpen = () => console.log('connected to db');

db.once('open', handleOpen);
db.on("error", error => console.log(`error on db connection${error}`));

export default {users }