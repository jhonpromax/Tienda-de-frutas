const userService = require('../services/user.service');

exports.register = async (req, res) => {
  try {
    const user = await userService.register(req.body);
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await userService.login(email, password);
    res.status(200).json(data);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
