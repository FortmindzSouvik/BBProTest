const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');
const chatSchema = mongoose.Schema(
  {
    sender_id: {type: mongoose.Schema.Types.ObjectId, required: true, ref:'User' },
    reciver_id:{type: mongoose.Schema.Types.ObjectId, required: true, ref:'User' },
    is_read: {
        type: Boolean,
        default:false
      },
      chat_content: {
        type: String,
        default:""
      },
      chat_files:{
         type: String,
        default:""
      },
      chatType:{
        type: String,
        enum: ['text',"file"],
       default:"text"
     }
    
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
chatSchema.plugin(toJSON);
chatSchema.plugin(paginate);


const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;
