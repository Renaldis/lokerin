export default function Button({ children, className, ...props }) {
  return (
    <button
      className={`px-6 py-1 rounded-sm cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
