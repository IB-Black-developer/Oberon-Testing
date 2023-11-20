import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  getOrganisation,
  updateOrganisation,
} from "../../redux/profile/Profile";
import Loader from "../Components/AuthComponents/Loader";
import useOrganizationForm from "./Hooks/useOrgKyc";
import OrganizationSetupProgress from "../SetUpOrganisation/Components/Progress";
import OrgErrorNotification from "./components/OrgErrorNotification";
import SuccessNotification from "./components/SuccessNotification";
import LoadingButton from "./components/LoadingButton";
import FileUploadComponent from "./components/FileUploadComponent";
import SelectComponent from "./components/SelectComponents";
import OrganizationInput from "./components/INputs";

const EditOrgKYC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    businessLegalName,
    setBusinessLegalName,
    kycUpload,
    setKycUpload,
    businessEntityType,
    setBusinessEntityType,
    natureOfBusiness,
    setNatureOfBusiness,
    description,
    setDescription,
    imageUrl,
    businessLegalNameErr,
    setBusinessLegalNameErr,
    kycUploadErr,
    setKycUploadErr,
    businessEntityTypeErr,
    setBusinessEntityTypeErr,
    natureOfBusinessErr,
    setNatureOfBusinessErr,
    descriptionErr,
    setDescriptionErr,
    error,
    setError,
    loading,
    success,
    isLoading,
    org,
    handleSubmit,
    handleChangeBusinessLegalName,
    handleChangeKycUpload,
    handleChangeBusinessEntityType,
    handleChangeDescription,
    handleChangeNatureofBusiness,
  } = useOrganizationForm(dispatch, getOrganisation, updateOrganisation);

  const steps = [
    { label: "Organisation's Basic information", status: "done" },
    { label: "Organisation's KYC", status: "active" },
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
        <section className="forms-kyc-org">
          <section className="org-forms-section">
            <div className="org-forms-kyc">
              <form onSubmit={handleSubmit} className="org-forms-forms">
                <div
                  style={{
                    paddingTop: 24,
                    width: " 100%",
                  }}
                >
                  <OrganizationInput
                    label="Business Legal Name"
                    descriptionErr={businessLegalNameErr}
                    handleChangeDescription={handleChangeBusinessLegalName}
                  />
                </div>
                <FileUploadComponent
                  onChange={handleChangeKycUpload}
                  id="file-inputs"
                  imageUrl={imageUrl}
                  kycUploadErr={kycUploadErr}
                />

                <SelectComponent
                  placeholder="Business Entity Type"
                  value={businessEntityType}
                  onChange={handleChangeBusinessEntityType}
                  options={[
                    "Business Name",
                    "LLC (Private)",
                    "LLC (Public)",
                    "Government-owned Entity",
                    "NGOs",
                    "Educational",
                    "Religious",
                    "Others",
                  ]}
                  error={businessEntityTypeErr}
                />

                <SelectComponent
                  placeholder="Nature of Business"
                  onChange={handleChangeNatureofBusiness}
                  value={natureOfBusiness}
                  options={[
                    "Finance",
                    "Health",
                    "Tech",
                    "Agriculture",
                    "Manufacturing",
                    "Fashion and Media",
                    "Entertainment and Hospitality",
                  ]}
                  error={natureOfBusinessErr}
                />

                <OrganizationInput
                  label="Briefly Describe your organisation"
                  descriptionErr={descriptionErr}
                  handleChangeDescription={handleChangeDescription}
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
      )}
    </>
  );
};

export default EditOrgKYC;
