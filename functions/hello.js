const isToken = require("./utils/isToken");

exports.handler = async (event) => {
  if (!event.headers.authorization) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "No Authorization Header",
      }),
    };
  } else {
    return isToken(event)
      ? {
          statusCode: 200,
          body: JSON.stringify({
            message: "Hello user",
          }),
        }
      : {
          statusCode: 400,
          body: JSON.stringify({
            message: "Hello you cannot access this resource",
          }),
        };
  }
};
