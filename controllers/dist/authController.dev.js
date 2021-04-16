"use strict";

var _require = require("../models/user"),
    User = _require.User;

var jwt = require("jsonwebtoken");

maxAge = 60 * 60 * 24;

var createToken = function createToken(id) {
  //id,deneme => authMiddlewares sayfasında decodedToken içinde yer alır
  return jwt.sign({
    id: id,
    deneme: "deneme"
  }, "gizli kelime", {
    expiresIn: maxAge
  });
};

var login_get = function login_get(req, res) {
  res.render("login", {
    title: "Login"
  });
};

var login_post = function login_post(req, res) {
  var _req$body, username, password, user, token;

  return regeneratorRuntime.async(function login_post$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, username = _req$body.username, password = _req$body.password;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(User.login(username, password));

        case 4:
          user = _context.sent;
          token = createToken(user.id); //httpOnly http üzerinde çalışırken kullanılır
          //https üzerinde çalışacaksak secure:true özelliğini ekleyeceğiz
          //cookie de süre milisaniye cinsinde çalıştığı için 1000 ile çarptık

          res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: maxAge * 1000
          });
          res.redirect("/admin");
          _context.next = 13;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](1);
          //modelde fırlatılan hatalar burada yakalanır
          console.log(_context.t0);

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 10]]);
};

var signup_get = function signup_get(req, res) {
  res.render("signup", {
    title: "Signup"
  });
};

var signup_post = function signup_post(req, res) {
  var user = new User(req.body);
  user.save().then(res.redirect("/login"))["catch"](function (err) {
    console.log(err);
  });
};

var logout = function logout(req, res) {
  res.cookie("jwt", "", {
    maxAge: 1
  });
  res.redirect("/login");
};

module.exports = {
  login_post: login_post,
  login_get: login_get,
  signup_post: signup_post,
  signup_get: signup_get,
  logout: logout
};