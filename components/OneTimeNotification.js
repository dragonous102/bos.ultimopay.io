import React, { useEffect } from 'react';

const OneTimeNotification = ({ showModal, closeModal }) => {
  useEffect(() => {
  if (showModal) {
      // Add any additional logic for modal visibility or animations
    }
  }, [showModal]);

  return (
    <div className={`fixed  z-[1000000] inset-0 overflow-y-auto ${showModal ? 'block' : 'hidden'}`}>
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all duration-500 sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-warning text-white p-3 rounded-t-lg">
            <h3 className="text-lg font-semibold">Important Notice</h3>
          </div>

          {/* Modal content */}
          <div className="bg-white p-6">
            <div className="mb-4">
              <p className="text-lg fw-bold mb-2">
                Important Notices:
              </p>
              <p className="text-lg mb-2">
                Maintenance notification
              </p>
              <p>
                We are planning to perform system maintenance at the end of January.
              </p>
              <p>
                Scheduled date and time: January 29, 2024 01:00-06:00 (UTC)
              </p>
              <p className="mb-4">
                Please be careful not to make any deposits or withdrawals during maintenance.
              </p>
              <p>
                Please note the following after maintenance.
              </p>
              <p>
                * Please obtain a new deposit address as the deposit address you used in the past will no longer be usable.
              </p>
              <p>
                * Past deposits, withdrawals, and buysell reports will not be displayed for several days.
              </p>
            </div>
            <div className="text-right">
              <button
                onClick={closeModal}
                className="bg-warning hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                I understand
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneTimeNotification;
