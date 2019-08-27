const express = require('express');
const bodyParser = require('body-parser');
const keys = require('./keys');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth.routes');
const postRouter =  require('./routes/post.routes');
const commentRouter = require('./routes/comment.routes');
const passport = require('passport');
const passportStrategy = require('./middleware/passport-strategy');
const app = express();

mongoose.connect(keys.MONGO_URI,{useNewUrlParser:true})
  .then(()=> console.log('MongoDb connected'))
  .catch(e =>console.log(e));
app.use(passport.initialize());
passport.use(passportStrategy);

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/api/auth',authRoutes);
app.use('/api/post',postRouter);
app.use('/api/comment',commentRouter);

module.exports = app;
