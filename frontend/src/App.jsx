//imports
import React,{useState} from "react";
import axios from "axios";
import "./App.css";

//api url
const API="http://localhost:8000";

//default services
const defaultServices=[
    "Cash Deposit",
    "Cash Withdrawal",
    "Account Opening",
    "Money Transfer",
    "Cheque Deposit",
    "Passbook Update"
];

//signup page
function Register({
    signupData,
    setSignupData,
    handleSignup,
    message,
    setMessage,
    setPage
}){
    return(
        <div className="container">
            <h1>QueueLess</h1>
            <p>Smart Bank Queue Management System</p>
            <h2>Customer Sign Up</h2>
            <form onSubmit={handleSignup}>
                <input
                    type="text"
                    placeholder="Username"
                    value={signupData.username}
                    onChange={(e)=>setSignupData({
                        ...signupData,
                        username:e.target.value
                    })}
                    required
                />
                <input
                    type="number"
                    placeholder="Age"
                    value={signupData.age}
                    onChange={(e)=>setSignupData({
                        ...signupData,
                        age:e.target.value
                    })}
                    required
                />
                <select
                    value={signupData.gender}
                    onChange={(e)=>setSignupData({
                        ...signupData,
                        gender:e.target.value
                    })}
                    required
                >
                    <option value="">Select Gender</option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                </select>
                <input
                    type="email"
                    placeholder="Email"
                    value={signupData.email}
                    onChange={(e)=>setSignupData({
                        ...signupData,
                        email:e.target.value
                    })}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={signupData.password}
                    onChange={(e)=>setSignupData({
                        ...signupData,
                        password:e.target.value
                    })}
                    required
                />
                <button type="submit">Sign Up</button>
            </form>
            <h3>{message}</h3>
            <p>
                Already have an account?
                <button
                    className="link-button"
                    onClick={()=>{
                        setMessage("");
                        setPage("login");
                    }}
                >
                    Login
                </button>
            </p>
            <button
                onClick={()=>{
                    setMessage("");
                    setPage("stafflogin");
                }}
            >
                Staff Login
            </button>
            <button
                onClick={()=>{
                    setMessage("");
                    setPage("adminlogin");
                }}
            >
                Admin Login
            </button>
        </div>
    );
}

//customer login page
function UserLogin({
    loginData,
    setLoginData,
    handleLogin,
    message,
    setMessage,
    setPage
}){
    return(
        <div className="container">
            <h1>QueueLess</h1>
            <p>Smart Bank Queue Management System</p>
            <h2>Customer Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={loginData.email}
                    onChange={(e)=>setLoginData({
                        ...loginData,
                        email:e.target.value
                    })}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={loginData.password}
                    onChange={(e)=>setLoginData({
                        ...loginData,
                        password:e.target.value
                    })}
                    required
                />
                <button type="submit">Login</button>
            </form>
            <h3>{message}</h3>
            <p>
                Don't have an account?
                <button
                    className="link-button"
                    onClick={()=>{
                        setMessage("");
                        setPage("signup");
                    }}
                >
                    Sign Up
                </button>
            </p>
            <button
                onClick={()=>{
                    setMessage("");
                    setPage("stafflogin");
                }}
            >
                Staff Login
            </button>
            <button
                onClick={()=>{
                    setMessage("");
                    setPage("adminlogin");
                }}
            >
                Admin Login
            </button>
        </div>
    );
}

//staff login page
function StaffLogin({
    staffData,
    setStaffData,
    handleStaffLogin,
    message,
    setMessage,
    setPage
}){
    return(
        <div className="container">
            <h1>QueueLess</h1>
            <p>Staff Portal</p>
            <h2>Staff Login</h2>
            <form onSubmit={handleStaffLogin}>
                <input
                    type="email"
                    placeholder="Staff Email"
                    value={staffData.email}
                    onChange={(e)=>setStaffData({
                        ...staffData,
                        email:e.target.value
                    })}
                    required
                />
                <input
                    type="password"
                    placeholder="Staff Password"
                    value={staffData.password}
                    onChange={(e)=>setStaffData({
                        ...staffData,
                        password:e.target.value
                    })}
                    required
                />
                <button type="submit">Staff Login</button>
            </form>
            <h3>{message}</h3>
            <button
                onClick={()=>{
                    setMessage("");
                    setPage("login");
                }}
            >
                Back to Customer Login
            </button>
            <button
                onClick={()=>{
                    setMessage("");
                    setPage("adminlogin");
                }}
            >
                Admin Login
            </button>
        </div>
    );
}

