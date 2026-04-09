const { generateToken } = require('../../jwt');
const User = require('../models/User');

const registerUser = async (req, res) => {
    try {
    const data = req.body;

    // Create a new User document using the mongoose model
    const newUser = new User(data);

    // Save the newUser in database
    const response = await newUser.save();
    console.log('data saved');

    const payload = {
      id: response.id
    }
    const token = generateToken(payload);
    res.status(200).json({token: token});
  } catch (err) {
    console.log(err);
    res.status(500).json({error: 'Internal server error'});
  }
}

const loginUser = async (req, res) => {
  try{
    const {username, password} = req.body;

    const user = await User.findOne({username: username});

    if(!user || !(await user.comparePassword(password))){
      return res.status(401).json({error: 'Invalid username or password'});
    }

    const payload = {
      id: user.id
    }

    const token = generateToken(payload);

    res.status(200).json({token: token});
  }catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
}

module.exports = {registerUser, loginUser};