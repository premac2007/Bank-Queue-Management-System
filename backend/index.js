//imports
const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");

const app=express();

app.use(express.json());
app.use(cors());

//customer schema
const customerSchema=new mongoose.Schema({
    username:{type:String,required:true},
    age:{type:Number,required:true},
    gender:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true}
});

const Customer=mongoose.model("User",customerSchema);

//staff schema
const staffSchema=new mongoose.Schema({
    staffusername:{type:String,required:true},
    staffemail:{type:String,required:true},
    staffpassword:{type:String,required:true}
});

const Staff=mongoose.model("Staff",staffSchema);

//admin schema
const adminSchema=new mongoose.Schema({
    adminusername:{type:String,required:true},
    adminemail:{type:String,required:true},
    adminpassword:{type:String,required:true}
});

const Admin=mongoose.model("Admin",adminSchema);

//service schema
const serviceSchema=new mongoose.Schema({
    servicename:{type:String,required:true},
    servicedescription:{type:String,required:true},
    serviceactive:{type:Boolean,default:true}
});

const Service=mongoose.model("Service",serviceSchema);

//token schema
const tokenSchema=new mongoose.Schema({
    tokennumber:{type:String,required:true},
    username:{type:String,required:true},
    service:{type:String,required:true},
    status:{
        type:String,
        enum:["WAITING","CALLED","IN_SERVICE","COMPLETED"],
        default:"WAITING"
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

const Token=mongoose.model("Token",tokenSchema);

//default services
const defaultServices=[
    {
        servicename:"Cash Deposit",
        servicedescription:"Deposit cash into bank account",
        serviceactive:true
    },
    {
        servicename:"Cash Withdrawal",
        servicedescription:"Withdraw cash from bank account",
        serviceactive:true
    },
    {
        servicename:"Account Opening",
        servicedescription:"Open a new bank account",
        serviceactive:true
    },
    {
        servicename:"Money Transfer",
        servicedescription:"Transfer money to another account",
        serviceactive:true
    },
    {
        servicename:"Cheque Deposit",
        servicedescription:"Deposit cheque into bank account",
        serviceactive:true
    },
    {
        servicename:"Passbook Update",
        servicedescription:"Update bank passbook",
        serviceactive:true
    }
];

//staff authentication
const staffAuthentication=(req,res,next)=>{
    const staffemail=req.headers.staffemail;
    const staffpassword=req.headers.staffpassword;

    if(!staffemail||!staffpassword){
        res.status(401).send({
            success:false,
            message:"Staff login required!"
        });
        return;
    }

    Staff.findOne({
        staffemail:staffemail,
        staffpassword:staffpassword
    })
    .then((staff)=>{
        if(staff){
            next();
        }
        else{
            res.status(401).send({
                success:false,
                message:"Invalid staff authentication!"
            });
        }
    })
    .catch((error)=>{
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Staff authentication error!"
        });
    });
};

//admin authentication
const adminAuthentication=(req,res,next)=>{
    const adminemail=req.headers.adminemail;
    const adminpassword=req.headers.adminpassword;

    if(!adminemail||!adminpassword){
        res.status(401).send({
            success:false,
            message:"Admin login required!"
        });
        return;
    }

    Admin.findOne({
        adminemail:adminemail,
        adminpassword:adminpassword
    })
    .then((admin)=>{
        if(admin){
            next();
        }
        else{
            res.status(401).send({
                success:false,
                message:"Invalid admin authentication!"
            });
        }
    })
    .catch((error)=>{
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Admin authentication error!"
        });
    });
};

//customer registration
app.post("/register",(req,res)=>{
    const {username,age,gender,email,password}=req.body;

    if(!username||!age||!gender||!email||!password){
        res.status(400).send({
            success:false,
            message:"Please fill all fields!"
        });
        return;
    }

    Customer.findOne({email:email})
    .then((customer)=>{
        if(customer){
            res.status(400).send({
                success:false,
                message:"Email already registered!"
            });
            return;
        }

        const newCustomer=new Customer({
            username:username,
            age:age,
            gender:gender,
            email:email,
            password:password
        });

        newCustomer.save()
        .then(()=>{
            res.status(201).send({
                success:true,
                message:"Account Created!"
            });
        })
        .catch((error)=>{
            console.log(error);
            res.status(500).send({
                success:false,
                message:"Error creating account!"
            });
        });
    })
    .catch((error)=>{
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error checking email!"
        });
    });
});

//customer login
app.post("/login",(req,res)=>{
    const {email,password}=req.body;

    Customer.findOne({
        email:email,
        password:password
    })
    .then((customer)=>{
        if(customer){
            res.status(200).send({
                success:true,
                message:"Login Successful!",
                customer:customer
            });
        }
        else{
            res.status(400).send({
                success:false,
                message:"Invalid Credentials!"
            });
        }
    })
    .catch((error)=>{
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error during login!"
        });
    });
});

