import React, { useState } from "react";
import "../../../assets/css/OrgBasicInfo.css";
import { BsFillTriangleFill } from "react-icons/bs";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { BiSolidError } from "react-icons/bi";
import OrganizationSetupProgress from "../../SetUpOrganisation/Components/Progress";

const JobDetails = () => {
  const steps = [
    { label: "Staff Details", status: "done" },
    { label: "Job Details", status: "active" },
    {
      label: "Login Details",
      status: "inactive",
    },
  ];

  const navigate = useNavigate();
  const location = useLocation();
  const {
    firstName,
    lastName,
    gender,
    dateOfBirth,
    country,
    houseAddress,
    streetAddress,
    state,
    permission,
  } = location.state;

  console.log(
    firstName,
    lastName,
    gender,
    dateOfBirth,
    country,
    houseAddress,
    streetAddress,
    state,
    permission,
    "kskskskk"
  );

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [dateOfEmployment, setDateofEmployment] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [salaryFrequency, setSalaryFrequency] = useState("");
  const [basicSalary, setBasicSalary] = useState("");
  const [allowance, setAllowance] = useState("");
  const [contractType, setContractType] = useState("");
  const [department, setDepartment] = useState("");

  const [departmentErr, setDepartmentErr] = useState("");
  const [dateOfEmploymentErr, setDateofEmploymentErr] = useState("");
  const [jobTitleErr, setJobTitleErr] = useState("");
  const [employmentTypeErr, setEmploymentTypeErr] = useState("");
  const [salaryFrequencyErr, setSalaryFrequencyErr] = useState("");
  const [basicSalaryErr, setBasicSalaryErr] = useState("");
  const [allowanceErr, setAllowanceErr] = useState("");
  const [contractTypeErr, setContractTypeErr] = useState("");

  const handleDateofEmployment = (event) => {
    const selectedDateofEmployment = event.target.value;
    setDateofEmployment(selectedDateofEmployment);

    if (selectedDateofEmployment === "") {
      setDateofEmploymentErr("Please select a date of birth");
    } else {
      const formattedDateofEmployment = new Date(
        selectedDateofEmployment
      ).toISOString();
      setDateofEmploymentErr("");
      setDateofEmployment(formattedDateofEmployment);
      console.log(formattedDateofEmployment, "Selected State");
    }
  };
  const handleChangeDepartment = (event) => {
    setDepartmentErr("");
    setDepartment(event.target.value);
    console.log(event.target.value);
    if (!event.target.value) {
      setDepartmentErr("Please select a department type");
    } else {
    }
  };
  const handleEmploymentType = (event) => {
    setEmploymentTypeErr("");
    setEmploymentType(event.target.value);
    console.log(event.target.value);
    if (!event.target.value) {
      setEmploymentTypeErr("Please select an employment type");
    } else {
    }
  };
  const handleChnageContractType = (event) => {
    setContractTypeErr("");
    setContractType(event.target.value);
    console.log(event.target.value);
    if (!event.target.value) {
      setContractTypeErr("Please a contract type");
    } else {
    }
  };

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const handleSalaryFrequency = (event) => {
    setSalaryFrequencyErr("");
    const selectedSalaryFrequency = event.target.value;
    console.log(selectedSalaryFrequency, "Selected State");
    setSalaryFrequency(selectedSalaryFrequency);
    if (selectedSalaryFrequency === "") {
      setSalaryFrequencyErr("Please select a gender");
    } else {
    }
  };

  const handleChangeJobTitle = (event) => {
    setJobTitleErr("");
    setError("");
    const capitalizedValue = capitalizeFirstLetter(event.target.value);
    console.log(capitalizedValue, "done");
    setJobTitle(capitalizedValue);
  };

  const handleChangeBasicSalary = (event) => {
    setBasicSalaryErr("");
    setError("");
    const capitalizedValue = capitalizeFirstLetter(event.target.value);
    console.log(capitalizedValue, "done");
    setBasicSalary(capitalizedValue);
  };

  const handleChangeAllowance = (event) => {
    setAllowanceErr("");
    setError("");
    const capitalizedValue = capitalizeFirstLetter(event.target.value);
    console.log(capitalizedValue, "done");
    setAllowance(capitalizedValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!dateOfEmployment) {
      setDateofEmploymentErr("Enter a Date of employment");
    }
    if (!jobTitle) {
      setJobTitleErr("Enter a Job Title");
    }
    if (!employmentType) {
      setEmploymentTypeErr("Choose a employment type");
    }
    if (!contractType) {
      setContractTypeErr("Choose a contract type");
    }
    if (!salaryFrequency) {
      setSalaryFrequencyErr("Choose a salary frequency");
    }
    if (!basicSalary) {
      setBasicSalaryErr("Choose a Basic Salary");
    }
    if (!allowance) {
      setAllowanceErr("Enter an Allowance");
    }
    if (!department) {
      setDepartmentErr("Enter a Department");
    }
    if (
      !dateOfEmployment ||
      !jobTitle ||
      !employmentType ||
      !contractType ||
      !salaryFrequency ||
      !basicSalary ||
      !allowance ||
      !department
    ) {
      setError("Fill in all the required fields to proceed");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/admin-login-details", {
        state: {
          firstName,
          lastName,
          gender,
          dateOfBirth,
          country,
          houseAddress,
          streetAddress,
          state,
          permission,
          dateOfEmployment,
          jobTitle,
          employmentType,
          contractType,
          salaryFrequency,
          basicSalary,
          allowance,
          department,
        },
      });
    }, 6000);
  };

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
                  Date of Employment Type{" "}
                  <span className="org-forms-label required">**</span>
                </label>
                <input
                  type="date"
                  style={
                    dateOfEmploymentErr
                      ? {
                          border: "red 2px solid",
                          backgroundColor: "#ff000025",
                          color: "red",
                          padding: "8px", // Adjust as needed
                        }
                      : null
                  }
                  className="forms-org-input"
                  value={dateOfEmployment}
                  onChange={handleDateofEmployment}
                />
                {dateOfEmploymentErr ? (
                  <p
                    style={
                      dateOfEmploymentErr
                        ? { color: "red", marginTop: 0 }
                        : null
                    }
                  >
                    {dateOfEmploymentErr}
                  </p>
                ) : null}
              </div>

              <div className="org-forms-inputs">
                <label className="org-forms-label">
                  Department{" "}
                  <span className="org-forms-label required">**</span>
                </label>
                <select
                  style={
                    departmentErr
                      ? {
                          border: "red 2px solid",
                          backgroundColor: "#ff000025",
                          color: "red",
                        }
                      : null
                  }
                  className="forms-org-select"
                  value={department}
                  onChange={handleChangeDepartment}
                >
                  <option value="">Select an option</option>
                  <option value="Tech">Tech</option>
                  <option value="Research">Research</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Testing">Testing</option>
                </select>
                {departmentErr ? (
                  <p
                    style={
                      departmentErr ? { color: "red", marginTop: 0 } : null
                    }
                  >
                    {departmentErr}
                  </p>
                ) : null}
              </div>

              <div className="org-forms-inputs">
                <label className="org-forms-label">
                  Job Title <span className="org-forms-label required">**</span>
                </label>
                <input
                  style={
                    jobTitleErr
                      ? {
                          border: "red 2px solid",
                          backgroundColor: "#ff000025",
                          color: "red",
                        }
                      : null
                  }
                  value={jobTitle}
                  onChange={handleChangeJobTitle}
                  className="auth-input peer w-full border-none outline-none bg-transparent pt-6 pb-1 px-4 text-black"
                />
                {jobTitleErr ? (
                  <p
                    style={jobTitleErr ? { color: "red", marginTop: 0 } : null}
                  >
                    {jobTitleErr}
                  </p>
                ) : null}
              </div>

              <div className="org-forms-inputs">
                <label className="org-forms-label">
                  Employment Type{" "}
                  <span className="org-forms-label required">**</span>
                </label>
                <select
                  style={
                    employmentTypeErr
                      ? {
                          border: "red 2px solid",
                          backgroundColor: "#ff000025",
                          color: "red",
                        }
                      : null
                  }
                  className="forms-org-select"
                  value={employmentType}
                  onChange={handleEmploymentType}
                >
                  <option value="">Select an option</option>
                  <option value="onsite">Onsite</option>
                  <option value="remote">Remote</option>
                  <option value="hybrid">Hybrid</option>
                </select>
                {employmentTypeErr ? (
                  <p
                    style={
                      employmentTypeErr ? { color: "red", marginTop: 0 } : null
                    }
                  >
                    {employmentTypeErr}
                  </p>
                ) : null}
              </div>

              <div className="org-forms-inputs">
                <label className="org-forms-label">
                  Salary Frequency{" "}
                  <span className="org-forms-label required">**</span>
                </label>
                <select
                  style={
                    salaryFrequencyErr
                      ? {
                          border: "red 2px solid",
                          backgroundColor: "#ff000025",
                          color: "red",
                        }
                      : null
                  }
                  className="forms-org-select"
                  value={salaryFrequency}
                  onChange={handleSalaryFrequency}
                >
                  <option value="">Select an option</option>
                  <option value="monthly">Monthly</option>
                </select>
                {salaryFrequencyErr ? (
                  <p
                    style={
                      salaryFrequencyErr ? { color: "red", marginTop: 0 } : null
                    }
                  >
                    {salaryFrequencyErr}
                  </p>
                ) : null}
              </div>

              <div className="org-forms-inputs">
                <label className="org-forms-label">
                  Contract Type{" "}
                  <span className="org-forms-label required">**</span>
                </label>
                <select
                  style={
                    contractTypeErr
                      ? {
                          border: "red 2px solid",
                          backgroundColor: "#ff000025",
                          color: "red",
                        }
                      : null
                  }
                  className="forms-org-select"
                  value={contractType}
                  onChange={handleChnageContractType}
                >
                  <option value="">Select an option</option>
                  <option value="full_time">Full-time</option>
                  <option value="part_time">Part-time</option>
                  <option value="intern">Intern</option>
                </select>
                {contractTypeErr ? (
                  <p
                    style={
                      contractTypeErr ? { color: "red", marginTop: 0 } : null
                    }
                  >
                    {contractTypeErr}
                  </p>
                ) : null}
              </div>

              <div className="org-forms-inputs">
                <label className="org-forms-label">
                  Basic Salary - Annually{" "}
                  <span className="org-forms-label required">**</span>
                </label>
                <input
                  value={basicSalary}
                  style={
                    basicSalaryErr
                      ? {
                          border: "red 2px solid",
                          backgroundColor: "#ff000025",
                          color: "red",
                        }
                      : null
                  }
                  onChange={handleChangeBasicSalary}
                  className="auth-input peer w-full border-none outline-none bg-transparent pt-6 pb-1 px-4 text-black"
                />
                {basicSalaryErr ? (
                  <p
                    style={
                      basicSalaryErr ? { color: "red", marginTop: 0 } : null
                    }
                  >
                    {basicSalaryErr}
                  </p>
                ) : null}
              </div>
              <div className="org-forms-inputs">
                <label className="org-forms-label">
                  Allowance <span className="org-forms-label required">**</span>
                </label>
                <input
                  value={allowance}
                  style={
                    allowanceErr
                      ? {
                          border: "red 2px solid",
                          backgroundColor: "#ff000025",
                          color: "red",
                        }
                      : null
                  }
                  onChange={handleChangeAllowance}
                  className="auth-input peer w-full border-none outline-none bg-transparent pt-6 pb-1 px-4 text-black"
                />
                {allowanceErr ? (
                  <p
                    style={allowanceErr ? { color: "red", marginTop: 0 } : null}
                  >
                    {allowanceErr}
                  </p>
                ) : null}
              </div>

              <div className="forms-org-submit-button">
                {error ? (
                  <p className="auth-error auth-full">
                    {" "}
                    <BiSolidError className="error-icon-auth" />
                    {error}
                  </p>
                ) : null}
                <button disabled={loading ? true : false} type="submit">
                  {" "}
                  {loading ? (
                    <div className="spinner-container"> </div>
                  ) : (
                    "Proceed"
                  )}
                </button>
              </div>
            </form>
          </div>
        </section>
        <section className="org-flex-second">
          <section className="width-org-resize">
            <section className="org-basic-info-div-right">
              <OrganizationSetupProgress
                setupHeading="Add a Staff"
                steps={steps}
              />
            </section>
          </section>
          <section className="width-org-resize-div">
            <div className="org-width-vw">
              <section className="org-basic-info-div-right-div-div">
                <OrganizationSetupProgress
                  setupHeading="Add a Staff"
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

export default JobDetails;
