require("dotenv/config");
const jwt = require("jsonwebtoken");

exports.handler = (event) => {
  switch (event.httpMethod) {
    case "GET":
      try {
        const { token } = event.queryStringParameters;
        const result = jwt.verify(token, process.env.JWT_SECRET);
        const tokenStatus =
          Object.keys(result).length === 4 &&
          Object.keys(result).includes("email");
        return {
          statusCode: 200,
          body: JSON.stringify({
            message: "Token status obtained successfully",
            isAuthenticated: tokenStatus,
          }),
        };
      } catch (error) {
        return {
          statusCode: 200,
          body: JSON.stringify({
            message: "Token status obtained successfully",
            isAuthenticated: false,
          }),
        };
      }
    default:
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Method is not allowed",
        }),
      };
  }
};
