import React, {useState} from "react";
import "../../assets/css/OrgBasicInfo.css";
import { BsFillTriangleFill, BsCloudUpload } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { BiSolidError } from "react-icons/bi";
import useContactAdminForm from "./Hooks/useContactAdmin";
import OrganizationSetupProgress from "./Components/Progress";
import OrgErrorNotification from "../OrganisationSettings/components/OrgErrorNotification";
import LoadingButton from "../OrganisationSettings/components/LoadingButton";
import FileUploadComponent from "../OrganisationSettings/components/FileUploadComponent";
import OrganizationInput from "../OrganisationSettings/components/INputs";
import verify from '../../assets/AuthAssets/Sucess.png'
import { useNavigate } from "react-router-dom";

const ContactAdmin = () => {
 
  const {
    firstName,
    lastName,
    email,
    title,
    phoneNumber,
    firstNameErr,
    lastNameErr,
    emailErr,
    titleErr,
    showModal,
    phoneNumberErr,
    uploadIDErr,
    loading,
    error,
    imageUrl,
    handleChangeFirstName,
    handleChangeLastName,
    handleChangeTitle,
    handleChangePhoneNumber,
    handleChangeEmail,
    handleChangeUploadID,
    handleSubmit,
  } = useContactAdminForm();

  const steps = [
    { label: "Organisation's Basic information", status: "done" },
    { label: "Organisation's KYC", status: "done" },
    {
      label: "Organisation's Address and Social Media Presence",
      status: "done",
    },
    { label: "Contact Admin", status: "active" },
  ];

  return (
    <>
      <section className="forms-kyc-org">
        <section className="org-forms-section">
          <div className="org-forms-kyc">
            <form
              onSubmit={handleSubmit}
              style={{
                paddingTop: 24,
              }}
              className="org-forms-forms"
            >
              <OrganizationInput
                label="Admin's First Name"
                descriptionErr={firstNameErr}
                handleChangeDescription={handleChangeFirstName}
              />
              <OrganizationInput
                label="Admin's Last Name"
                descriptionErr={lastNameErr}
                handleChangeDescription={handleChangeLastName}
              />

              <OrganizationInput
                label="Admin's Email Address"
                descriptionErr={emailErr}
                handleChangeDescription={handleChangeEmail}
              />
              <OrganizationInput
                label="Job Title"
                descriptionErr={titleErr}
                handleChangeDescription={handleChangeTitle}
              />

              <OrganizationInput
                label="Phone Number"
                descriptionErr={phoneNumberErr}
                handleChangeDescription={handleChangePhoneNumber}
              />

              <FileUploadComponent
                onChange={handleChangeUploadID}
                id="file-inputs"
                imageUrl={imageUrl}
                kycUploadErr={uploadIDErr}
              />

              <div className="forms-org-submit-button">
                {error ? <OrgErrorNotification error={error} /> : null}
                <LoadingButton
                  loading={loading}
                  onClick={handleSubmit}
                  buttonText="Save"
                />
              </div>
            </form>
          </div>
        </section>
        <section className="org-flex-second">
          <section className="width-org-resize">
            <section className="org-basic-info-div-right">
              <OrganizationSetupProgress
                setupHeading="Setup your Organisation"
                steps={steps}
              />
            </section>
          </section>
          <section className="width-org-resize-div">
            <div className="org-width-vw">
              <section className="org-basic-info-div-right-div-div">
                <OrganizationSetupProgress
                  setupHeading="Setup your Organisation"
                  steps={steps}
                />
              </section>
            </div>
          </section>
        </section>
      </section>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            {/* <span className="close" onClick={closeModal}>
              &times;
            </span> */}
            <div className="auth-modal-div">
              <h2 className="auth-modal-h2">
                You have successfully Setup your Organisation
              </h2>
              <p className="auth-modal-p">Proceed to your next actions</p>

              <img
                src={verify}
                alt="verify"
                className="auth-verify-illustration"
              />

              <button
                className="get-staff-button-view-permission"
                onClick={() => navigate("/dashboard")}
              >
                {" "}
                Proceed to Dashboard
              </button>
              <button
                className="auth-button get-staff-button"
                onClick={() => navigate("/admin-add-staff")}
              >
                {" "}
               Add a Staff
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactAdmin;
