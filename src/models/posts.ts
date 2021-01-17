import mongoose, {
    Schema,
  } from 'mongoose';
import { isConstructSignatureDeclaration } from 'typescript';
  
  const PostSchema: Schema = new mongoose.Schema({
    author:{
      type: mongoose.Schema.Types,Object,
      ref:"Users"
    },
    context:String,
  }, {
    timestamps: true,
  });
  
  const model = mongoose.model('Posts', PostSchema);
  
  export default model;