const sendQuery = require("./utils/send-query");

const GET_STAFFS = `
    query {
        allStaffs {
        data {
            _id
            email
            phone
            gender
            name {
                title
                first
                last
            }
            picture {
            large
            thumbnail
            medium
            }
        }
        }
    }
    `;

exports.handler = async (event) => {
  switch (event.httpMethod) {
    case "GET":
      const { data, errors } = await sendQuery(GET_STAFFS);

      if (errors) {
        return {
          statusCode: 400,
          body: JSON.stringify({
            message: "An Error occured",
            error: errors,
          }),
        };
      }
      const allStaffs = data.allStaffs.data;

      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Staffs Retrieved Successfully",
          data: allStaffs,
        }),
      };
    default:
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Invalid HTTP Method",
        }),
      };
  }
};
