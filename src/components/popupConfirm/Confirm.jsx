import { useContext } from "react";
import { useGlobalContext } from "../../context/useGlobalContext";

export default function ConfirmModal({ action, hidden, ...props }) {
  const { global } = useContext(useGlobalContext);
  const { handleLogout, setIsModalOpen } = global;
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-80">
          <h2 className="text-lg font-bold mb-4">Confirm {action}</h2>
          <p className="text-gray-600 mb-6">
            Are you sure you want to {action}?
          </p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
