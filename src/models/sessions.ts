import mongoose, { Schema, Document, Model } from 'mongoose';

export interface Session {
  connectionId: string;
  userId: string;
}

export interface SessionDocument extends Session, Document {
  //method를 넣는다
}
export interface SessionModel extends Model<SessionDocument> {}

const SessionSchema: Schema<SessionDocument> = new mongoose.Schema({
  connectionId: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  },
});

const model =
  mongoose.models.Sessions ||
  mongoose.model<SessionDocument, SessionModel>('Sessions', SessionSchema);

export default model;
