

export default function Badge({ children, variant = "success" }) {
  const styles = {
    success: "bg-green-50 text-green-700 border-green-100",
    danger: "bg-red-50 text-red-700 border-red-100",
    warning: "bg-orange-50 text-orange-700 border-orange-100",
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${styles[variant]}`}>
      {children}
    </span>
  );
}