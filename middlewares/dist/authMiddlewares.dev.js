"use strict";

var jwt = require("jsonwebtoken");

var _require = require("../models/user"),
    User = _require.User;

var requireAuth = function requireAuth(req, res, next) {
  //.jwt kodunu kullanmak için projeye cookie-parser modülünü eklemek gerekiyor
  var token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, "gizli kelime", function (err, decodedToken) {
      if (err) {
        //token var ama o kullanıcıya ait olan token değilse login sayfasına git
        console.log(err);
        res.redirect("/login");
      } else {
        //token var ise app sayfasında bir sonraki satırdan devam et
        console.log(decodedToken);
        console.log("requireAuth");
        next();
      }
    }); //jwt doğrula
  } else {
    //token yok ise logine git
    console.log("token bulunmuyor");
    res.redirect("/login");
  }
}; //sadece token varmı yokmu cookie ye bakıyor sonra token doğrumu ona bakıyor doğru ise localstroge da user adında bir veri oluşturuyor


var checkUser = function checkUser(req, res, next) {
  var token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, "gizli kelime", function _callee(err, decodedToken) {
      var user;
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!err) {
                _context.next = 7;
                break;
              }

              //token yanlış ise 
              console.log("buraya girdi");
              console.log(err);
              res.locals.user12 = null;
              next();
              _context.next = 13;
              break;

            case 7:
              //token doğru ise
              console.log("checkuser");
              _context.next = 10;
              return regeneratorRuntime.awrap(User.findById(decodedToken.id));

            case 10:
              user = _context.sent;
              res.locals.user12 = user; //console.log(user)
              //console.log(decodedToken)

              next();

            case 13:
            case "end":
              return _context.stop();
          }
        }
      });
    }); //jwt doğrula
  } else {
    //token yok ise
    console.log("token bulunmuyor");
    res.locals.user12 = null;
    next();
  }
};

module.exports = {
  requireAuth: requireAuth,
  checkUser: checkUser
};