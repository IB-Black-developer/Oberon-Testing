import React from "react";
import { BiSolidError } from "react-icons/bi";
import { BsFillCheckCircleFill } from "react-icons/bs";

const AuthModal = ({
  showModal,
  closeModal,
  error,
  success,
  loading,
  handleSubmit,
  title,
  subTitle,
  buttonText,
  modalText,
  modalImage,
}) => {
  return (
    <>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            {/* <span className="close" onClick={closeModal}>
              &times;
            </span> */}
            <div className="auth-modal-div">
              <h2 className="auth-modal-h2">{title}</h2>
              <p className="auth-modal-p">{subTitle}</p>

              {/* Your existing modal content */}
              {modalImage && <img src={modalImage} alt="modal" className="auth-verify-illustration" />}

              {modalText && <p>{modalText}</p>}

              {error ? (
                <p
                  className="auth-error"
                  style={{
                    width: "93%",
                  }}
                >
                  <BiSolidError className="error-icon-auth" />
                  {error}
                </p>
              ) : null}

              {success ? (
                <p
                  className="auth-success"
                  style={{
                    width: "93%",
                  }}
                >
                  <BsFillCheckCircleFill className="error-icon-auth" />
                  {success}
                </p>
              ) : null}
              <button
                onClick={handleSubmit}
                className="auth-button"
                disabled={loading ? true : false}
              >
                {loading ? "Loading..." : buttonText}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthModal;
