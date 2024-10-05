import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Signin from '../Pages/Signin'
import axios, { AxiosHeaders } from "axios"

function Sheet() {
   
    const [Signupdata, setSignupinfo] = useState({
        firstName:'',
        lastName:'',
        email:'',
        password:''
    })
    console.log(Signupdata)
    const dataCopy = {...Signupdata}

    const handleChange = (e)=>{
          const {name , value} = e.target;

          dataCopy[name] = value;
    }
    
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setSignupinfo((prev)=>dataCopy);
        const {firstName, lastName, email, password} = Signupdata;

        if (firstName&&lastName&&email&&password) {
            
            try {
                const req = await axios.post("http://localhost:3000/user/signup",Signupdata,{
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  })
            } catch (error) {
                console.log("can not sent the signup post req",error.response.data.err2)
            }
        }
        

    }

  return (
    <section onSubmit={handleSubmit} className='flex flex-col justify-center items-center'>
        <h3>Signup</h3>
      <form>
       <div className='flex flex-col mt-5'>
         <span>First Name</span>
         <input onChange={handleChange} className='w-60' type="text" name='firstName' placeholder='Enter Your First Name'/>
       </div>

       <div className='flex flex-col mt-5'>
         <span>Last Name</span>
         <input onChange={handleChange} className='w-60' type="text" name='lastName' placeholder='Enter Your Last Name'/>
       </div>

       <div className='flex flex-col mt-5'>
         <span>Email</span>
         <input onChange={handleChange} className='w-60' type="Email" name='email' placeholder='Enter Your Email'/>
       </div>

       <div className='flex flex-col mt-5'>
         <span>Password</span>
         <input onChange={handleChange} className='w-60' type="password" name='password' placeholder='Enter Your Passoword'/>
       </div>

       <button className='mt-7 w-28 h-6 bg-blue-600'>Signup </button>
       <span>Already have an account?a
         <Link to={"/signin"}>Signin</Link>
       </span>
      </form>
    </section>
  )
}

export default Sheet