//admin login page
function AdminLogin({
    adminData,
    setAdminData,
    handleAdminLogin,
    message,
    setMessage,
    setPage
}){
    return(
        <div className="container">
            <h1>QueueLess</h1>
            <p>Administration Portal</p>
            <h2>Admin Login</h2>
            <form onSubmit={handleAdminLogin}>
                <input
                    type="email"
                    placeholder="Admin Email"
                    value={adminData.email}
                    onChange={(e)=>setAdminData({
                        ...adminData,
                        email:e.target.value
                    })}
                    required
                />
                <input
                    type="password"
                    placeholder="Admin Password"
                    value={adminData.password}
                    onChange={(e)=>setAdminData({
                        ...adminData,
                        password:e.target.value
                    })}
                    required
                />
                <button type="submit">Admin Login</button>
            </form>
            <h3>{message}</h3>
            <button
                onClick={()=>{
                    setMessage("");
                    setPage("login");
                }}
            >
                Back to Customer Login
            </button>
            <button
                onClick={()=>{
                    setMessage("");
                    setPage("stafflogin");
                }}
            >
                Staff Login
            </button>
        </div>
    );
}

//customer dashboard
function CustomerDashboard({
    customer,
    customerLogout,
    message,
    services,
    selectedService,
    setSelectedService,
    generateToken,
    loadServices,
    loadTokens,
    tokens,
    allTokens,
    getQueuePosition,
    getWaitTime
}){
    if(!customer){
        return(
            <div className="container">
                <h2>Please Login</h2>
            </div>
        );
    }

    return(
        <div className="dashboard">
            <div className="navbar">
                <h2>Customer Dashboard</h2>
                <button onClick={customerLogout}>Logout</button>
            </div>

            <div className="welcome">
                <h2>Welcome, {customer.username}!</h2>
                <p>Select a bank service and generate your token.</p>
                <h3>{message}</h3>
            </div>

            <div className="section">
                <h2>Bank Services</h2>

                <select
                    value={selectedService}
                    onChange={(e)=>setSelectedService(e.target.value)}
                >
                    <option value="">Select a service</option>

                    {services.map((service)=>(
                        <option
                            key={service._id||service.servicename}
                            value={service.servicename}
                        >
                            {service.servicename}
                        </option>
                    ))}
                </select>

                <button onClick={generateToken}>
                    Generate Token
                </button>

                <button
                    onClick={()=>{
                        loadServices();
                        loadTokens(customer.username);
                    }}
                >
                    Refresh Services
                </button>
            </div>

            <div className="section">
                <h2>My Tokens</h2>

                <button
                    onClick={()=>{
                        loadTokens(customer.username);
                    }}
                >
                    Refresh My Queue
                </button>

                {tokens.length===0?(
                    <p>No tokens generated yet</p>
                ):(
                    tokens.map((token)=>(
                        <div
                            className="token-card"
                            key={token._id}
                        >
                            <h3>{token.tokennumber}</h3>

                            <p>
                                Service: {token.service}
                            </p>

                            <p>
                                Status: {token.status}
                            </p>

                            {token.status==="WAITING"&&(
                                <div>
                                    <p>
                                        Queue Position:{" "}
                                        {getQueuePosition(
                                            token._id,
                                            allTokens
                                        )||"Calculating..."}
                                    </p>

                                    <p>
                                        Estimated Waiting Time:{" "}
                                        {getWaitTime(
                                            token._id,
                                            allTokens
                                        )} minutes
                                    </p>
                                </div>
                            )}

                            {token.status==="CALLED"&&(
                                <p>
                                    Please proceed to the service counter.
                                </p>
                            )}

                            {token.status==="IN_SERVICE"&&(
                                <p>
                                    Your service is currently in progress.
                                </p>
                            )}

                            {token.status==="COMPLETED"&&(
                                <p>
                                    Service completed.
                                </p>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

//staff dashboard
function StaffDashboard({
    staffLoggedIn,
    staffLogout,
    message,
    loadQueue,
    staffAuth,
    callNext,
    queue,
    startService,
    completeService
}){
    if(!staffLoggedIn){
        return(
            <div className="container">
                <h2>Staff Login Required</h2>
            </div>
        );
    }

    return(
        <div className="dashboard">
            <div className="navbar">
                <h2>Staff Dashboard</h2>
                <button onClick={staffLogout}>Logout</button>
            </div>

            <div className="welcome">
                <h2>Queue Management</h2>
                <h3>{message}</h3>

                <button onClick={()=>loadQueue(staffAuth)}>
                    Refresh Queue
                </button>

                <button onClick={callNext}>
                    Call Next Customer
                </button>
            </div>

            <div className="section">
                <h2>Current Queue</h2>

                {queue.length===0?(
                    <p>No customers in queue.</p>
                ):(
                    queue.map((token)=>(
                        <div
                            className="token-card"
                            key={token._id}
                        >
                            <h3>
                                Token: {token.tokennumber}
                            </h3>

                            <p>
                                Customer: {token.username}
                            </p>

                            <p>
                                Service: {token.service}
                            </p>

                            <p>
                                Status: {token.status}
                            </p>

                            {token.status==="CALLED"&&(
                                <button
                                    onClick={()=>
                                        startService(token._id)
                                    }
                                >
                                    Start Service
                                </button>
                            )}

                            {token.status==="IN_SERVICE"&&(
                                <button
                                    onClick={()=>
                                        completeService(token._id)
                                    }
                                >
                                    Complete Service
                                </button>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

//admin dashboard
function AdminDashboard({
    adminLoggedIn,
    adminLogout,
    message,
    newService,
    setNewService,
    addService,
    allServices,
    loadAllServices,
    adminAuth,
    deleteService
}){
    const descriptions={
        "Cash Deposit":"Deposit cash into bank account",
        "Cash Withdrawal":"Withdraw cash from bank account",
        "Account Opening":"Open a new bank account",
        "Money Transfer":"Transfer money to another account",
        "Cheque Deposit":"Deposit cheque into bank account",
        "Passbook Update":"Update bank passbook"
    };

    if(!adminLoggedIn){
        return(
            <div className="container">
                <h2>Admin Login Required</h2>
            </div>
        );
    }

    return(
        <div className="dashboard">
            <div className="navbar">
                <h2>Admin Dashboard</h2>
                <button onClick={adminLogout}>Logout</button>
            </div>

            <div className="welcome">
                <h2>Service Management</h2>
                <h3>{message}</h3>
            </div>

            <div className="section">
                <h2>Add New Service</h2>

                <select
                    value={newService.name}
                    onChange={(e)=>{
                        const name=e.target.value;

                        setNewService({
                            name:name,
                            description:descriptions[name]||""
                        });
                    }}
                >
                    <option value="">Select a service</option>

                    {defaultServices.map((service)=>(
                        <option
                            key={service}
                            value={service}
                        >
                            {service}
                        </option>
                    ))}
                </select>

                <input
                    type="text"
                    placeholder="Service Description"
                    value={newService.description}
                    onChange={(e)=>setNewService({
                        ...newService,
                        description:e.target.value
                    })}
                />

                <button onClick={addService}>
                    Add Service
                </button>
            </div>

            <div className="section">
                <h2>Available Services</h2>

                <button
                    onClick={()=>loadAllServices(adminAuth)}
                >
                    Refresh Services
                </button>

                {allServices.length===0?(
                    <p>No services available.</p>
                ):(
                    allServices.map((service)=>(
                        <div
                            className="service-card"
                            key={service._id}
                        >
                            <h3>
                                {service.servicename}
                            </h3>

                            <p>
                                {service.servicedescription}
                            </p>

                            <p>
                                Status:{" "}
                                {service.serviceactive?
                                "Active":
                                "Inactive"}
                            </p>

                            <button
                                onClick={()=>
                                    deleteService(service._id)
                                }
                            >
                                Delete
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

//main app
function App(){
    const [page,setPage]=useState("signup");
    const [customer,setCustomer]=useState(null);

    const [signupData,setSignupData]=useState({
        username:"",
        age:"",
        gender:"",
        email:"",
        password:""
    });

    const [loginData,setLoginData]=useState({
        email:"",
        password:""
    });

    const [staffData,setStaffData]=useState({
        email:"",
        password:""
    });

    const [adminData,setAdminData]=useState({
        email:"",
        password:""
    });

    const [staffAuth,setStaffAuth]=useState({
        email:"",
        password:""
    });

    const [adminAuth,setAdminAuth]=useState({
        email:"",
        password:""
    });

    const [services,setServices]=useState([]);
    const [allServices,setAllServices]=useState([]);
    const [tokens,setTokens]=useState([]);
    const [allTokens,setAllTokens]=useState([]);
    const [queue,setQueue]=useState([]);

    const [selectedService,setSelectedService]=useState("");

    const [newService,setNewService]=useState({
        name:"",
        description:""
    });

    const [message,setMessage]=useState("");

    const [staffLoggedIn,setStaffLoggedIn]=useState(false);
    const [adminLoggedIn,setAdminLoggedIn]=useState(false);

    //load services
    const loadServices=()=>{
        axios.get(`${API}/getservices`)
        .then((response)=>{
            if(response.data.length>0){
                setServices(response.data);
            }
            else{
                setServices(
                    defaultServices.map((name,index)=>({
                        _id:"default-"+index,
                        servicename:name,
                        servicedescription:"",
                        serviceactive:true
                    }))
                );
            }
        })
        .catch((error)=>{
            console.log(error);

            setServices(
                defaultServices.map((name,index)=>({
                    _id:"default-"+index,
                    servicename:name,
                    servicedescription:"",
                    serviceactive:true
                }))
            );
        });
    };

    //load all services
    const loadAllServices=(auth=adminAuth)=>{
        if(!auth.email||!auth.password){
            return;
        }

        axios.get(
            `${API}/getallservices`,
            {
                headers:{
                    adminemail:auth.email,
                    adminpassword:auth.password
                }
            }
        )
        .then((response)=>{
            setAllServices(response.data);
        })
        .catch((error)=>{
            console.log(error);

            setMessage(
                error.response?.data?.message||
                "Error loading services!"
            );
        });
    };

    //load tokens
    const loadTokens=(username)=>{
        if(!username){
            return;
        }

        axios.get(`${API}/gettokens`)
        .then((response)=>{
            const all=response.data;

            setAllTokens(all);

            const customerTokens=all.filter(
                (token)=>token.username===username
            );

            setTokens(customerTokens);
        })
        .catch((error)=>{
            console.log(error);
            setMessage("Error loading tokens!");
        });
    };

    //load staff queue
    const loadQueue=(auth=staffAuth)=>{
        if(!auth.email||!auth.password){
            return;
        }

        axios.get(
            `${API}/getqueue`,
            {
                headers:{
                    staffemail:auth.email,
                    staffpassword:auth.password
                }
            }
        )
        .then((response)=>{
            setQueue(response.data);
        })
        .catch((error)=>{
            console.log(error);

            if(error.response?.status===401){
                setStaffLoggedIn(false);
                setPage("stafflogin");
            }

            setMessage(
                error.response?.data?.message||
                "Error loading queue!"
            );
        });
    };

    //signup
    const handleSignup=(e)=>{
        e.preventDefault();

        axios.post(
            `${API}/register`,
            signupData
        )
        .then((response)=>{
            setMessage(response.data.message);

            setSignupData({
                username:"",
                age:"",
                gender:"",
                email:"",
                password:""
            });

            setPage("login");
        })
        .catch((error)=>{
            setMessage(
                error.response?.data?.message||
                "Error creating account!"
            );
        });
    };

    //customer login
    const handleLogin=(e)=>{
        e.preventDefault();

        axios.post(
            `${API}/login`,
            loginData
        )
        .then((response)=>{
            const loggedCustomer=response.data.customer;

            setCustomer(loggedCustomer);

            setMessage(response.data.message);

            setLoginData({
                email:"",
                password:""
            });

            loadServices();
            loadTokens(loggedCustomer.username);

            setPage("customer");
        })
        .catch((error)=>{
            setMessage(
                error.response?.data?.message||
                "Login Failed!"
            );
        });
    };

    //staff login
    const handleStaffLogin=(e)=>{
        e.preventDefault();

        axios.post(
            `${API}/stafflogin`,
            {
                staffemail:staffData.email,
                staffpassword:staffData.password
            }
        )
        .then((response)=>{
            const credentials={
                email:staffData.email,
                password:staffData.password
            };

            setStaffAuth(credentials);
            setStaffLoggedIn(true);

            setMessage(response.data.message);

            setStaffData({
                email:"",
                password:""
            });

            loadQueue(credentials);

            setPage("staff");
        })
        .catch((error)=>{
            setMessage(
                error.response?.data?.message||
                "Staff Login Failed!"
            );
        });
    };

    //admin login
    const handleAdminLogin=(e)=>{
        e.preventDefault();

        axios.post(
            `${API}/adminlogin`,
            {
                adminemail:adminData.email,
                adminpassword:adminData.password
            }
        )
        .then((response)=>{
            const credentials={
                email:adminData.email,
                password:adminData.password
            };

            setAdminAuth(credentials);
            setAdminLoggedIn(true);

            setMessage(response.data.message);

            setAdminData({
                email:"",
                password:""
            });

            loadAllServices(credentials);

            setPage("admin");
        })
        .catch((error)=>{
            setMessage(
                error.response?.data?.message||
                "Admin Login Failed!"
            );
        });
    };

    //generate token
    const generateToken=()=>{
        if(!customer){
            setMessage("Please login first!");
            return;
        }

        if(!selectedService){
            setMessage("Please select a service!");
            return;
        }

        axios.post(
            `${API}/generatetoken`,
            {
                username:customer.username,
                service:selectedService
            }
        )
        .then((response)=>{
            setMessage(
                `Token ${response.data.token.tokennumber} Generated!`
            );

            setSelectedService("");

            loadTokens(customer.username);
        })
        .catch((error)=>{
            setMessage(
                error.response?.data?.message||
                "Token generation failed!"
            );
        });
    };

    //add service
    const addService=()=>{
        if(!newService.name||!newService.description){
            setMessage("Please enter service details!");
            return;
        }

        axios.post(
            `${API}/addservice`,
            {
                servicename:newService.name,
                servicedescription:newService.description
            },
            {
                headers:{
                    adminemail:adminAuth.email,
                    adminpassword:adminAuth.password
                }
            }
        )
        .then((response)=>{
            setMessage(response.data.message);

            setNewService({
                name:"",
                description:""
            });

            loadAllServices(adminAuth);
            loadServices();
        })
        .catch((error)=>{
            setMessage(
                error.response?.data?.message||
                "Error adding service!"
            );
        });
    };

    //delete service
    const deleteService=(id)=>{
        axios.delete(
            `${API}/deleteservice`,
            {
                headers:{
                    adminemail:adminAuth.email,
                    adminpassword:adminAuth.password
                },
                data:{
                    serviceid:id
                }
            }
        )
        .then((response)=>{
            setMessage(response.data.message);

            loadAllServices(adminAuth);
            loadServices();
        })
        .catch((error)=>{
            setMessage(
                error.response?.data?.message||
                "Error deleting service!"
            );
        });
    };

    //call next customer
    const callNext=()=>{
        axios.put(
            `${API}/callnext`,
            {},
            {
                headers:{
                    staffemail:staffAuth.email,
                    staffpassword:staffAuth.password
                }
            }
        )
        .then((response)=>{
            setMessage(response.data.message);
            loadQueue(staffAuth);
            loadTokens(customer?.username);
        })
        .catch((error)=>{
            setMessage(
                error.response?.data?.message||
                "Error calling customer!"
            );
        });
    };

    //start service
    const startService=(tokenid)=>{
        axios.put(
            `${API}/startservice`,
            {
                tokenid:tokenid
            },
            {
                headers:{
                    staffemail:staffAuth.email,
                    staffpassword:staffAuth.password
                }
            }
        )
        .then((response)=>{
            setMessage(response.data.message);
            loadQueue(staffAuth);
            loadTokens(customer?.username);
        })
        .catch((error)=>{
            setMessage(
                error.response?.data?.message||
                "Error starting service!"
            );
        });
    };

    //complete service
    const completeService=(tokenid)=>{
        axios.put(
            `${API}/completeservice`,
            {
                tokenid:tokenid
            },
            {
                headers:{
                    staffemail:staffAuth.email,
                    staffpassword:staffAuth.password
                }
            }
        )
        .then((response)=>{
            setMessage(response.data.message);
            loadQueue(staffAuth);
            loadTokens(customer?.username);
        })
        .catch((error)=>{
            setMessage(
                error.response?.data?.message||
                "Error completing service!"
            );
        });
    };

    //customer logout
    const customerLogout=()=>{
        setCustomer(null);
        setTokens([]);
        setAllTokens([]);
        setQueue([]);
        setSelectedService("");
        setMessage("Logged out successfully!");
        setPage("login");
    };

    //staff logout
    const staffLogout=()=>{
        setStaffLoggedIn(false);

        setStaffAuth({
            email:"",
            password:""
        });

        setQueue([]);
        setMessage("Staff logged out successfully!");
        setPage("stafflogin");
    };

    //admin logout
    const adminLogout=()=>{
        setAdminLoggedIn(false);

        setAdminAuth({
            email:"",
            password:""
        });

        setAllServices([]);
        setMessage("Admin logged out successfully!");
        setPage("adminlogin");
    };

    //queue position
    const getQueuePosition=(tokenId,tokenList)=>{
        const waitingTokens=tokenList.filter(
            (token)=>token.status==="WAITING"
        );

        const position=waitingTokens.findIndex(
            (token)=>token._id===tokenId
        );

        if(position===-1){
            return null;
        }

        return position+1;
    };

    //waiting time
    const getWaitTime=(tokenId,tokenList)=>{
        const position=getQueuePosition(
            tokenId,
            tokenList
        );

        if(!position){
            return 0;
        }

        return (position-1)*5;
    };

    //page navigation
    if(page==="signup"){
        return(
            <Register
                signupData={signupData}
                setSignupData={setSignupData}
                handleSignup={handleSignup}
                message={message}
                setMessage={setMessage}
                setPage={setPage}
            />
        );
    }

    if(page==="login"){
        return(
            <UserLogin
                loginData={loginData}
                setLoginData={setLoginData}
                handleLogin={handleLogin}
                message={message}
                setMessage={setMessage}
                setPage={setPage}
            />
        );
    }

    if(page==="stafflogin"){
        return(
            <StaffLogin
                staffData={staffData}
                setStaffData={setStaffData}
                handleStaffLogin={handleStaffLogin}
                message={message}
                setMessage={setMessage}
                setPage={setPage}
            />
        );
    }

    if(page==="adminlogin"){
        return(
            <AdminLogin
                adminData={adminData}
                setAdminData={setAdminData}
                handleAdminLogin={handleAdminLogin}
                message={message}
                setMessage={setMessage}
                setPage={setPage}
            />
        );
    }

    if(page==="customer"){
        return(
            <CustomerDashboard
                customer={customer}
                customerLogout={customerLogout}
                message={message}
                services={services}
                selectedService={selectedService}
                setSelectedService={setSelectedService}
                generateToken={generateToken}
                loadServices={loadServices}
                loadTokens={loadTokens}
                tokens={tokens}
                allTokens={allTokens}
                getQueuePosition={getQueuePosition}
                getWaitTime={getWaitTime}
            />
        );
    }

    if(page==="staff"){
        return(
            <StaffDashboard
                staffLoggedIn={staffLoggedIn}
                staffLogout={staffLogout}
                message={message}
                loadQueue={loadQueue}
                staffAuth={staffAuth}
                callNext={callNext}
                queue={queue}
                startService={startService}
                completeService={completeService}
            />
        );
    }

    if(page==="admin"){
        return(
            <AdminDashboard
                adminLoggedIn={adminLoggedIn}
                adminLogout={adminLogout}
                message={message}
                newService={newService}
                setNewService={setNewService}
                addService={addService}
                allServices={allServices}
                loadAllServices={loadAllServices}
                adminAuth={adminAuth}
                deleteService={deleteService}
            />
        );
    }

    return <Register/>;
}

export default App;