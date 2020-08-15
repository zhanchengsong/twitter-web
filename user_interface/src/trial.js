const axios = require("axios").default;

// const getUser = () => {
let myurl = "http://localhost:9092/tweets";
axios
  .get(myurl, {
    crossDomain: true,
    params: { id: "5f1c9c8cf488ac2bc82ad5f7" },
  })
  .then((res) => {
    console.log(res.data);
  })
  .catch((error) => {
    console.log(error);
  });
// };

// module.exports = getUser;
