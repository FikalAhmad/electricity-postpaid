/**
 * ${1:Description placeholder}
 *
 * @param {{ className: any; onClick: any; type: any; children: any; }} param0
 * @param {${2:*}} param0.className
 * @param {${3:*}} param0.onClick
 * @param {${4:*}} param0.type
 * @param {${5:*}} param0.children
 * @returns {${6:*}\}
 */
const Button = ({ className, onClick, type, children }) => {
  return (
    <button
      className={`${className} px-4 py-2 text-white`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
