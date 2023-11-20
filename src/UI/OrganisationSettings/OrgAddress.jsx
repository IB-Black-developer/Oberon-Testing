import React from "react";
import { useDispatch } from "react-redux";
import {
  getOrganisation,
  updateOrganisation,
} from "../../redux/profile/Profile";
import useOrganizationAddressForm from "./Hooks/useOrgAddress";
import { nigerianStates } from "../Components/NigerianStates";
import { BsFillTriangleFill } from "react-icons/bs";
import Loader from "../Components/AuthComponents/Loader";
import OrganizationSetupProgress from "../SetUpOrganisation/Components/Progress";
import OrgErrorNotification from "./components/OrgErrorNotification";
import SuccessNotification from "./components/SuccessNotification";
import LoadingButton from "./components/LoadingButton";

const EditOrgAddress = () => {
  const dispatch = useDispatch();

  const {
    country,
    handleChangeCountry,
    state,
    handleChangeState,
    town,
    handleChangeTown,
    postCode,
    handleChangePostCode,
    businessPhoneNumber,
    handleChangeBusinessPhoneNumber,
    website,
    isLoading,
    handleChangeWebsite,
    socialMedia,
    handleChangeSocialMedia,
    countryErr,
    stateErr,
    townErr,
    postCodeErr,
    businessPhoneNumberErr,
    websiteErr,
    socialMediaErr,
    loading,
    error,
    org,
    success,
    handleSubmit,
  } = useOrganizationAddressForm();

  const steps = [
    { label: "Organisation's Basic information", status: "done" },
    { label: "Organisation's KYC", status: "done" },
    {
      label: "Organisation's Address and Social Media Presence",
      status: "active",
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
                <div className="org-forms-inputs" style={{ paddingTop: 24 }}>
                  <label className="org-forms-label">
                    Country <span className="org-forms-label required">**</span>
                  </label>
                  <select
                    style={
                      countryErr
                        ? {
                            border: "red 2px solid",
                            backgroundColor: "#ff000025",
                            color: "red",
                          }
                        : null
                    }
                    value={country ? country : org?.country}
                    onChange={handleChangeCountry}
                    className="forms-org-select"
                  >
                    <option value="">Select Country</option>
                    <option value="Nigeria">Nigeria</option>
                  </select>
                  {countryErr ? (
                    <p
                      style={countryErr ? { color: "red", marginTop: 0 } : null}
                    >
                      {countryErr}
                    </p>
                  ) : null}
                  {/* {countryErr && <p className="error-message">{countryErr}</p>} */}
                </div>
                <div className="org-forms-inputs">
                  <label className="org-forms-label">
                    State <span className="org-forms-label required">**</span>
                  </label>
                  <select
                    value={state ? state : org?.state}
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
                {/* <div className="org-forms-inputs">
                <label className="org-forms-label">
                  State <span className="org-forms-label required">**</span>
                </label>
                <input
                  onChange={handleChangeState}
                  className="auth-input peer w-full border-none outline-none bg-transparent pt-6 pb-1 px-4 text-black"
                /> 
                   {selectedFileErr ? (
                    <p style={selectedFileErr ? { color: "red",    marginTop: 0 } : null}>
                      {selectedFileErr}
                    </p>
                  ) : null}
              </div> */}

                <div className="org-forms-inputs">
                  <label className="org-forms-label">
                    Town <span className="org-forms-label required">**</span>
                  </label>
                  <input
                    placeholder={org?.city}
                    style={
                      townErr
                        ? {
                            border: "red 2px solid",
                            backgroundColor: "#ff000025",
                            color: "red",
                          }
                        : null
                    }
                    onChange={handleChangeTown}
                    className="auth-input peer w-full border-none outline-none bg-transparent pt-6 pb-1 px-4 text-black"
                  />
                  {townErr ? (
                    <p style={townErr ? { color: "red", marginTop: 0 } : null}>
                      {townErr}
                    </p>
                  ) : null}
                </div>

                <div className="org-forms-inputs">
                  <label className="org-forms-label">
                    Post Code{" "}
                    <span className="org-forms-label required">**</span>
                  </label>
                  <input
                    placeholder={org?.post_code}
                    style={
                      postCodeErr
                        ? {
                            border: "red 2px solid",
                            backgroundColor: "#ff000025",
                            color: "red",
                          }
                        : null
                    }
                    onChange={handleChangePostCode}
                    className="auth-input peer w-full border-none outline-none bg-transparent pt-6 pb-1 px-4 text-black"
                  />
                  {postCodeErr ? (
                    <p
                      style={
                        postCodeErr ? { color: "red", marginTop: 0 } : null
                      }
                    >
                      {postCodeErr}
                    </p>
                  ) : null}
                </div>

                <div className="org-forms-inputs">
                  <label className="org-forms-label">
                    Business Phone Number{" "}
                    <span className="org-forms-label required">**</span>
                  </label>
                  <input
                    placeholder={org?.phone_number}
                    style={
                      businessPhoneNumberErr
                        ? {
                            border: "red 2px solid",
                            backgroundColor: "#ff000025",
                            color: "red",
                          }
                        : null
                    }
                    onChange={handleChangeBusinessPhoneNumber}
                    className="auth-input peer w-full border-none outline-none bg-transparent pt-6 pb-1 px-4 text-black"
                  />
                  {businessPhoneNumberErr ? (
                    <p
                      style={
                        businessPhoneNumberErr
                          ? { color: "red", marginTop: 0 }
                          : null
                      }
                    >
                      {businessPhoneNumberErr}
                    </p>
                  ) : null}
                </div>

                <div className="org-forms-inputs">
                  <label className="org-forms-label">
                    Website <span className="org-forms-label required">**</span>
                  </label>
                  <input
                    placeholder={org?.website}
                    style={
                      websiteErr
                        ? {
                            border: "red 2px solid",
                            backgroundColor: "#ff000025",
                            color: "red",
                          }
                        : null
                    }
                    onChange={handleChangeWebsite}
                    className="auth-input peer w-full border-none outline-none bg-transparent pt-6 pb-1 px-4 text-black"
                  />
                  {websiteErr ? (
                    <p
                      style={websiteErr ? { color: "red", marginTop: 0 } : null}
                    >
                      {websiteErr}
                    </p>
                  ) : null}
                </div>

                {/* <div className="org-forms-inputs">
                <label className="org-forms-label">
                  Link a Social Media Account{" "}
                  <span className="org-forms-label required">**</span>
                </label>
                <select className="forms-org-select">
                  <option value="Twitter">Twitter</option>
                  <option value="Facebook">Facebook</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Discord">Discord</option>
                  <option value="Slack">Slack</option>
                  <option value="Instagram">Instagram</option>
                  <option value="Trends">Trends</option>
                </select>
              </div> */}
                <div className="org-forms-inputs">
                  <label className="org-forms-label">
                    Link to Social Media Account{" "}
                    <span className="org-forms-label required">**</span>
                  </label>
                  <input
                    placeholder={org?.social_url}
                    style={
                      socialMediaErr
                        ? {
                            border: "red 2px solid",
                            backgroundColor: "#ff000025",
                            color: "red",
                          }
                        : null
                    }
                    onChange={handleChangeSocialMedia}
                    className="auth-input peer w-full border-none outline-none bg-transparent pt-6 pb-1 px-4 text-black"
                  />
                  {socialMediaErr ? (
                    <p
                      style={
                        socialMediaErr ? { color: "red", marginTop: 0 } : null
                      }
                    >
                      {socialMediaErr}
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
      )}
    </>
  );
};

export default EditOrgAddress;
