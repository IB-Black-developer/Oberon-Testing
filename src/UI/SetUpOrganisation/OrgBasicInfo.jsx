import React from "react";
import "../../assets/css/OrgBasicInfo.css";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Loader from "../Components/AuthComponents/Loader";
import useOrgBasicInfoForm from "./Hooks/useOrgbasicInfo";
import OrganizationSetupProgress from "./Components/Progress";
import OrgErrorNotification from "../OrganisationSettings/components/OrgErrorNotification";
import LoadingButton from "../OrganisationSettings/components/LoadingButton";
import SelectComponent from "../OrganisationSettings/components/SelectComponents";
import LogoUpload from "../OrganisationSettings/components/Logo";
import StaffCountOptions from "../OrganisationSettings/components/Options";
import useOrganizationBasicInfoForm from "../OrganisationSettings/Hooks/useOrgBasicInfo";
import useUserRole from "../../Hooks/useUserRoles";

const OrgBasicInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    selectedOption,
    selectedCurrency,
    selectedFile,
    imageUrl,
    staff_count_max,
    staff_count_min,
    loading,
    error,
    staff_count_max_Err,
    selectedCurrencyErr,
    selectedFileErr,
    isLoading,
    handleFileChange,
    handleOptionChange,
    handleCurrencyChange,
    options,
    handleSubmit,
  } = useOrgBasicInfoForm();

  const { org } = useOrganizationBasicInfoForm();

  const steps = [
    { label: "Organisation's Basic information", status: "active" },
    { label: "Organisation's KYC", status: "inactive" },
    {
      label: "Organisation's Address and Social Media Presence",
      status: "inactive",
    },
    { label: "Contact Admin", status: "inactive" },
  ];

  const userRole = useUserRole(org);
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
                        Welcome, {org?.first_name}{" "}
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
                  setupHeading="Setup your Organisation"
                  steps={steps}
                />
              </section>
            </section>

            <section className="full-fix">
              <section className="width-full-fix">
                <section className="org-basic-info-div-right-div">
                  <OrganizationSetupProgress
                    setupHeading="Setup your Organisation"
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
                <LogoUpload
                  imageUrl={imageUrl}
                  selectedFileErr={selectedFileErr}
                  handleFileChange={handleFileChange}
                />

                <div className="org-forms-inputs">
                  <SelectComponent
                    placeholder="Currency"
                    onChange={handleCurrencyChange}
                    value={selectedCurrency}
                    options={["NGN", "USD", "EUR", "GBP"]}
                    error={selectedCurrencyErr}
                  />
                </div>

                <StaffCountOptions
                  staffCountMaxErr={staff_count_max_Err}
                  handleOptionChange={handleOptionChange}
                  selectedOption={selectedOption}
                  options={options}
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
        </>
      )}
    </>
  );
};

export default OrgBasicInfo;
