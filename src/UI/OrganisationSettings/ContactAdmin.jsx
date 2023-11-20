import React from "react";
import "../../assets/css/OrgBasicInfo.css";
import {
  BsFillTriangleFill,
  BsFillCheckCircleFill,
  BsCloudUpload,
} from "react-icons/bs";
import { useDispatch } from "react-redux";
import {
  getOrganisation,
  getProfile,
  updateData,
} from "../../redux/profile/Profile";
import { BiSolidError } from "react-icons/bi";
import useContactAdminForm from "./Hooks/useContactAdmin";
import OrganizationSetupProgress from "../SetUpOrganisation/Components/Progress";
import OrgErrorNotification from "./components/OrgErrorNotification";
import SuccessNotification from "./components/SuccessNotification";
import LoadingButton from "./components/LoadingButton";

const EditContactAdmin = () => {
  const dispatch = useDispatch();
  const {
    firstName,
    lastName,
    email,
    title,
    phoneNumber,
    uploadID,
    firstNameErr,
    lastNameErr,
    emailErr,
    titleErr,
    phoneNumberErr,
    uploadIDErr,
    loading,
    error,
    imageUrl,
    success,
    isLoading,
    org,
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
            <form onSubmit={handleSubmit} className="org-forms-forms">
              <div
                className="org-forms-inputs"
                style={{
                  paddingTop: 24,
                }}
              >
                <label className="org-forms-label">
                  Admin's First Name{" "}
                  <span className="org-forms-label required">**</span>
                </label>
                <input
                  style={
                    firstNameErr
                      ? {
                          border: "red 2px solid",
                          backgroundColor: "#ff000025",
                          color: "red",
                        }
                      : null
                  }
                  value={firstName}
                  placeholder={org?.first_name}
                  onChange={handleChangeFirstName}
                  className="auth-input peer w-full border-none outline-none bg-transparent pt-6 pb-1 px-4 text-black"
                />
                {firstNameErr ? (
                  <p
                    style={firstNameErr ? { color: "red", marginTop: 0 } : null}
                  >
                    {firstNameErr}
                  </p>
                ) : null}
              </div>

              <div className="org-forms-inputs">
                <label className="org-forms-label">
                  Admin's Last Name{" "}
                  <span className="org-forms-label required">**</span>
                </label>
                <input
                  value={lastName}
                  placeholder={org?.last_name}
                  style={
                    lastNameErr
                      ? {
                          border: "red 2px solid",
                          backgroundColor: "#ff000025",
                          color: "red",
                        }
                      : null
                  }
                  onChange={handleChangeLastName}
                  className="auth-input peer w-full border-none outline-none bg-transparent pt-6 pb-1 px-4 text-black"
                />
                {lastNameErr ? (
                  <p
                    style={lastNameErr ? { color: "red", marginTop: 0 } : null}
                  >
                    {lastNameErr}
                  </p>
                ) : null}
              </div>

              <div className="org-forms-inputs">
                <label className="org-forms-label">
                  Admin's Email{" "}
                  <span className="org-forms-label required">**</span>
                </label>
                <input
                  placeholder={org?.email}
                  type="email"
                  value={email}
                  style={
                    emailErr
                      ? {
                          border: "red 2px solid",
                          backgroundColor: "#ff000025",
                          color: "red",
                        }
                      : null
                  }
                  onChange={handleChangeEmail}
                  className="auth-input peer w-full border-none outline-none bg-transparent pt-6 pb-1 px-4 text-black"
                />
                {emailErr ? (
                  <p style={emailErr ? { color: "red", marginTop: 0 } : null}>
                    {emailErr}
                  </p>
                ) : null}
              </div>

              <div className="org-forms-inputs">
                <label className="org-forms-label">
                  Job Title<span className="org-forms-label required">**</span>
                </label>
                <input
                  placeholder={org?.job_title}
                  value={title}
                  style={
                    titleErr
                      ? {
                          border: "red 2px solid",
                          backgroundColor: "#ff000025",
                          color: "red",
                        }
                      : null
                  }
                  onChange={handleChangeTitle}
                  className="auth-input peer w-full border-none outline-none bg-transparent pt-6 pb-1 px-4 text-black"
                />
                {titleErr ? (
                  <p style={titleErr ? { color: "red", marginTop: 0 } : null}>
                    {titleErr}
                  </p>
                ) : null}
              </div>

              <div className="org-forms-inputs">
                <label className="org-forms-label">
                  Phone Number{" "}
                  <span className="org-forms-label required">**</span>
                </label>
                <input
                  placeholder={org?.phone}
                  type="number"
                  value={phoneNumber}
                  style={
                    phoneNumberErr
                      ? {
                          border: "red 2px solid",
                          backgroundColor: "#ff000025",
                          color: "red",
                        }
                      : null
                  }
                  onChange={handleChangePhoneNumber}
                  className="auth-input peer w-full border-none outline-none bg-transparent pt-6 pb-1 px-4 text-black"
                />
                {phoneNumberErr ? (
                  <p
                    style={
                      phoneNumberErr ? { color: "red", marginTop: 0 } : null
                    }
                  >
                    {phoneNumberErr}
                  </p>
                ) : null}
              </div>

              <div className="CAC-container">
                <label className="CAC-label">
                  Upload your a Valid ID
                  <span className="CAC-required">**</span>
                </label>
                <input
                  onChange={handleChangeUploadID}
                  id="file-inputs"
                  className="CAC-file-input"
                  type="file"
                />
                <label
                  style={
                    uploadIDErr
                      ? {
                          border: "red 2px solid",
                          backgroundColor: "#ff000025",
                          color: "red",
                        }
                      : null
                  }
                  htmlFor="file-input"
                  className="CAC-custom-label"
                >
                  <BsCloudUpload />
                </label>
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    width="120px"
                    height="120px"
                    alt="imaggg"
                    style={{
                      marginTop: 12,
                      borderRadius: 12,
                    }}
                  />
                ) : (
                  <img
                    src={org?.uploads?.[0]?.location}
                    width="120px"
                    height="120px"
                    alt="imaggg"
                    style={{
                      marginTop: 12,
                      borderRadius: 12,
                    }}
                  />
                )}
                {uploadIDErr ? (
                  <p
                    style={uploadIDErr ? { color: "red", marginTop: 0 } : null}
                  >
                    {uploadIDErr}
                  </p>
                ) : null}
              </div>

              <div className="forms-org-submit-button">
                {error ? <OrgErrorNotification error={error} /> : null}
                {success ? <SuccessNotification success={success} /> : null}
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
                setupHeading="Edit your Organisation"
                steps={steps}
              />
            </section>
          </section>
          <section className="width-org-resize-div">
            <div className="org-width-vw">
              <section className="org-basic-info-div-right-div-div">
                <OrganizationSetupProgress
                  setupHeading="Edit your Organisation"
                  steps={steps}
                />
              </section>
            </div>
          </section>
        </section>
      </section>
    </>
  );
};

export default EditContactAdmin;
