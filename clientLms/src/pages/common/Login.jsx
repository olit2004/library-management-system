import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth"; 
import AuthForm from "./AuthForm";
import { login } from "../../api/auth";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const { setUser} = useAuth(); 
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  
  const from = location.state?.from?.pathname || "/member";

  const handleLogin = async (data) => {
    setLoading(true);
    try {
      const res = await login(data);
      console.log("Login res:", res.data);
      const user = res.data;

      // 2. Update Global Context State
      setUser(user); 

      toast.success("Welcome back!");

      // 3. Redirect based on role or original destination
      if (user.role === "ADMIN" || user.role === "LIBRARIAN") {
        navigate("/librarian", { replace: true });
      } else {
        navigate("/member", { replace: true });
      }  
    } catch (err) {
      console.error("Login Error:", err);
      const errorMsg = err.originalError?.mssg || err.originalError?.message || "Login failed. Please check your credentials.";
      toast.error(errorMsg);
      throw new Error(errorMsg); 
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
          title="Welcome Back" 
          subtitle="Please enter your details to access your library account."
          fields={["email", "password"]} 
          onSubmit={handleLogin} 
          buttonText="Sign In" 
          loading={loading}
        />

        
      </div>
    </div>
  );
}