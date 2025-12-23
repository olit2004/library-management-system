
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth"; 
import AuthForm from "./AuthForm";
import { login } from "../../api/auth";

export default function LoginPage() {
  const { setUser} = useAuth(); 
  const navigate = useNavigate();
  const location = useLocation();

  
  const from = location.state?.from?.pathname || "/member";

  const handleLogin = async (data) => {
    try {
      const res = await login(data);
      console.log(res.data)
      const  user  = res.data;

      

      // 2. Update Global Context State
      setUser(user); 
      console.log("the user is here ",user)

      // 3. Redirect based on role or original destination
      if (user.role === "ADMIN" || user.role === "LIBRARIAN") {
        navigate("/admin");
      } else {
        navigate(from, { replace: true });
      }

      
    } catch (err) {
  
    throw new Error(err.originalError?.mssg); 
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
        />
        
      </div>
    </div>
  );
}