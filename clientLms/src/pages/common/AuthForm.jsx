import { useState } from "react";
import { Mail, Lock, User, MapPin, KeyRound, Fingerprint } from "lucide-react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

const fieldConfig = {
  firstName: { label: "First Name", icon: User, placeholder: "Abebe" },
  lastName: { label: "Last Name", icon: Fingerprint, placeholder: "Kebede" },
  email: { label: "Email Address", icon: Mail, placeholder: "jane.doe@example.com" },
  password: { label: "Password", icon: Lock, placeholder: "••••••••" },
  confirmPassword: { label: "Confirm Password", icon: KeyRound, placeholder: "••••••••" },
  address: { label: "Home Address", icon: MapPin, placeholder: "123 Library St." },
};

export default function AuthForm({ title, fields, onSubmit, buttonText, subtitle }) {
  const initialState = fields.reduce((acc, field) => {
    acc[field] = "";
    return acc;
  }, {});

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    fields.forEach((field) => {
      // 1. Basic Required Check
      if (field !== "address" && !formData[field].trim()) {
        newErrors[field] = "Required";
      }
      
      // 2. Email Validation
      if (field === "email" && formData.email && !emailRegex.test(formData.email)) {
        newErrors.email = "Invalid email format";
      }
    });
    
    // 3. Password Match Check
    if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError("")
    if (!validate()) return;
    try {
      await onSubmit(formData);
    }  
    catch (err) {
    

      console.log("error is " ,err )
      
    // const backendErrors = err.errors;
    // console.log(err)
    // console.log("errorlanfnal",backendErrors)
    // if (backendErrors) {
      
    //   setErrors(backendErrors);
    //   setGeneralError(""); 
    // } else {
    //   console.log(err)
      
    //   // setGeneralError(err?.mssg || err?.message || "Something went wrong");
    // }
  }
}

  return (
    /* Modern Glassmorphism with enhanced effects */
    <div className="w-[95%] sm:w-full sm:max-w-md p-6 sm:p-8 
                    bg-linear-to-br from-white/10 via-white/15 to-white/5
                    backdrop-blur-2xl
                    rounded-xl sm:rounded-3xl
                    shadow-2xl shadow-gray-900/20
                    border border-white/30 border-l-white/40 border-t-white/40
                    relative
                    overflow-hidden
                    before:absolute before:inset-0 
                    before:bg-linear-to-br before:from-white/10 before:to-transparent
                    before:pointer-events-none">
      
      {/* Optional subtle glow effect */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-teal-400/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-400/10 rounded-full blur-3xl" />
      
      <div    className="relative z-10">
        <div  className="mb-6 sm:mb-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight 
                         bg-linear-to-r from-gray-800 to-gray-900 bg-clip-text ">
            {title}
          </h2>
          {subtitle && <p className="text-gray-800 mt-2 text-sm font-medium">{subtitle}</p>}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          
          {fields.includes("firstName") && fields.includes("lastName") && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                name="firstName"
                label={fieldConfig.firstName.label}
                icon={fieldConfig.firstName.icon}
                placeholder={fieldConfig.firstName.placeholder}
                value={formData.firstName}
                onChange={handleChange}
                error={errors.firstName}
              
              />
              <Input
                name="lastName"
                label={fieldConfig.lastName.label}
                icon={fieldConfig.lastName.icon}
                placeholder={fieldConfig.lastName.placeholder}
                value={formData.lastName}
                onChange={handleChange}
                error={errors.lastName}
              />
            </div>
          )}

          {fields
            .filter((f) => f !== "firstName" && f !== "lastName")
            .map((field) => {
              const config = fieldConfig[field] || { 
                label: field.charAt(0).toUpperCase() + field.slice(1), 
                icon: null 
              };

              return (
                <Input
                  key={field}
                  name={field}
                  label={config.label}
                  icon={config.icon}
                  type={field.toLowerCase().includes("password") ? "password" : "text"}
                  placeholder={config.placeholder || config.label}
                  value={formData[field]}
                  onChange={handleChange}
                  error={errors[field]}
                />
              );
            })}
            {generalError && (
            <p className="text-red-600 text-sm font-medium text-center mb-2">
              {generalError}
            </p>
          )}
                    
          <div className="pt-4">
            <Button 
              type="submit" 
              className="w-full"
            >
              {buttonText}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}