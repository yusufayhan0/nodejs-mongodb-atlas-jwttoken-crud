const mongoose = require("mongoose")
const bcrypt=require("bcrypt")
const { use } = require("../routes/authRoutes")

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        require:true,
        enique:true
    },
    password:{
        type:String,
        require:true
    }
})

//previus=>pre : kayıt olmadan önceki hazırlık
userSchema.pre("save",async function(next){//arrow function kullanılmıyor
    const salt= await bcrypt.genSalt()//bu kod parçaları çalışmadan programım ilerlemesin o yüzden await koyduk
    console.log(salt)
    this.password=await bcrypt.hash(this.password,salt)
    next()
})

function deneme(){
    console.log("deneme")
}

//userScehema altında bir metod tanımlıyoruz
//eğer modelde yapacaksak bunu statics olarak tanımlamamız gerekiyor
userSchema.statics.login=async function(username,password){
    
    const user= await this.findOne({username})//kullanıcı varmı bakılır
    if(user){//varsa girer
        const auth=await bcrypt.compare(password,user.password)//veri hash lenir
        if(auth){
            return user
        }
        else{
            throw Error("parola hatalı")
        }
    }
    else{
        throw Error("kullanıcı bulunamadı")
    }
}


const User=new mongoose.model("user",userSchema)
module.exports={User,deneme}