/**
 * Modal component - Komponen modal untuk membuat popup/dialog untuk konfirmasi.
 *
 * @param {object} props - Komponen properti.
 * @param {string} props.show - Kelas CSS tambahan untuk button.
 * @param {function} props.onClose - Fungsi yang dipanggil saat button diklik.
 * @param {string} props.onConfirm - Jenis button (e.g., "button", "submit").
 *
 * @returns {JSX.Element} Komponen button yang sudah diatur.
 */
const Modal = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-md shadow-md w-1/3">
        <h2 className="text-lg font-semibold mb-4">Konfirmasi Penghapusan</h2>
        <p className="mb-6">Apakah Anda yakin ingin menghapus data ini?</p>
        <div className="flex justify-end">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
            onClick={onConfirm}
          >
            Hapus
          </button>
          <button
            className="bg-gray-300 text-black px-4 py-2 rounded-md"
            onClick={onClose}
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
