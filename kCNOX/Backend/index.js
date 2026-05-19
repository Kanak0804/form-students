const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors"); 

const router = require('./route/user.route');

app.use(cors()); //  VERY IMPORTANT
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", router);

app.listen(8080, () => {
  console.log("running on this port");
});