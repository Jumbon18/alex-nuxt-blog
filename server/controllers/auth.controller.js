const User = require('../db/models/user.model');
const bcrypt = require('bcrypt-nodejs');
const keys = require('../keys');
const jwt = require('jsonwebtoken');

module.exports.login = async (req, res) => {
  const candidate = await User.findOne({login: req.body.login});
  if (candidate) {
    const isPasswordCorrect = bcrypt.compareSync(req.body.password,candidate.password);
    if(isPasswordCorrect){
      const token = jwt.sign({
        login:candidate.login,
        userId:candidate._id
      },keys.JWT,{expiresIn: 60*60*60});
      res.status(200).json({token});
    }
    else{
    res.status(401).json({message:'Пароль неверен'})
    }

  } else {
    res.status(404).json({message: ' Пользователь не найден'})
  }
};
module.exports.createUser = async (req, res) => {
  try {
    const candidate = await User.findOne({login: req.body.login});
    if (candidate) {
      res.status(409).json({message: 'Так логин уже занят'});
    }
    const salt = bcrypt.genSaltSync(10);
    const user = new User({
      login: req.body.login,
      password: bcrypt.hashSync(req.body.password, salt)
    });
    await user.save();
    res.status(201).json(user);
  }
  catch (e) {
    res.status(401).json(e);
    console.log(e);
  }
};
