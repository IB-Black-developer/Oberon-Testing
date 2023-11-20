import React from "react";
import "../../assets/css/OrgBasicInfo.css";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { BsFillCheckCircleFill, BsCloudUpload } from "react-icons/bs";
import { BiSolidError } from "react-icons/bi";
import Loader from "../Components/AuthComponents/Loader";
import { useDispatch } from "react-redux";
import useOrganizationBasicInfoForm from "./Hooks/useOrgBasicInfo";
import OrganizationSetupProgress from "../SetUpOrganisation/Components/Progress";
import OrgErrorNotification from "./components/OrgErrorNotification";
import SuccessNotification from "./components/SuccessNotification";
import LoadingButton from "./components/LoadingButton";

const EditOrgBasicInfo = () => {
  const dispatch = useDispatch();

  const {
    selectedOption,
    selectedCurrency,
    selectedFile,
    org,
    imageUrl,
    staff_count_max,
    staff_count_min,
    loading,
    error,
    success,
    isLoading,
    handleFileChange,
    handleOptionChange,
    handleCurrencyChange,
    options,
    handleSubmit,
  } = useOrganizationBasicInfoForm();

  const steps = [
    { label: "Organisation's Basic information", status: "active" },
    { label: "Organisation's KYC", status: "inactive" },
    {
      label: "Organisation's Address and Social Media Presence",
      status: "inactive",
    },
    { label: "Contact Admin", status: "inactive" },
  ];

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <section className="org-flex-first">
            <section className="org-basic-info-div">
              <div className="org-basic-info-container">
                <div className="background-image">
                  <div className="well-forms">
                    <div>
                      <h2 className="org-basic-info-h2">
                        Welcome, {org?.company_name}{" "}
                      </h2>
                      <p className="org-basic-info-p">
                        Proceed to set up your account
                      </p>
                    </div>{" "}
                    <div className="org-read-more">
                      <p> Read More</p> <MdKeyboardDoubleArrowRight />
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="width-org-resize">
              <section className="org-basic-info-div-right">
                <OrganizationSetupProgress
                  setupHeading="Edit your Organisation"
                  steps={steps}
                />
              </section>
            </section>

            <section className="full-fix">
              <section className="width-full-fix">
                <section className="org-basic-info-div-right-div">
                  <OrganizationSetupProgress
                    setupHeading="Edit your Organisation"
                    steps={steps}
                  />
                </section>
              </section>
            </section>
          </section>
          <div className="mid-space"></div>
          <section className="org-forms-section">
            <div className="org-forms">
              <form onSubmit={handleSubmit} className="org-forms-forms">
                <div className="google-profile-upload-container">
                  <label className="org-forms-label" htmlFor="file-input">
                    Edit your Logo
                  </label>

                  <input
                    id="file-input"
                    onChange={handleFileChange}
                    type="file"
                  />

                  <label className="file-input-label" htmlFor="file-input">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        width="120px"
                        height="120px"
                        alt="imaggg"
                      />
                    ) : (
                      <img
                        src={org?.logo?.location}
                        width="120px"
                        height="120px"
                        alt="imaggg"
                      />
                    )}
                    <br />
                    <BsCloudUpload className="upload-file-icon" />
                  </label>
                </div>

                <div className="org-forms-inputs">
                  <label className="org-forms-label">
                    Edit Currency{" "}
                    <span className="org-forms-label required">
                      ** - Choice of currency in-app
                    </span>
                  </label>
                  <select
                    className="forms-org-select"
                    value={selectedCurrency ? selectedCurrency : org?.currency}
                    onChange={handleCurrencyChange}
                  >
                    <option value="NGN">NGN</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                  </select>
                </div>

                <div className="org-forms-options">
                  <label className="org-forms-label ">
                    How Many Staff Work in your Organisation?{" "}
                    <span className="org-forms-label required"> ** </span>
                  </label>
                  <div className="org-forms-buttons">
                    {options.map((option) => (
                      <button
                        key={option}
                        className={`org-forms-button ${
                          selectedOption === option ? "selected" : ""
                        }`}
                        onClick={(e) => handleOptionChange(e, option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
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
        </>
      )}
    </>
  );
};

export default EditOrgBasicInfo;
