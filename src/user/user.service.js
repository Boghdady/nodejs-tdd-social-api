const bcrypt = require('bcrypt');
const UserModel = require('./user.model');

exports.createUser = async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 10);
  const user = { ...req.body, password: hash };

  await UserModel.create(user);
  return res.status(201).send({ message: 'User Created successfully' });
};
