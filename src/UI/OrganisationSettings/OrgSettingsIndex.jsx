import EditContactAdmin from "./ContactAdmin";
import EditAddStaff from "./EditHrOps/AddStaff";
import EditJobDetails from "./EditHrOps/JobDetails";
import AddStaff from "./HROps/AddStaff";
import AllStaff from "./HROps/AllStaff";
import JobDetails from "./HROps/JobDetails";
import LoginDetails from "./HROps/LoginDetails";
import EditOrgAddress from "./OrgAddress";
import EditOrgBasicInfo from "./OrgBasicInfo";
import EditOrgKYC from "./OrgKYC";

export const OrganisationBasicInfo = () => {
  return <EditOrgBasicInfo />;
};

export const OrganisationAddress = () => {
  return <EditOrgAddress />;
};

export const OrganisationKYC = () => {
  return <EditOrgKYC />;
};

export const OrganisationContactAdmin = () => {
  return <EditContactAdmin />;
};

export const OrganisationAddStaff = () => {
  return <AddStaff />;
};

export const OrganisationAllStaff = () => {
  return <AllStaff />;
};

export const OrganisationJobDetails = () => {
  return <JobDetails />;
};

export const OrganisationLoginDetails = () => {
  return <LoginDetails />;
};
export const OrganisationEditAddStaff = () => {
  return <EditAddStaff />;
};

export const OrganisatinEditJobDetails = () => {
  return <EditJobDetails />;
};
