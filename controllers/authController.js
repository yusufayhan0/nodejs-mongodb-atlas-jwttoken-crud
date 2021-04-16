const {User}=require("../models/user")
const jwt=require("jsonwebtoken")

maxAge=60*60*24
const createToken=(id)=>{
    //id,deneme => authMiddlewares sayfasında decodedToken içinde yer alır
    return jwt.sign({id,deneme:"deneme"},"gizli kelime",{expiresIn:maxAge})
}



const login_get=(req,res)=>{
    res.render("login",{title:"Login"})

}



const login_post=async (req,res)=>{
    const {username,password}=req.body
    
    try{
        const user=await User.login(username,password)
        const token=createToken(user.id)
        //httpOnly http üzerinde çalışırken kullanılır
        //https üzerinde çalışacaksak secure:true özelliğini ekleyeceğiz
        //cookie de süre milisaniye cinsinde çalıştığı için 1000 ile çarptık
        
        res.cookie("jwt",token,{httpOnly:true,maxAge:maxAge*1000})
        res.redirect("/admin")
    }
    catch(e){//modelde fırlatılan hatalar burada yakalanır
        console.log(e)
    }
}

const signup_get=(req,res)=>{
    res.render("signup",{title:"Signup"})

}



const signup_post=(req,res)=>{
    const user=new User(req.body)
    user.save()
    .then(res.redirect("/login"))
    .catch(err=>{
        console.log(err)
    })
}

const logout=(req,res)=>{
    res.cookie("jwt","",{maxAge:1})
    res.redirect("/login")

}


module.exports={

    login_post,
    login_get,
    signup_post,
    signup_get,
    logout

}