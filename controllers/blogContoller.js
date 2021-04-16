const Blog=require("../models/blogs")



const detay=(req,res)=>{
    const id=req.params.id;
    Blog.findById(id)
    .then(data=>{
        
        res.render("detay",{
            title:data.title,
            uzunyazi:data.long
        })
    })
    .catch((err)=>{
        res.render("404")
    })
}


const listele=(req,res)=>{

    Blog.find().sort({createdAt:-1})
    .then(result=>{
        result.forEach((a,index)=>{
            a.link=a.title
            .replace(" ","-")
            .replace('Ğ','g')
            .replace('Ü','u')
            .replace('Ş','s')
            .replace('I','i')
            .replace('İ','i')
            .replace('Ö','o')
            .replace('Ç','c')
            .replace('ğ','g')
            .replace('ü','u')
            .replace('ş','s')
            .replace('ı','i')
            .replace('ö','o')
            .replace('ç','c');
        })
        
        res.render("index",{
            yazilar:result,
            title:"Anasayfa"
        })
    })
    .catch((err)=>{
        console.log(err)
    })
}


module.exports={
    listele,
    detay
}