import React from 'react'
import AuthForm from './AuthForm'
import {register} from "../../api/auth"
export default function Register() {

const handleRegister = async (data) => {
    console.log("registering with this data in with:", data);

    try{
       const res= await register(data);
       console.log(res.data);
       alert("user registers ",res.data)

    }catch(err){
        console.log( " the original error is",err.originalError.errors)
        throw  err.originalError 
    }


  };
  return (




        <div 
          className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat p-4"
          style={{ 
            backgroundImage: `url("src/assets/bg.avif")`,
            
            background: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.4)), url("src/assets/bg.avif") center/cover`
          }}
        >
       
          <div className="relative z-10 w-full flex justify-center">
       <AuthForm 
            title="Create Account" 
            subtitle="Join our community and start borrowing today."
            fields={["firstName", "lastName", "email", "password", "confirmPassword"]} 
            onSubmit={handleRegister} 
            buttonText="Register" 
            />
            
          </div>
        </div>
  )
}
