import React, { useState } from 'react';
import Swal from 'sweetalert2';

const ApproveModal = ({ session, onClose, onApprove }) => {
  const [isFree, setIsFree] = useState(true);
  const [amount, setAmount] = useState(0);

  const handleApprove = () => {
    if (!isFree && amount <= 0) {
      Swal.fire('Error', 'Please provide a valid amount for paid sessions.', 'error');
      return;
    }

    const updatedSession = {
      ...session,
      fee: isFree ? 0 : amount,
    };

    onApprove(updatedSession);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Approve Study Session</h2>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Is this session free?</label>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="fee"
                value="free"
                checked={isFree}
                onChange={() => setIsFree(true)}
              />
              Free
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="fee"
                value="paid"
                checked={!isFree}
                onChange={() => setIsFree(false)}
              />
              Paid
            </label>
          </div>
        </div>
        {!isFree && (
          <div className="mb-4">
            <label className="block mb-2 font-medium">Enter Amount</label>
            <input
              type="number"
              className="w-full px-3 py-2 border rounded"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
              placeholder="Enter fee amount"
            />
          </div>
        )}
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleApprove}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Approve
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApproveModal;
