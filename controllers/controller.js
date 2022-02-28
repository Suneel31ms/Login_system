const crypto = require("crypto");
const bcrypt = require("bcrypt");
const sgMail = require("@sendgrid/mail");

const UserDb = require("../models/model");

sgMail.setApiKey("xxxxxxxxxx");

exports.signUp = (req, res) => {
  const user = new UserDb({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    gender: req.body.gender,
    status: req.body.status,
    city: req.body.city,
    state: req.body.state,
  });
  user
    .save()
    .then(() => {
      //send verification mail to user
      var msg = {
        from: "suneelchauhan50.sc@gmail.com",
        to: user.email,
        subject: "verify your email",
        html: `<h2> ${user.userName} Thanks for registering on our site !</h2>
        `,
      };

      //sending mail
      sgMail.send(msg, function (error, info) {
        if (error) {
          console.log("ERROR-", error);
        } else {
          console.log("You are Successfully Registered");
        }
      });

      res.redirect("/");
    })
    .catch((err) => {
      res.send(err.message);
    });
};

//LOGIN
exports.logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserDb.findOne({ email: email });

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      req.session.email = user;
      res.redirect("/dashboard");
    } else {
      res.send("Something went wrong!");
    }
  } catch (error) {
    res.send("Invalid User");
  }
};

// Dashboard
exports.dashboard = (req, res) => {
  if (req.session.email) {
    res.render("dashboard", { data: req.session.email });
  } else {
    res.send("Unauthorize User");
  }
};

//Logout
exports.logout = (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
};

