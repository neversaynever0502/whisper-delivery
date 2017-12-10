import mongoose from 'mongoose';
import shortid from 'shortid';
import uuidv4 from 'uuid/v4';


const letterSchema = new mongoose.Schema({
    _id: {
      type: String,
      default: shortid.generate,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    read: {
      type: Number,
      required: true,
    },
    passport: {
      type: String,
      default: uuidv4(),
    },
    fromName:{
      type: String,
      required: true,
    },
    toName:{
      type: String,
      required: true,
    }
  }, {
      timestamps: true,
  });


export default mongoose.model('Letter',letterSchema);