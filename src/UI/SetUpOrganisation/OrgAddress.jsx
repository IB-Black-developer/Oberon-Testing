import React from "react";
import "../../assets/css/OrgBasicInfo.css";
import { useDispatch } from "react-redux";
import { BiSolidError } from "react-icons/bi";
import { nigerianStates } from "../Components/NigerianStates";
import useOrgAddressForm from "./Hooks/useOrgAddress";
import OrganizationSetupProgress from "./Components/Progress";
import OrgErrorNotification from "../OrganisationSettings/components/OrgErrorNotification";
import LoadingButton from "../OrganisationSettings/components/LoadingButton";
import SelectComponent from "../OrganisationSettings/components/SelectComponents";
import OrganizationInput from "../OrganisationSettings/components/INputs";

const OrgAddress = () => {
  const dispatch = useDispatch();

  const {
    country,
    state,
    town,
    postCode,
    businessPhoneNumber,
    website,
    socialMedia,
    countryErr,
    stateErr,
    townErr,
    postCodeErr,
    businessPhoneNumberErr,
    websiteErr,
    socialMediaErr,
    loading,
    error,
    handleChangeCountry,
    handleChangeState,
    handleChangeTown,
    handleChangePostCode,
    handleChangeBusinessPhoneNumber,
    handleChangeWebsite,
    handleChangeSocialMedia,
    handleSubmit,
  } = useOrgAddressForm();
  const steps = [
    { label: "Organisation's Basic information", status: "done" },
    { label: "Organisation's KYC", status: "done" },
    {
      label: "Organisation's Address and Social Media Presence",
      status: "active",
    },
    { label: "Contact Admin", status: "inactive" },
  ];
  console.log(postCode);
  return (
    <>
      <section className="forms-kyc-org">
        <section className="org-forms-section">
          <div className="org-forms-kyc">
            <form
              onSubmit={handleSubmit}
              style={{ paddingTop: 24 }}
              className="org-forms-forms"
            >
              <div className="org-forms-inputs">
                <SelectComponent
                  placeholder="Country"
                  onChange={handleChangeCountry}
                  value={country}
                  options={["Nigeria"]}
                  error={countryErr}
                />
              </div>
              <div className="org-forms-inputs">
                <label className="org-forms-label">
                  State <span className="org-forms-label required">**</span>
                </label>
                <select
                  style={
                    stateErr
                      ? {
                          border: "red 2px solid",
                          backgroundColor: "#ff000025",
                          color: "red",
                        }
                      : null
                  }
                  onChange={handleChangeState}
                  className="forms-org-select"
                >
                  {nigerianStates.map((state, index) => (
                    <option key={index} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                {stateErr ? (
                  <p style={stateErr ? { color: "red", marginTop: 0 } : null}>
                    {stateErr}
                  </p>
                ) : null}
              </div>

              <OrganizationInput
                label="Town"
                descriptionErr={townErr}
                handleChangeDescription={handleChangeTown}
              />

              <OrganizationInput
                label="Post Code "
                descriptionErr={postCodeErr}
                handleChangeDescription={handleChangePostCode}
              />

              <OrganizationInput
                label="Business Phone Number"
                descriptionErr={businessPhoneNumberErr}
                handleChangeDescription={businessPhoneNumberErr}
              />

              <OrganizationInput
                label="Website"
                descriptionErr={websiteErr}
                handleChangeDescription={handleChangeWebsite}
              />

              <OrganizationInput
                label="Link to Social Media Account"
                descriptionErr={socialMediaErr}
                handleChangeDescription={handleChangeSocialMedia}
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

export default OrgAddress;
