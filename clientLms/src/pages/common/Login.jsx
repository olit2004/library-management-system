import AuthForm from "./AuthForm";
import {login} from "../../api/auth"

export default function LoginPage() {

  const handleLogin = async (data) => {

    try{
       const res= await login(data);
       console.log(res);

    }catch(err){
      console.log(err)
    }


    console.log("Logging in with:", data);
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