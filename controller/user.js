var User = require('../model/user');

//Home page
exports.home = (req,res) => {
    res.render('home');
};

//Register an user
exports.registerUser = (req,res)=>{
    var newUser = new User({
        name : req.body.name,
        email : req.body.email,
        username : req.body.username,
        password : req.body.password,
        gender : req.body.gender,
        avatar : req.body.photo
    });
    
    User.create(newUser,(err,data)=>{
        if(err){
            throw err;
        }else{
            return res.redirect('/welcome/'+data._id); 
        }        
    });
};

// Login user
exports.loginUser = (req,res) => {
    var username = req.body.username;
    var password = req.body.password;
    User.find({'username':username},(err,data)=>{
        if(err){
            throw err;
        }else{         

            if(data[0].password == password){                
                return res.redirect('/welcome/'+data[0]._id);
            }else{
                return res.redirect('/');
            }
        }
    });    
};

// Welcome user
exports.welcomeUser = (req,res) =>{   
    var user_id = req.params.id;
    User.findById({"_id":req.params.id},(err,data)=>{
        if(err){throw err;}
        else{
            User.find({},(err,alluser)=>{
                if(err){
                    throw err;
                }else{         
                    res.render('welcome',{'profileData':data,'allusers':alluser});                    
                }
            });   

           
        }
    });
};

// Update Profile

