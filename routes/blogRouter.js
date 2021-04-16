const router=require("express").Router()
const blogController=require("../controllers/blogContoller")



router.get("/",blogController.listele)

router.get("/:title-t:id",blogController.detay)



module.exports=router