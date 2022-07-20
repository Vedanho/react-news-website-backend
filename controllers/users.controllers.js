const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.userControllers = {
  createUser: async (req, res) => {
    try {
      const { login, password, role } = req.body;

      const hash = await bcrypt.hash(
        password,
        Number(process.env.BCRYPT_ROUNDS)
      );

      const newUser = await User.create({
        login: login,
        password: hash,
        role: role,
      });
      const data = await res.json(newUser);

      return data;
    } catch (error) {
      return res
        .status(401)
        .json({ error: "Такой пользователь зарегистрирован" });
    }
  },

  getUsers: async (req, res) => {
    try {
      const users = await User.find();
      return res.json(users);
    } catch (error) {
      return res.status(401).json(error.message);
    }
  },

  updateUser: async (req, res) => {
    try {
      const uptadedUser = await User.findByIdAndUpdate(req.params.id, {
        login: req.body.login,
      });
      const newUser = await User.findById(req.params.id);
      return res.json(newUser);
    } catch (error) {
      return res.status(401).json(error.message);
    }
  },

  deleteUser: async (req, res) => {
    try {
      await User.findByIdAndRemove(req.params.id);
      return res.json("Пользователь удалён");
    } catch (error) {
      return res.status(401).json(error.message);
    }
  },

  login: async (req, res) => {
    try {
      const { login, password } = req.body;

      const candidate = await User.findOne({ login: login });

      if (!candidate) {
        return res.status(401).json({ error: "Неверный логин" });
      }

      const valid = await bcrypt.compare(password, candidate.password);

      if (!valid) {
        return res.status(401).json({ error: "Неверный пароль" });
      }

      const payload = {
        id: candidate._id,
        login: candidate.login,
        role: candidate.role,
      };

      const token = await jwt.sign(payload, process.env.SECRET_JWT_KEY, {
        expiresIn: "48h",
      });

      return res.json({ userId: payload.id, role: candidate.role, token });
    } catch (error) {
      return res.status(401).json(error.message);
    }
  },
};
