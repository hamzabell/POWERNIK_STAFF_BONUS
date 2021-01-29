const sendQuery = require("./utils/send-query");
const _ = require("lodash");

const GET_ALL_BONNUSES = `
    query {
        allBonuses {
            data {
                _id
                dateCreated
                bonus
                staff  {
                _id
                name {
                    title
                    first
                    last
                }
                phone
                email
                gender
                picture {
                    large
                }
                }
            }
    }
    }
`;

const formatDate = (dateString) => {
  return new Date(dateString).toDateString();
};

const changeDateCreated = (bonusData) => {
  const formattedDateCreated = _.map(bonusData, (data) => ({
    ...data,
    dateCreated: formatDate(data.dateCreated),
  }));

  return formattedDateCreated;
};

exports.handler = async (event) => {
  switch (event.httpMethod) {
    case "GET":
      const staffID = event.queryStringParameters.staff;
      const { data, errors } = await sendQuery(GET_ALL_BONNUSES);

      if (errors) {
        return {
          statusCode: 400,
          body: JSON.stringify({
            message: "An Error Occurred Please try again",
          }),
        };
      }

      const bonusData = changeDateCreated(data.allBonuses.data);
      if (staffID) {
        const staffBonuses = _.filter(
          bonusData,
          (bonus) => bonus.staff._id === staffID
        );

        const updatedDateCreated = changeDateCreated(staffBonuses);

        return {
          statusCode: 200,
          body: JSON.stringify({
            message: "Bonuses obtained successfully",
            bonusData: updatedDateCreated,
          }),
        };
      }
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Bonuses obtained successfully",
          bonusData,
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
