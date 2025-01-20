import React, { useState } from 'react';

const UpdateModal = ({ session, onClose, onUpdate }) => {
  const [title, setTitle] = useState(session.title);
  const [fee, setFee] = useState(session.fee);

  const handleSubmit = () => {
    onUpdate({ title, fee });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Update Study Session</h2>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Title</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Fee</label>
          <input
            type="number"
            className="w-full px-3 py-2 border rounded"
            value={fee}
            onChange={(e) => setFee(e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-green-500 text-white rounded">
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;
