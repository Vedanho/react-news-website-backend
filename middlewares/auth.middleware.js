const jwt = require("jsonwebtoken");
require('dotenv').config()

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  
  const [type, token] = authorization.split(" ");

  if (token === "null") {
    return res.status(401).json({error: "Вы не авторизированы"});
  }

  if (type !== "Bearer") {
    return res.status(401).json({error: "Неверный тип токена"});
  }
  try {
    req.user = await jwt.verify(token, process.env.SECRET_JWT_KEY);
    next();
  } catch (error) {
    return res.status(401).json({ error: "CATCH" + " " + error.message});
  }
};
