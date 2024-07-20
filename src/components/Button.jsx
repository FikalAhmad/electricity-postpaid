/**
 * Button component - Komponen button untuk membuat tombol button menjadi reusable dan bisa digunakan secara berulang kali.
 *
 * @param {object} props - Komponen properti.
 * @param {string} props.className - Kelas CSS tambahan untuk button.
 * @param {function} props.onClick - Fungsi yang dipanggil saat button diklik.
 * @param {string} props.type - Jenis button (e.g., "button", "submit").
 * @param {React.ReactNode} props.children - Konten didalam parent button.
 *
 * @returns {JSX.Element} Komponen button yang sudah diatur.
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
