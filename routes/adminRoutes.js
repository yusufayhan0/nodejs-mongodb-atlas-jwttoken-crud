const express=require("express")
const router=express.Router();

const adminController=require("../controllers/adminController")

console.log("----------------**************************")

router.post("/",adminController.kayit)
router.delete("/delete/:id",adminController.sil)
router.get("/",adminController.listele)

module.exports=router