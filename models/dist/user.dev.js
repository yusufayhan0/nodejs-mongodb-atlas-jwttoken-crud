"use strict";

var mongoose = require("mongoose");

var bcrypt = require("bcrypt");

var _require = require("../routes/authRoutes"),
    use = _require.use;

var userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    enique: true
  },
  password: {
    type: String,
    require: true
  }
}); //previus=>pre : kayıt olmadan önceki hazırlık

userSchema.pre("save", function _callee(next) {
  var salt;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(bcrypt.genSalt());

        case 2:
          salt = _context.sent;
          //bu kod parçaları çalışmadan programım ilerlemesin o yüzden await koyduk
          console.log(salt);
          _context.next = 6;
          return regeneratorRuntime.awrap(bcrypt.hash(this.password, salt));

        case 6:
          this.password = _context.sent;
          next();

        case 8:
        case "end":
          return _context.stop();
      }
    }
  }, null, this);
});

function deneme() {
  console.log("deneme");
} //userScehema altında bir metod tanımlıyoruz
//eğer modelde yapacaksak bunu statics olarak tanımlamamız gerekiyor


userSchema.statics.login = function _callee2(username, password) {
  var user, auth;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(this.findOne({
            username: username
          }));

        case 2:
          user = _context2.sent;

          if (!user) {
            _context2.next = 14;
            break;
          }

          _context2.next = 6;
          return regeneratorRuntime.awrap(bcrypt.compare(password, user.password));

        case 6:
          auth = _context2.sent;

          if (!auth) {
            _context2.next = 11;
            break;
          }

          return _context2.abrupt("return", user);

        case 11:
          throw Error("parola hatalı");

        case 12:
          _context2.next = 15;
          break;

        case 14:
          throw Error("kullanıcı bulunamadı");

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  }, null, this);
};

var User = new mongoose.model("user", userSchema);
module.exports = {
  User: User,
  deneme: deneme
};