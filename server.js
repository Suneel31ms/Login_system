const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
const session = require("express-session");
const flash = require("connect-flash");
const { v4: uuid4 } = require("uuid");
require("./utils/db");

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

//static file
app.use("/static", express.static(path.join(__dirname, "public")));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

app.set("view engine", "ejs");

app.use(
  session({
    secret: uuid4(),
    resave: false,
    saveUninitialized: false
  })
);
app.use(flash())

app.use("/", require("./routes/router"));

app.listen(port, () => {
  console.log(`port-- http://localhost:${port}`);
});
