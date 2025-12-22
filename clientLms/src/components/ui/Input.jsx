// components/ui/Input.jsx or .tsx
export default function Input({ 
  name, 
  label, 
  icon: Icon, 
  type = "text", 
  placeholder, 
  value, 
  onChange, 
  error 
}) {
  return (
    <div className="space-y-2">
      {label && (
        <label 
          htmlFor={name}
          className="block text-sm font-medium text-gray-800"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <Icon className="w-5 h-5 text-gray-600" />
          </div>
        )}
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`
            w-full
            pl-${Icon ? '10' : '4'} pr-4 py-3
            bg-white/40
            backdrop-blur-sm
            border ${error ? 'border-red-400/50' : 'border-white/50'}
            focus:border-teal-400/70
            focus:ring-2 focus:ring-teal-300/30
            rounded-xl
            placeholder:text-gray-600
            text-gray-900
            transition-all duration-200
            focus:outline-none
            focus:bg-white/50
            hover:bg-white/50
            shadow-sm
          `}
        />
      </div>
      {error && (
        <p className="text-sm text-red-500 font-lg px-2 py-1">
          {error}
        </p>
      )}
    </div>
  );
}