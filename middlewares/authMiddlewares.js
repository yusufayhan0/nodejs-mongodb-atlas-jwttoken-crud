const jwt=require("jsonwebtoken")
const {User} = require("../models/user")



const requireAuth=(req,res,next)=>{
    //.jwt kodunu kullanmak için projeye cookie-parser modülünü eklemek gerekiyor
    const token=req.cookies.jwt


    if(token){
        jwt.verify(token,"gizli kelime",(err,decodedToken)=>{
            if(err){
                //token var ama o kullanıcıya ait olan token değilse login sayfasına git
                console.log(err)
                res.redirect("/login")
            }
            else{
                //token var ise app sayfasında bir sonraki satırdan devam et
                console.log(decodedToken)
                console.log("requireAuth")

                next()
            }

        })//jwt doğrula
    }
    else{
        //token yok ise logine git
        console.log("token bulunmuyor")
        res.redirect("/login")
    }
}


//sadece token varmı yokmu cookie ye bakıyor sonra token doğrumu ona bakıyor doğru ise localstroge da user adında bir veri oluşturuyor
const checkUser=(req,res,next)=>{
    const token=req.cookies.jwt
    
    if(token){
        jwt.verify(token,"gizli kelime",async (err,decodedToken)=>{
            if(err){
                //token yanlış ise 
                console.log("buraya girdi")
                console.log(err)
                res.locals.user12=null
                next()
            }
            else{
                //token doğru ise
                console.log("checkuser")
                let user=await User.findById(decodedToken.id)
                res.locals.user12=user
                //console.log(user)
                //console.log(decodedToken)
                next()
            }
        })//jwt doğrula
    }
    else{
        //token yok ise
        console.log("token bulunmuyor")
        res.locals.user12=null
        next()
    }
}

module.exports={requireAuth,checkUser}