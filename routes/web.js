var express =  require("express");
const userController = require("../controller/user")
var router = express.Router();

router.get('/',userController.home);
router.get('/welcome/:id',userController.welcomeUser);
router.post("/register",userController.registerUser);
router.post("/login",userController.loginUser);
module.exports = router;


