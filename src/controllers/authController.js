const User = require('../models/User');

const registerUser = async (req, res) => {
    try {
    const data = req.body;

    // Create a new User document using the mongoose model
    const newUser = new User(data);

    // Save the newUser in database
    const response = await newUser.save();
    console.log('data saved');
    
    res.status(200).json({response});
  } catch (err) {
    console.log(err);
    res.status(500).json({error: 'Internal server error'});
  }
}

module.exports = registerUser;