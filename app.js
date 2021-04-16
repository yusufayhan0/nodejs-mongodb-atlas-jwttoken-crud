const express=require("express")
const app=express();
const bodyParser=require("body-parser")
const morgan=require("morgan")
const mongoose=require("mongoose")
const Blog=require("./models/blogs")
const _=require("lodash")
const url=require("url")
const cookieParser=require("cookie-parser")
const port =process.env.PORT||3000

//---
const adminRoutes=require("./routes/adminRoutes")
const blogRouter=require("./routes/blogRouter")
const authRoutes=require("./routes/authRoutes")
const {requireAuth,checkUser}=require("./middlewares/authMiddlewares")
//---

const dburl ="mongodb+ mongo db atlas bağlantı cümlesi"

mongoose.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true})
.then(result=>{
    app.listen(port,function(){

        console.log(port+"portu dinleniyor")
    
    })
})
.catch(err=>console.log(err))

app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))//fronttan değer almada kullanılan arkada çalışan kod true dersek iç içe nesne dönderebiliriz anlamına gelir
app.use(bodyParser.json())//apilerle ilgili yapılacak işlemlerde kullanılır yani json veri gönderip almada kullanılır
app.use(express.static("public"))//klasörü erişime açar
app.set("view engine","ejs")//sayfa adlarını yazarken sonuna .ejs uzantısını koymadan kullanılmasını sağlar
app.set("views","views/pages")//ejs ana dosyalarının default konumu için kullanılır


//#region sendFile ile yapılanlar
/*
app.get("/",(req,res)=>{

    res.sendFile("/views/index.html",{root:__dirname})

})
app.get("/about",(req,res)=>{
    res.sendFile("/views/about.html",{root:__dirname})
})
app.use((req,res)=>{
    res.status(404).sendFile("/views/404.html",{root:__dirname})

})
*/
//#endregion


//middleware(ara katman) için morgan kütüphanesi kullanılır


app.get("*",checkUser)

app.get("/",(req,res)=>{
    res.redirect("/blog")
})
app.use("/admin",requireAuth,adminRoutes)
app.use("/blog",blogRouter)
app.use(authRoutes)



//#region kütüphane kullanmadan ara katman
// app.use((req,res,next)=>{
//     console.log(req.method)
//     next();
// })
//#endregion

app.use(morgan("tiny"))//ara katman

app.get("/about",(req,res)=>{
    res.render("about",{title:"About"})

})

app.get("/add",(req,res)=>{
    const blog=new Blog({
        title:"Yeni yazı",
        short:"Yeni yazının kısa yazısı",
        long:"1Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir hurufat numune kitabı oluşturmak üzere bir yazı galerisini alarak karıştırdığı 1500'lerden beri endüstri standardı sahte metinler olarak kullanılmıştır. Beşyüz yıl boyunca varlığını sürdürmekle kalmamış, aynı zamanda pek değişmeden elektronik dizgiye de sıçramıştır"
    });
    blog.save()
    .then(result=>{
        res.send("yükleme tamamdı:"+result)
    })
    .catch(err=>{
        console.log(err)
    })
})



app.get("/listele",(req,res)=>{

    var deger
    Blog.find()
    .then(result=>{
        deger=result
    })
    .catch((err)=>{
        console.log(err)
    })

    Blog.findById("5fe0a75fc2cd083d1421fed1")
    .then(result=>{
        deger+="<br><br>"+result
        res.send(deger)
    })
    .catch((err)=>{
        console.log(err)
    })

    

})


app.use((req,res)=>{
    res.status(404).render("404",{title:"hata 404"})

})















