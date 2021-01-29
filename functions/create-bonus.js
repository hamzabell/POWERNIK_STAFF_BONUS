const sendQuery = require("./utils/send-query");

const CREATE_BONUS = `
mutation($staff: ID!, $bonus: String!, $dateCreated: String!) {
    createBonus(data :  {  staff:  {connect:$staff},  bonus:  $bonus, dateCreated: $dateCreated}){
      staff {
        name {
          first
          last
        }
        email
        _id
      }
      bonus
      dateCreated
  }
  }
`;

exports.handler = async (event) => {
  switch (event.httpMethod) {
    case "POST":
      const { staff, bonus, dateCreated } = JSON.parse(event.body);
      const { data, errors } = await sendQuery(CREATE_BONUS, {
        staff,
        bonus,
        dateCreated,
      });

      console.log(staff, bonus, dateCreated);

      if (errors) {
        console.log(errors);
        return {
          statusCode: 400,
          body: JSON.stringify({
            message: "An Error Occurred Please try again",
          }),
        };
      }

      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Bonus Created Successfuully",
          bonus: data,
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
