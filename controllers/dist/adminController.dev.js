"use strict";

var Blog = require("../models/blogs");

var kayit = function kayit(req, res) {
  title = req.body.title;
  short = req.body["short"];
  long = req.body["long"];
  var blog = new Blog(req.body);
  blog.save().then(function (result) {
    res.redirect("/admin");
  })["catch"](function (err) {
    console.log("Hata");
  });
};

var sil = function sil(req, res) {
  //delete isteğinden sonra redirect diyerek get isteğinde bulunamıyoruz
  //yani bu metodda redirect kullanamıyoruz
  var id = req.params.id;
  Blog.findByIdAndDelete(id).then(function (result) {
    res.json({
      link: "/admin"
    });
  })["catch"](function (err) {
    console.log(err);
  });
};

var listele = function listele(req, res) {
  Blog.find().sort({
    createdAt: -1
  }).then(function (result) {
    result.forEach(function (a, index) {
      a.link = a.title.replace(" ", "-").replace('Ğ', 'g').replace('Ü', 'u').replace('Ş', 's').replace('I', 'i').replace('İ', 'i').replace('Ö', 'o').replace('Ç', 'c').replace('ğ', 'g').replace('ü', 'u').replace('ş', 's').replace('ı', 'i').replace('ö', 'o').replace('ç', 'c');
    });
    res.render("admin", {
      yazilar: result,
      title: "Anasayfa"
    });
  })["catch"](function (err) {
    console.log(err);
  });
};

module.exports = {
  listele: listele,
  kayit: kayit,
  sil: sil
};