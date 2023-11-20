import { Route, Routes } from "react-router-dom";
import "./assets/css/auth.css";
import Testing from "./UI/Components/Navigation/Testing";
import { useEffect } from "react";
import Dashboard from "./UI/Dashboard/Dashboard";
import { SetupContactAdmin, SetupKYC, SetupOrgAddress, SetupOrgBasicInfo } from "./UI/SetUpOrganisation/Index";
import { OrganisatinEditJobDetails, OrganisationAddStaff, OrganisationAddress, OrganisationAllStaff, OrganisationBasicInfo, OrganisationContactAdmin, OrganisationEditAddStaff, OrganisationJobDetails, OrganisationKYC, OrganisationLoginDetails } from "./UI/OrganisationSettings/OrgSettingsIndex";
import AdminDashboard from "./UI/Polls/Admin/Dashboard";


export  default function User() {


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="dashboard">
      <div>
        <Testing />
      </div>
      <div className="content">
        <Routes>
          {/* organisation settings */}
          <Route path="/admin-setup-organisation-basic-info" element={<SetupOrgBasicInfo />} />
          <Route path="/admin-setup-organisation-kyc" element={<SetupKYC />} />
          <Route path="/admin-setup-organisation-address" element={<SetupOrgAddress />} />
          <Route path="/admin-setup-contact-admin" element={<SetupContactAdmin />} />         
            {/* add Staff */}
          <Route path="/admin-add-staff" element={<OrganisationAddStaff />} />
          <Route path="/admin-Job-details" element={<OrganisationJobDetails />} />
          <Route path="/admin-login-details" element={<OrganisationLoginDetails />} />
          <Route path="/all-staff" element={<OrganisationAllStaff />} />

           {/* add Staff */}
          <Route path="/admin-edit-staff/:user_id" element={<OrganisationEditAddStaff />} />
          <Route path="/admin-edit-job-details/:user_id" element={<OrganisatinEditJobDetails />} />

          {/* Edit Organisation settings */}
          <Route path="/admin-edit-organisation-basic-info" element={<OrganisationBasicInfo />} />
          <Route path="/admin-edit-organisation-kyc" element={<OrganisationKYC />} />
          <Route path="/admin-edit-organisation-address" element={<OrganisationAddress />} />
          <Route path="/admin-edit-organisation-contact-admin" element={<OrganisationContactAdmin />} />
          
               {/* Edit Organisation settings */}
          <Route path="/admin-polls-dashboard" element={<AdminDashboard />} />
      

          <Route path="/dashboard" element={<Dashboard />} />
          
        </Routes>
      </div>
    </div>
  );
}





