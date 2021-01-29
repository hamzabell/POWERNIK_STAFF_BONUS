require("dotenv/config");
const jwt = require("jsonwebtoken");
const sendQuery = require("./utils/send-query");
const _ = require("lodash");

const GET_ALL_USERS = `
    query {
        allUsers{
        data {
           _id
            email
            password
        }
        }
    }
`;

exports.handler = async (event) => {
  if (event.httpMethod === "POST") {
    const { data, error } = await sendQuery(GET_ALL_USERS);

    if (!error) {
      const { email, password } = JSON.parse(event.body);

      const isemailAndPasswordExist = _.filter(data.allUsers.data, (user) => {
        return user.email === email && user.password === password;
      });

      const loggedInUser = isemailAndPasswordExist[0];

      if (_.isEmpty(isemailAndPasswordExist)) {
        return {
          statusCode: 400,
          body: JSON.stringify({
            message: "Wrong Email/Password. Please try again",
          }),
        };
      } else {
        const signedToken = jwt.sign(
          { email: loggedInUser.email, id: loggedInUser._id },
          process.env.JWT_SECRET,
          {
            expiresIn: "12h",
          }
        );

        return {
          statusCode: 200,
          body: JSON.stringify({
            message: `Welcome Back, ${email}`,
            token: signedToken,
          }),
        };
      }
    }
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Hello User! An Error occurred. Please try again",
        error,
      }),
    };
  }

  return {
    statusCode: 400,
    body: JSON.stringify({
      message: "Method is not Allowed",
    }),
  };
};
