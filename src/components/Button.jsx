const Button = ({ className, onClick, type, children }) => {
  return (
    <button
      className={`${className} px-4 py-2 rounded-md text-white`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
