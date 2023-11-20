import ContactAdmin from "./ContactAdmin";
import OrgAddress from "./OrgAddress";
import OrgBasicInfo from "./OrgBasicInfo";
import OrgKYC from "./OrgKYC";

export const SetupOrgBasicInfo = () => {
  return <OrgBasicInfo />;
};

export const SetupOrgAddress = () => {
  return <OrgAddress />;
};

export const SetupKYC = () => {
  return <OrgKYC />;
};

export const SetupContactAdmin = () => {
  return <ContactAdmin />;
};
