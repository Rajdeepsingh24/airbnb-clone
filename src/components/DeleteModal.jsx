function DeleteModal({ onCancel, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 w-[400px] shadow-2xl text-center">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">
          Are you sure?
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          This action cannot be undone.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="px-6 py-2 border rounded-lg dark:border-gray-600 dark:text-white"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
