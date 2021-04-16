const Blog = require("../models/blogs")


const kayit = (req, res) => {
    title = req.body.title
    short = req.body.short
    long = req.body.long

    const blog = new Blog(req.body)
    blog.save()
        .then(result => {
            res.redirect("/admin")
        })
        .catch(err => {
            console.log("Hata")
        })
}


const sil = (req, res) => {//delete isteğinden sonra redirect diyerek get isteğinde bulunamıyoruz
    //yani bu metodda redirect kullanamıyoruz
    const id = req.params.id
    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ link: "/admin" })
        })
        .catch(err => {
            console.log(err)
        })
}


const listele = (req, res) => {

    Blog.find().sort({ createdAt: -1 })
        .then(result => {
            result.forEach((a, index) => {
                a.link = a.title
                    .replace(" ", "-")
                    .replace('Ğ', 'g')
                    .replace('Ü', 'u')
                    .replace('Ş', 's')
                    .replace('I', 'i')
                    .replace('İ', 'i')
                    .replace('Ö', 'o')
                    .replace('Ç', 'c')
                    .replace('ğ', 'g')
                    .replace('ü', 'u')
                    .replace('ş', 's')
                    .replace('ı', 'i')
                    .replace('ö', 'o')
                    .replace('ç', 'c');
            })

            res.render("admin", {
                yazilar: result,
                title: "Anasayfa"
            })
        })
        .catch((err) => {
            console.log(err)
        })
}

module.exports = {
    listele,
    kayit,
    sil
}