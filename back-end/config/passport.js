const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const db = require("../models");

//local strategy
module.exports = function(passport) {
  passport.use(
    new localStrategy({ usernameField: "email" }, (email, password, done) => {
      //match user
      db.User.findOne({
        where: { email: email }
      }).then(user => {
        if (!user) {
          return done(null, false, { message: "No User Found!" });
        }
        //match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) {
            throw err;
          }
          if (isMatch) {
            // console.log(user);
            return done(null, user);
          } else {
            return done(null, false, { message: "Password Incorrect" });
          }
        });
      });
    })
  );
  //serialize passport cookie
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // when we retrieve the data from a user session
  passport.deserializeUser(function(id, done) {
    db.User.findOne({ where: { id: id } })
      .then(function(user) {
        done(null, user);
      })
      .catch(error => {
        console.log(error);
        done(error, false);
      });
  });
};