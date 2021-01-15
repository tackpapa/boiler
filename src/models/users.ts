import mongoose, {
    Schema,
  } from 'mongoose';
  
  const UserSchema: Schema = new mongoose.Schema({
    email: String,
    password: String,
  }, {
    timestamps: true,
  });
  
  const model = mongoose.model('Users', UserSchema);
  
  export default model;