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

const GET_STAFFS = `
    query {
        allStaffs {
        data {
            _id
            email
            name {
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
      const bonusData = await sendQuery(GET_ALL_BONNUSES);
      const staffData = await sendQuery(GET_STAFFS);
      const MAX_BONUS = 0;

      if (staffData.errors || bonusData.errors) {
        return {
          statusCode: 400,
          body: JSON.stringify({
            message: "An Error Occurred Please try again",
          }),
        };
      }

      const number_of_staffs = staffData.data.allStaffs.data.length;
      const totalBonuses = _.reduce(
        bonusData.data.allBonuses.data,
        (acc, curr) => {
          return acc + Number(curr.bonus);
        },
        0
      );
      const highestBonus = _.reduce(
        bonusData.data.allBonuses.data,
        (acc, curr) => {
          return Number(curr.bonus) > acc ? Number(curr.bonus) : acc;
        },
        MAX_BONUS
      );
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Metrics Obtained Successfully",
          number_of_staffs,
          totalBonuses,
          highestBonus,
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
