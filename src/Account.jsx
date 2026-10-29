import react, {useState } from "react";
import "./Account.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Account(){

    const[isLoginForm, setIsLoginForm] = useState(true)
    const[isSignupForm, setIsSignupForm] = useState(false)
    const[isOtpForm, setIsOtpForm] = useState(false)
    const[otp, setOtp] = useState("")

    const[email, setEmail] = useState("")
    const[name, setName] = useState("")
    const[password, setPassword] = useState("")

    const navigate = useNavigate()


    const verifyUser = ()=>{
        if(email.trim()=="" || password.trim()==""){
            alert("Please fill the details")
            return;
        }

        axios.post(`http://localhost:8080/login?email=${email}&password=${password}`)
        .then((res)=>{
            if(res.data==""){
                alert("Wrong credentials")
                return;
            }

            navigate("/user", {state:{user: res.data}})
            
        })

    }

    const createAccount =  () =>{
        if(name.trim()=="" || email.trim()=="" || password.trim()=="") {
            alert("Please fill all details")
            return;

        }
           
        axios.post("http://localhost:8080/signup",{
            name: name,
            email: email,
            password: password
        })
        .then((res)=>{
            if(res.data){
                alert("OTP has been sent to your email")
                setIsLoginForm(false)
                setIsSignupForm(false)
                setIsOtpForm(true)
            }
        })
    }

    const verifyOtp = ()=>{
        if(otp.trim=="") {
            alert("please enter OTP")
            return;
        }

        axios.post("http://localhost:8080/verify-otp",{
            value: otp,
            email: email
        })
        .then((res)=>{
            if(res.data){
                alert("OTP verified\nYou can login now")
                setEmail("")
                setName("")
                setPassword("")
                setIsOtpForm(false)
                setIsLoginForm(true)
                setIsSignupForm(false)
            }
            else{
                alert("Wrong OTP\nPlease restart")
                setEmail("")
                setName("")
                setPassword("")
                setIsOtpForm(false)
                setIsLoginForm(false)
                setIsSignupForm(true)
            }
        })

    }


   return(
    <>
        <div id="ac-parent">
            <h1>INKWELL</h1>




           {isLoginForm && 
                 <div id="login"> 
                <h2>Login to your account</h2>

                <input
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                placeholder="Enter your email"
                />

                <input
                value={password}
                type="password"
                onChange={(e)=> setPassword(e.target.value)}
                placeholder="Enter your password"
                />

                <button onClick={verifyUser}>Login</button>

                <Link onClick={()=>{
                    setIsLoginForm(false)
                    setIsSignupForm(true)
                }}>Don't have an account? Signup</Link>
            </div>
           }






            {isSignupForm && 
                <div id="signup">
                 <h2>Create a new account</h2>

                 <input
                 placeholder="Enter your name"
                 value={name}
                 onChange={(e)=> setName(e.target.value)}
                 />

                <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                />

                <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                />

                <button onClick={createAccount}>Signup</button>

                <Link onClick={()=>{
                    setIsLoginForm(true)
                    setIsSignupForm(false)
                }}>Already have an account? Login</Link>
            </div>

            }

            {isOtpForm && 
                
            <div id="login">
                <h2>Verify Otp</h2>
                <input
                placeholder="Enter your Otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                />

                <button onClick={verifyOtp}>Verify</button>
            </div>}


        </div>
    </>

   )
}

export default Account;