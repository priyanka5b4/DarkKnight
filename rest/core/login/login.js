const User = require('../../modules/User/user.model');
const middleware = require('../middleware/verifyUser');

// eslint-disable-next-line consistent-return
exports.apiLogin = async (req, res) => {
  console.log('Chex');
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(500)
        .json({ status: false, message: 'Email not registered, please register' });
    }
    if (user.validPassword(password)) {
      // Needed in generateToken
      const token = middleware.generateToken(user);
      res.status(200).json({ status: true, token, message: 'Login Successful' });
    } else {
      res.status(500).json({ status: false, message: 'Invalid Credentials' });
    }
  } catch (error) {
    console.log('error', error);
    res.status(500).json({ status: false, message: 'Internal Server Error' });
  }
};

exports.apiSignUp = (req, res) => {
  console.log('Check');
  const details = req.body;
  const user = new User(details);
  user.password = user.generateHash(user.password);
  user.save((err) => {
    if (err) {
      console.log('Error while Signing up: ', err);
      res.status(500).json({ status: false, message: 'Internal Server Error' });
    } else {
      res.status(200).json({ status: true, message: 'Account Created Successfully' });
    }
  });
};
