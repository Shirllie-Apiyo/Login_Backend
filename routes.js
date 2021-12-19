// step 2: We create our routes / post/ get/ update and delete
const express = require("express");
const { object } = require("webidl-conversions");
const Login = require("./models/Login") // access our model

//create a router
const router = express.Router()

router.post("/add", async(req, res) => {
    const post = new Login({
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        phone:req.body.phone,
        message:req.body.message,
        email:req.body.email,
       

    });
    try{
        const result = await post.save();
        res.status(200).json({'message':'Person Registered'})
    }
    catch(err){
        if(err.name === "ValidationError"){
            let errors = {};
            Object.keys(err.errors).forEach((key)=>{
                errors[key] =err.errors[key].message
            });
            return res.status(400).send(errors);
        }//end
        else{
            res.status(200).json({'error':'Error Occurred, Try again'})
        }
        // res.status(400).json({'message':err.message})
    }
});//END

router.get('/login', function(req,res)
{
    Login.find({}, function(err,data){
        if(err){
            res.status(404).json({'message':'There was an error'})
        }
        else{
            res.status(200).send(data)
        }
    })
});

router.route('/login/:id').delete((req,res) =>
{
    Login.findByIdAndDelete(req.params.id, (error,data)=>
    {
        if (error){
            res.status(200).json({'message':"Delete Failed"})
        }
        else{
            res.status(200).json({'message':"Deleted"})
        }
    })
});