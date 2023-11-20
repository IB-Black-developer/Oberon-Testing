import React from "react";
import "../../assets/css/OrgBasicInfo.css";
import useOrgKYCForm from "./Hooks/useOrgKyc";
import OrganizationSetupProgress from "./Components/Progress";
import LoadingButton from "../OrganisationSettings/components/LoadingButton";
import OrgErrorNotification from "../OrganisationSettings/components/OrgErrorNotification";
import SelectComponent from "../OrganisationSettings/components/SelectComponents";
import FileUploadComponent from "../OrganisationSettings/components/FileUploadComponent";
import OrganizationInput from "../OrganisationSettings/components/INputs";

const OrgKYC = () => {
  const {
    businessLegalName,
    kycUpload,
    businessEntityType,
    natureOfBusiness,
    description,
    imageUrl,
    businessLegalNameErr,
    kycUploadErr,
    businessEntityTypeErr,
    natureOfBusinessErr,
    descriptionErr,
    error,
    loading,
    handleChangeBusinessLegalName,
    handleChangeKycUpload,
    handleChangeBusinessEntityType,
    handleChangeDescription,
    handleChangeNatureofBusiness,
    handleSubmit,
  } = useOrgKYCForm();

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
      <section className="forms-kyc-org">
        <section className="org-forms-section">
          <div className="org-forms-kyc">
            <form onSubmit={handleSubmit} className="org-forms-forms">
              <div
                style={{
                  paddingTop: 24,
                  width:' 100%'
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
    </>
  );
};

export default OrgKYC;
