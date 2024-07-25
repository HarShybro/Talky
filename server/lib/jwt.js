const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const generateToken = (data) => {
  const token = jwt.sign(
    {
      _id: data._id,
      email: data.email,
      name: data.name,
    },
    secret
  );

  return token;
};

const verifyToken = (token) => {
  if (!token) {
    return null;
  }
  const payload = jwt.verify(token, secret);

  return payload;
};

module.exports = { generateToken, verifyToken };
