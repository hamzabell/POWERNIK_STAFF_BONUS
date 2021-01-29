const axios = require("axios");
const sendQuery = require("./utils/send-query");
const RANDOM_USER_URL = "https://randomuser.me/api/?results=5";

const CREATE_STAFF = `
mutation($gender: String!, $email: String!, $phone: String!, $large:String!, $medium: String!, $thumbnail: String!, $title: String!, $first: String!, $last: String!) {
  createStaff(data: {gender: $gender, email: $email, phone: $phone, picture: { create: {large: $large, medium: $medium, thumbnail: $thumbnail } } name: { create: { title: $title, first: $first, last: $last}}}){
    phone
    email
    _id
    gender
    name {
      title
      first
      last
    }
    picture {
      large
      medium
      thumbnail
    }
  }
  }

`;

exports.handler = async (event) => {
  switch (event.httpMethod) {
    case "GET":
      const response = await axios({
        method: "get",
        url: RANDOM_USER_URL,
      }).then((res) => res.data.results);

      const formattedResponse = response.map((resp) => ({
        gender: resp.gender,
        email: resp.email,
        phone: resp.phone,
        large: resp.picture.large,
        medium: resp.picture.medium,
        thumbnail: resp.picture.thumbnail,
        title: resp.name.title,
        first: resp.name.first,
        last: resp.name.last,
      }));

      formattedResponse.forEach(async (resp) => {
        const { data, errors } = await sendQuery(CREATE_STAFF, { ...resp });

        console.log(data);
        if (errors) {
          console.log(errors);
          return;
        }
      });
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Staffs populated successfully",
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