//staff login
app.post("/stafflogin",(req,res)=>{
    const {staffemail,staffpassword}=req.body;

    Staff.findOne({
        staffemail:staffemail,
        staffpassword:staffpassword
    })
    .then((staff)=>{
        if(staff){
            res.status(200).send({
                success:true,
                message:"Staff Login Successful!",
                staff:staff
            });
        }
        else{
            res.status(400).send({
                success:false,
                message:"Invalid Staff Credentials!"
            });
        }
    })
    .catch((error)=>{
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error during staff login!"
        });
    });
});

//admin login
app.post("/adminlogin",(req,res)=>{
    const {adminemail,adminpassword}=req.body;

    Admin.findOne({
        adminemail:adminemail,
        adminpassword:adminpassword
    })
    .then((admin)=>{
        if(admin){
            res.status(200).send({
                success:true,
                message:"Admin Login Successful!",
                admin:admin
            });
        }
        else{
            res.status(400).send({
                success:false,
                message:"Invalid Admin Credentials!"
            });
        }
    })
    .catch((error)=>{
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error during admin login!"
        });
    });
});

//add service
app.post("/addservice",adminAuthentication,(req,res)=>{
    const {servicename,servicedescription}=req.body;

    if(!servicename||!servicedescription){
        res.status(400).send({
            success:false,
            message:"Please enter service details!"
        });
        return;
    }

    Service.findOne({servicename:servicename})
    .then((service)=>{
        if(service){
            res.status(400).send({
                success:false,
                message:"Service already exists!"
            });
            return;
        }

        const newService=new Service({
            servicename:servicename,
            servicedescription:servicedescription,
            serviceactive:true
        });

        newService.save()
        .then(()=>{
            res.status(201).send({
                success:true,
                message:"Service Added!"
            });
        })
        .catch((error)=>{
            console.log(error);
            res.status(500).send({
                success:false,
                message:"Error adding service!"
            });
        });
    })
    .catch((error)=>{
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error checking service!"
        });
    });
});

//get services
app.get("/getservices",(req,res)=>{
    Service.find({serviceactive:true})
    .sort({servicename:1})
    .then((services)=>{
        res.status(200).send(services);
    })
    .catch((error)=>{
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error fetching services!"
        });
    });
});

//get all services
app.get("/getallservices",adminAuthentication,(req,res)=>{
    Service.find()
    .sort({servicename:1})
    .then((services)=>{
        res.status(200).send(services);
    })
    .catch((error)=>{
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error fetching services!"
        });
    });
});

//delete service
app.delete("/deleteservice",adminAuthentication,(req,res)=>{
    const {serviceid}=req.body;

    Service.deleteOne({_id:serviceid})
    .then((result)=>{
        if(result.deletedCount>0){
            res.status(200).send({
                success:true,
                message:"Service Deleted!"
            });
        }
        else{
            res.status(400).send({
                success:false,
                message:"Service not found!"
            });
        }
    })
    .catch((error)=>{
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error deleting service!"
        });
    });
});

//generate token
app.post("/generatetoken",(req,res)=>{
    const {username,service}=req.body;

    if(!username||!service){
        res.status(400).send({
            success:false,
            message:"Please select a service!"
        });
        return;
    }

    Service.findOne({
        servicename:service,
        serviceactive:true
    })
    .then((foundService)=>{
        if(!foundService){
            res.status(400).send({
                success:false,
                message:"Selected service is not available!"
            });
            return;
        }

        Token.countDocuments()
        .then((count)=>{
            const tokennumber="T"+String(count+1).padStart(3,"0");

            const newToken=new Token({
                tokennumber:tokennumber,
                username:username,
                service:foundService.servicename,
                status:"WAITING"
            });

            newToken.save()
            .then((savedToken)=>{
                res.status(201).send({
                    success:true,
                    message:"Token Generated!",
                    token:savedToken
                });
            })
            .catch((error)=>{
                console.log(error);
                res.status(500).send({
                    success:false,
                    message:"Error generating token!"
                });
            });
        })
        .catch((error)=>{
            console.log(error);
            res.status(500).send({
                success:false,
                message:"Error creating token number!"
            });
        });
    })
    .catch((error)=>{
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error checking service!"
        });
    });
});

//get customer tokens
app.get("/gettokens",(req,res)=>{
    const {username}=req.query;

    Token.find(username?{username:username}:{})
    .sort({createdAt:1})
    .then((tokens)=>{
        res.status(200).send(tokens);
    })
    .catch((error)=>{
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error fetching tokens!"
        });
    });
});

