/** @format */

let express = require("express");

let app = express();
let port = process.env.PORT || 8080;

app.get("/api", (req, res) => {
  try {
    return res.status(200).send({ message: "home page" });
  } catch (error) {
    return res.status(404).send({ messsge: error.messsge });
  }
});

app.get("/api/users", (req, res) => {
  let users = [
    { id: 1, name: "John", email: "john@example.com" },
    { id: 2, name: "Waid", email: "waid@example.com" },
    { id: 3, name: "Rock", email: "rock@example.com" },
  ];
  try {
    return res.status(200).send(users);
  } catch (error) {
    return res.status(404).send({ message: error.message });
  }
});

app.listen(port, () => {
    
  try {
    console.log(`port is running at ${port}`);
  } catch (error) {
    console.log(`Somthing is Wrong to listen at ${port}`);
  }
});
