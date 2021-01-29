require("dotenv/config");
const jwt = require("jsonwebtoken");

module.exports = (event) => {
  try {
    const token = event.headers.authorization.split(" ")[1];
    const result = jwt.verify(token, process.env.JWT_SECRET);

    return (
      Object.keys(result).length === 4 && Object.keys(result).includes("email")
    );
  } catch (error) {
    console.error(error);
    return false;
  }
};