//get customer queue
app.get("/getcustomerqueue",(req,res)=>{
    Token.find({
        status:{
            $in:["WAITING","CALLED","IN_SERVICE"]
        }
    })
    .sort({createdAt:1})
    .then((tokens)=>{
        res.status(200).send(tokens);
    })
    .catch((error)=>{
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error fetching customer queue!"
        });
    });
});

//get staff queue
app.get("/getqueue",staffAuthentication,(req,res)=>{
    Token.find({
        status:{
            $in:["WAITING","CALLED","IN_SERVICE"]
        }
    })
    .sort({createdAt:1})
    .then((tokens)=>{
        res.status(200).send(tokens);
    })
    .catch((error)=>{
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error fetching queue!"
        });
    });
});

//call next customer
app.put("/callnext",staffAuthentication,(req,res)=>{
    Token.findOne({status:"WAITING"})
    .sort({createdAt:1})
    .then((token)=>{
        if(!token){
            res.status(400).send({
                success:false,
                message:"No Waiting Customers!"
            });
            return;
        }

        Token.updateOne(
            {_id:token._id,status:"WAITING"},
            {$set:{status:"CALLED"}}
        )
        .then((result)=>{
            if(result.modifiedCount===0){
                res.status(400).send({
                    success:false,
                    message:"Customer could not be called!"
                });
                return;
            }

            Token.findById(token._id)
            .then((updatedToken)=>{
                res.status(200).send({
                    success:true,
                    message:"Customer Called!",
                    token:updatedToken
                });
            })
            .catch((error)=>{
                console.log(error);
                res.status(500).send({
                    success:false,
                    message:"Error getting called customer!"
                });
            });
        })
        .catch((error)=>{
            console.log(error);
            res.status(500).send({
                success:false,
                message:"Error calling customer!"
            });
        });
    })
    .catch((error)=>{
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error finding waiting customer!"
        });
    });
});

//start service
app.put("/startservice",staffAuthentication,(req,res)=>{
    const {tokenid}=req.body;

    if(!tokenid){
        res.status(400).send({
            success:false,
            message:"Token ID is required!"
        });
        return;
    }

    Token.updateOne(
        {
            _id:tokenid,
            status:"CALLED"
        },
        {
            $set:{status:"IN_SERVICE"}
        }
    )
    .then((result)=>{
        if(result.modifiedCount>0){
            res.status(200).send({
                success:true,
                message:"Service Started!"
            });
        }
        else{
            res.status(400).send({
                success:false,
                message:"Customer must be called first!"
            });
        }
    })
    .catch((error)=>{
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error starting service!"
        });
    });
});

//complete service
app.put("/completeservice",staffAuthentication,(req,res)=>{
    const {tokenid}=req.body;

    if(!tokenid){
        res.status(400).send({
            success:false,
            message:"Token ID is required!"
        });
        return;
    }

    Token.updateOne(
        {
            _id:tokenid,
            status:"IN_SERVICE"
        },
        {
            $set:{status:"COMPLETED"}
        }
    )
    .then((result)=>{
        if(result.modifiedCount>0){
            res.status(200).send({
                success:true,
                message:"Service Completed!"
            });
        }
        else{
            res.status(400).send({
                success:false,
                message:"Customer must be in service first!"
            });
        }
    })
    .catch((error)=>{
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error completing service!"
        });
    });
});

//database
mongoose.connect("mongodb://localhost:27017/queueless")
.then(()=>{
    console.log("Database Connected!");

    const servicePromises=defaultServices.map((service)=>{
        return Service.findOne({
            servicename:service.servicename
        })
        .then((foundService)=>{
            if(foundService){
                return Service.updateOne(
                    {servicename:service.servicename},
                    {
                        $set:{
                            servicedescription:service.servicedescription,
                            serviceactive:true
                        }
                    }
                );
            }

            return Service.create(service);
        });
    });

    return Promise.all(servicePromises);
})
.then(()=>{
    return Admin.findOne({
        adminemail:"admin@gmail.com"
    })
    .then((admin)=>{
        if(admin){
            return null;
        }

        return Admin.create({
            adminusername:"admin",
            adminemail:"admin@gmail.com",
            adminpassword:"admin123"
        });
    });
})
.then(()=>{
    return Staff.findOne({
        staffemail:"staff@queueless.com"
    })
    .then((staff)=>{
        if(staff){
            return null;
        }

        return Staff.create({
            staffusername:"staff",
            staffemail:"staff@queueless.com",
            staffpassword:"staff123"
        });
    });
})
.then(()=>{
    app.listen(8000,()=>{
        console.log("Server Started!");
    });
})
.catch((error)=>{
    console.log(error);
});