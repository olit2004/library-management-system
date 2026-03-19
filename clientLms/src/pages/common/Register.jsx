import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from './AuthForm';
import { register } from "../../api/auth";
import { toast } from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';

export default function Register() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (data) => {
    console.log("registering with this data in with:", data);
    setLoading(true);

    try {
       const res = await register(data);
       console.log(res.data);
       const user = res.data;

       // 2. Update Global Context State
       setUser(user);

       toast.success("Welcome! Your account has been created.");
       navigate("/member");
    } catch(err) {

        console.log("the original error is", err.originalError?.errors);
        const errorMsg = err.originalError?.mssg || err.originalError?.message || "Registration failed. Please try again.";
        toast.error(errorMsg);
        throw err.originalError;
    } finally {
        setLoading(false);
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
            loading={loading}
            />

            
          </div>
        </div>
  )
}
