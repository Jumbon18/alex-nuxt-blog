const {Schema,model} = require('mongoose');

const postSchema = new Schema({
title:{
  required:true,
  type:String
},
  text:{
  type:String,
    required:true
  },
  date:{
  type:Date,
    default:Date.now
  },
  views:{
  type:Number,
    default: 0
  },
  imageUrl:{
  type:String
  },
  comments:[
    {
      type:Schema.Types.ObjectId,
      ref:'comments'
    }
  ]

});


module.exports = model('posts',postSchema);
