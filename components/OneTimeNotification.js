import React, { useEffect } from 'react';

const OneTimeNotification = ({ showModal, closeModal }) => {
  useEffect(() => {
    if (showModal) {
      document.getElementById('boostrapModalLunch').click();
    }
  }, [showModal]);

  return (
    <div className="d-flex justify-content-center align-items-center">
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#notificationModal"
        id="boostrapModalLunch"
        hidden={true}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="notificationModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        data-bs-backdrop="static"
      >
        <div className="modal-dialog"
             style={{ zIndex: 1001 }}>
          <div className="modal-content">
            <div className="modal-header bg-info text-white">
              <h5 className="modal-title" id="exampleModalLabel">
                Important Notices:
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body p-4">
              <h5 className=" fw-bold mb-2">
                Important Notices:
              </h5>
              <h5 className="text-lg mb-2">
                Maintenance notification
              </h5>
              <p>
                We will notify you of any changes to the maintenance date and time.
              </p>
              <p>
                Scheduled start: 2024/01/29 10:00 (UTC)<br/>
                Scheduled completion: 2024/01/30 06:00 (UTC)
              </p>
              <p className="mb-4">
                We apologize for any inconvenience caused by the sudden change in maintenance schedule.
              </p>
              <p className="mb-4">
                Please be careful not to make any deposits or withdrawals during maintenance.
              </p>
              <p>
                Please note the following after maintenance.
              </p>
              <p>
                *Please obtain a new deposit address as the deposit address you used in the past will no longer be usable.
              </p>
              <p>
                *Past deposits, withdrawals, and buysell reports will not be displayed for several days.
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-info text-white"
                data-bs-dismiss="modal"
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
